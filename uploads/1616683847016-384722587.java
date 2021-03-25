package operatingSystem;

import java.util.*;

public class Rohith_201951051_Lab8 {
	public static void main(String args[]) {
		System.out.println("\n");
		System.out.println("NAME : CHITTIBOMMALA ROHITH");
		System.out.println("ID : 201951051");
		System.out.println("\n\n");
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter the Size of Queue : ");
		int  queueSize = sc.nextInt();
		System.out.println("Enter the Number of Producers :");
		int noOfProcesses = sc.nextInt();
		System.out.println("Enter the Number of Consumers :");
		int noOfConsumers = sc.nextInt();
		System.out.println("\n\n Output :- \n");
		sc.close();
		// Creation of queue (buffer) 
		ArrayList<Integer> queueShared = new ArrayList<Integer>();

		Thread producerThread = new Thread(new Producer(queueShared, queueSize, noOfProcesses), "Producer");
		Thread consumerThread = new Thread(new Consumer(queueShared, queueSize, noOfConsumers), "Consumer");
		// thread start
		producerThread.start();
		consumerThread.start();
	}
}

class Producer implements Runnable {
	private final ArrayList<Integer> queueShared;
	private final int queueSize;
	private final int  noOfProcesses;

	public Producer(ArrayList<Integer> queueShared, int queueSize, int noOfProcesses) {
		this.queueShared = queueShared;
		this.queueSize = queueSize;
		this.noOfProcesses = noOfProcesses;
	}

	@Override
	public void run() {
		int X = 1;
		while (X <= noOfProcesses) {
			for (int i = 0; i < queueSize; i++) {
				System.out.println("Producer " + X + " produced item : " + i);
				try {
					produce(i);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			X++;
		}
	}

	private void produce(int i) throws InterruptedException {
		// Wait if the queue is found FULL
		while (queueShared.size() == queueSize) {
			synchronized (queueShared) {
				queueShared.wait();
			}
		}
		// Producing the element and notify consumers
		synchronized (queueShared) {
			queueShared.add(i);
			queueShared.notifyAll();
		}
	}
}

class Consumer implements Runnable {
	private final ArrayList<Integer> queueShared;
	private final int queueSize;
	private final int noOfConsumers;

	public Consumer(ArrayList<Integer> queueShared, int queueSize, int noOfConsumers)

	{
		this.queueShared = queueShared;
		this.queueSize = queueSize;
		this.noOfConsumers = noOfConsumers;
	}

	@Override

	public void run() {
		int count = 1;
		while (count <= noOfConsumers) {
			for (int i = 0; i < queueSize; i++) {
				System.out.println("Consumer " + count + " consumed item : " + i);
				try {
					consume();
					Thread.sleep(50);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			count++;
		}
	}

	private int consume() throws InterruptedException {
		// Wait if the queue is foumd EMPTY
		while (queueShared.isEmpty()) {
			synchronized (queueShared) {
				queueShared.wait();
			}
		}
		// else consume the element and notify the waiting producer
		synchronized (queueShared) {
			queueShared.notifyAll();
			return (Integer) queueShared.remove(0);
		}
	}
}
