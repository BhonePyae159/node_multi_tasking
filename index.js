import { pool } from "./db_config.js";
import { Worker } from 'worker_threads';
import cron from 'node-cron';

const MAX_WORKERS = 3; // Maximum number of workers
let currentWorkerId = 1; // Worker ID counter
let lastProcessedOffset = 0; // Track the last processed offset

// Function to fetch rows from the database
const fetchRows = (limit, offset) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT * FROM user LIMIT ? OFFSET ?',
            [limit, offset],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
};

// Function to create and assign jobs to workers
const createWorker = (taskData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: {
                task: taskData,  // Correctly sending taskData as part of workerData
                workerId: currentWorkerId // Worker ID from the counter
            }
        });

        worker.on('message', (msg) => resolve(msg)); // Receive result from worker
        worker.on('error', reject); // Handle worker error
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });

        // Cycle through worker IDs 1 to MAX_WORKERS
        currentWorkerId = (currentWorkerId % MAX_WORKERS) + 1;
    });
};

// Main loop for processing
const processJobs = async () => {
    let limit = 250; // 50 requests * 5 rows = 250 rows per batch

    while (true) {
        const rows = await fetchRows(limit, lastProcessedOffset);

        if (rows.length === 0) {
            break; // No more data to process
        }

        let tasks = [];

        // Assign tasks to workers (5 rows per task)
        for (let i = 0; i < rows.length; i += 5) {
            const taskData = rows.slice(i, i + 5); // Each task = 5 rows
            const taskPromise = createWorker(taskData);
            tasks.push(taskPromise);

            // Log the promise for this task
            console.log(`Task created for rows: ${taskData.map(row => row.id).join(", ")}`);
        }

        // Wait for all workers to finish their tasks
        await Promise.all(tasks);

        // Update the lastProcessedOffset to the next batch
        lastProcessedOffset += rows.length; // Update to the next offset
    }

    console.log('All jobs completed. Scheduling cron job.');

    // Schedule cron job to check every 10 seconds for new rows
    cron.schedule('*/10 * * * * *', async () => {
        const rows = await fetchRows(5, lastProcessedOffset); // Check for new rows
        if (rows.length > 0) {
            console.log('New data found, processing...');
            await processJobs();
        } else {
            console.log('No new data.');
        }
    });
};

// Start processing jobs
processJobs()
    .then(() => {
        console.log('All jobs completed.');
    })
    .catch(err => {
        console.error('Error processing jobs:', err);
    });
