const { Client } = require('pg');

const databaseURL = process.env.DATABASE_URL || 'postgres://thrxushcnebbcq:fb83f5c42c08cccd4bf105094978f4df0a1255b98cf99a37f9dd6c64cfe82b5e@ec2-52-2-82-109.compute-1.amazonaws.com:5432/d7fvckm24ppjng';

const client = new Client({
    connectionString: databaseURL,
    ssl: {
        rejectUnauthorized: false,
    }
});

client.connect();

const genQuery = {
    insert: (username, firstname, lastname, passhash) => `INSERT INTO users(username, firstname, lastname, passhash) VALUES ('${username}', '${firstname}', '${lastname}', '${passhash}')`,
    find: (hash) => `select * from users where '${hash}' ~ passhash`,
}

client.query(genQuery.find('1738'), (err, res) => {
    if (err) throw err;
    console.log(res.rows);
    client.end();
});


