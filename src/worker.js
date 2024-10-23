import { workerData, parentPort } from 'worker_threads';

// Function to simulate random processing time
const randomProcessingTime = () => {
    const min = 1000; // Minimum 1 second
    const max = 5000; // Maximum 5 seconds
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Simulate task processing (5 rows)
const processTask = async (taskData) => {
    taskData.forEach(row => {
        console.log(`Worker ${workerData.workerId} processing row: ${row.id}`);
        // Add any task-specific logic here
    });

    const delay = randomProcessingTime();
    console.log(`Worker ${workerData.workerId} will take ${delay}ms to complete.`);

    // Simulate random processing time
    return new Promise(resolve => setTimeout(resolve, delay));
}

// Process the task and notify the main thread when done
processTask(workerData.task).then(() => {
    parentPort.postMessage('Task complete');
});
