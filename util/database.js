const { Client } = require('pg');

const databaseURL = process.env.DATABASE_URL || 'postgres://thrxushcnebbcq:fb83f5c42c08cccd4bf105094978f4df0a1255b98cf99a37f9dd6c64cfe82b5e@ec2-52-2-82-109.compute-1.amazonaws.com:5432/d7fvckm24ppjng';

const client = new Client({
    connectionString: databaseURL,
    ssl: {
        rejectUnauthorized: false,
    }
});

const queries = {
    insertUser: (username, firstname, lastname, passhash) => `INSERT INTO users(username, firstname, lastname, passhash) VALUES ('${username}', '${firstname}', '${lastname}', '${passhash}')`,
    findUserHash: (hash) => `select * from users where '${hash}' ~ passhash`,
    findUserUID: (uid) => `select * from users where id = ${uid}`,
    getUser: (username) => `select * from users where username ~ '${username}'`,
    addQuizResult: (uid, latitude, longitude, risk) => `INSERT INTO quizresults (uid, latitude, longitude, risk) VALUES (${uid}, ${latitude}, ${longitude}, ${risk})`
}

client.connect();

exports.insertUser = async (username, firstname, lastname, passhash) => {
    try {
        return (await client.query(queries.insertUser(username, firstname, lastname, passhash))).rows;
    } catch (e) {
        console.error(e);
        return null;
    }
}

exports.updateUser = async (uid, username, firstname, lastname, passhash) => {
    try {
        return await client.query(`update users set username = '${username}', firstname = '${firstname}', lastname = '${lastname}', passhash = '${passhash}' where id = ${uid};`);
    } catch (e) {
        console.error(e);
        return null;
    }
}

exports.getUser = async (username) => {
    try {
        const out = await client.query(`select * from users where username ~ '${username}' limit 1`);
        console.log(out);
        if (out.rows.length == 0) {
            return null;
        }
        console.log('db got user: ', out.rows[0]);
        return out.rows[0];
    } catch (e) {
        console.error(e);
        return null;
    }
}

// is the username taken?
exports.checkUser = async (username) => {
    let response;
    try {
        response = await client.query(`select username from users where username ~ '${username}' limit 1`);
    } catch (e) {
        console.error(e);
    }

    if (response)
        if (response.rows.length > 0) {
            return true;
        } else
            return false;

    return true;
}

exports.getByUID = async (uid) => {
    try {
        return (await client.query(queries.findUserUID(uid))).rows;
    } catch (e) {
        console.error(e);
        return null;
    }
}

exports.insertQuiz = async (uid, latitude, longitude, risk) => {

    let out;

    try {
        out = await client.query(queries.addQuizResult(uid, latitude, longitude, risk));
    } catch (e) {
        console.error(e);
        return null;
    }

    return out;
}