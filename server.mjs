import cluster from 'cluster';
import http from 'http';
import cpus from 'os';
import process from 'process';

const numCpus = cpus.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    })
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`sent from ${process.pid}`);
    }).listen(80);
    console.log(`Worker ${process.pid} started`);
}