import * as neo4j from 'neo4j-driver';
import {Config} from "neo4j-driver/types/driver";

export class Neo4jQuery {

    private driver: neo4j.Driver;

    constructor() {
        const config: Config = {
            logging: {
                level: 'debug', logger: (level, message) => {
                    switch (level) {
                        case 'debug':
                            console.debug(message);
                            break;
                        case 'info':
                            console.info(message);
                            break;
                        case 'warn':
                            console.warn(message);
                            break;
                        case 'error':
                            console.error(message);
                            break;
                        default:
                            console.log(level, message);
                    }
                }
            }
        };

        this.driver = neo4j.driver(
            'bolt://neo4j:7687',
            undefined,
            config
        );
    }

    public async exeCypher(cypher: string): Promise<string> {
        const session = this.driver.session();

        try {
            const rslt: neo4j.QueryResult<neo4j.RecordShape> = await session.run(cypher)
            return JSON.stringify(rslt.records)
        } finally {
            await session.close()
        }

    }

}