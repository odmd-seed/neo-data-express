import express, {Express, Request, Response} from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import {Neo4jQuery} from "./neo4j-query";
import { promises as dns } from 'dns';

const app: Express = express();
const neo4j: Neo4jQuery = new Neo4jQuery()

app.get('/', async (req: Request, res: Response) => {


    const addre = await dns.resolve(`neo4j`)

    console.log( `addreaddreaddre>${addre}`)

    const rsl = await neo4j.exeCypher(`
     MATCH     (root)
     -[l1]->(lc1:LifeCycle)-[r1:lifecycle]->(node1)
     -[l2]->(lc2:LifeCycle)-[r2:lifecycle]->(node2)
     -[l3]->(lc3:LifeCycle)-[r3:lifecycle]->(node3)
     -[l4]->(lc4:LifeCycle)-[r4:lifecycle]->(node4)
     WHERE  "Ondemand__root" in root.classesNames
     return root, node1, node2, node3, node4,  lc1,lc2,lc3,lc4`)
    res.send(rsl);
});

// Create HTTP server
const httpServer = http.createServer(app);

// Create HTTPS server
const httpsServer = https.createServer({
    key: fs.readFileSync('cert_key/key.pem'),
    cert: fs.readFileSync('cert_key/cert.pem')
}, app);

// Start both servers
httpServer.listen(80, '0.0.0.0', () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, '0.0.0.0', () => {
    console.log('HTTPS Server running on port 443');
});