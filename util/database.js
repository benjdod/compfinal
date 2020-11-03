const { Client } = require('pg');

const databaseURL = process.env.DATABASE_URL || 'postgres://thrxushcnebbcq:fb83f5c42c08cccd4bf105094978f4df0a1255b98cf99a37f9dd6c64cfe82b5e@ec2-52-2-82-109.compute-1.amazonaws.com:5432/d7fvckm24ppjng';

const client = new Client({
    connectionString: databaseURL,
    ssl: {
        rejectUnauthorized: false,
    }
});

const queries = {
    insert: (username, firstname, lastname, passhash) => `INSERT INTO users(username, firstname, lastname, passhash) VALUES ('${username}', '${firstname}', '${lastname}', '${passhash}')`,
    findHash: (hash) => `select * from users where '${hash}' ~ passhash`,
    findUID: (uid) => `select * from users where id = ${uid}`
}

client.connect();

exports.getByUID = async (uid) => {
    try {
        return (await client.query(queries.findUID(uid))).rows;
    } catch (e) {
        console.error(e);
        return null;
    }
    
}