const { Worker, isMainThread, workerData } = require('worker_threads');
const { Mutex } = require('async-mutex');

class DanceMonitor {
  constructor(n) {
    this.n = n;
    this.leader_turn = true;
    this.leader_cv = new Mutex();
    this.follower_cv = new Mutex();
  }

  async leadStep() {
    const release = await this.leader_cv.acquire();
    while (!this.leader_turn) {
      await this.leader_cv.wait();
    }
    console.log('Leader performing step');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.leader_turn = false;
    this.follower_cv.release();
    release();
  }

  async followStep() {
    const release = await this.follower_cv.acquire();
    while (this.leader_turn) {
      await this.follower_cv.wait();
    }
    console.log('Follower performing step');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.leader_turn = true;
    this.leader_cv.release();
    release();
  }
}

const leader_thread = async (monitor) => {
  for (let i = 0; i < 10; i++) {
    await monitor.leadStep();
    console.log('Leader step completed');
  }
};

const follower_thread = async (monitor) => {
  for (let i = 0; i < 10; i++) {
    await monitor.followStep();
    console.log('Follower step completed');
  }
};

// Create DanceMonitor instance
const n = 5; // Number of leaders and followers
const monitor = new DanceMonitor(n);

// Create leader and follower threads
const leader_threads = Array.from({ length: n }, () =>
  new Worker(leader_thread.toString(), { eval: true, workerData: monitor })
);
const follower_threads = Array.from({ length: n }, () =>
  new Worker(follower_thread.toString(), { eval: true, workerData: monitor })
);

// Wait for all threads to finish
Promise.all([...leader_threads, ...follower_threads].map((t) => t.promise)).then(
  () => console.log('All threads finished')
);
