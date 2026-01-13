import {Pool} from 'pg';

const poolConnection = new Pool({
    user: 'postgres', 
    host: 'localhost', 
    database: 'sakila', 
    password: 'abc12345', 
    port: 5432
});

export default poolConnection;