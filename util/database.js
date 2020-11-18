const { Client } = require('pg');
const { encrypt, decrypt } = require('./crypt');
const { packageQuizData, unpackageQuizData } = require('./quizdata')
const crypt = require('./crypt');

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
}

client.connect();

exports.insertUser = async (username, firstname, lastname, passhash, encryptedKey) => {
    try {
        return (await client.query(`INSERT INTO users(username, firstname, lastname, passhash, key) VALUES ('${username}', '${firstname}', '${lastname}', '${passhash}', '${encryptedKey}')`)).rows;
    } catch (e) {
        console.error(e);
        return null;
    }
}

exports.updateUser = async (uid, username, firstname, lastname, passhash, encryptedKey) => {
    try {
        return await client.query(`update users set username = '${username}', firstname = '${firstname}', lastname = '${lastname}', passhash = '${passhash}', key = '${encryptedKey}' where id = ${uid};`);
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

exports.getAllUsers = async () => {
    try {
        const out = await client.query(`select * from users`);
        if (out.rows.length == 0) {
            return null;
        }
        return out.rows;
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
        return (await client.query(queries.findUserUID(uid))).rows[0];
    } catch (e) {
        console.error(e);
        return null;
    }
}

/**
 * packages, encrypts, and inserts the quiz data into the table
 * 
 * @param {number} uid the user's uid
 * @param {*} masterKey the user's decrypted master key (should be supplied in their auth token)
 * @param {*} data the quiz data to add
 */
exports.insertQuiz = async (uid, masterKey, data) => {

    const package = packageQuizData(data);
    const encrypted = encrypt(package, masterKey);

    try {
        return await client.query(`insert into quizzes (uid, result) values (${uid}, '${encrypted}')`);
    } catch (e) {
        console.error(e);
        return null;
    }

}

exports.getQuizzes = async (uid, masterKey) => {
    try {
        const res = await client.query(`select * from quizzes where uid = ${uid}`);
        const decrypted = res.rows.map(row => {
            return {...unpackageQuizData(decrypt(row.result, masterKey)), timestamp: row.timecreated};
        })
        return decrypted;
    } catch (e) {
        console.error(e);
        return null;
    }
}

exports.getEncryptedQuizzes = async (uid) => {
    try {
        const res = await client.query(`select * from quizzes where uid = ${uid}`);
        return res.rows;
    } catch (e) {
        console.error(e);
        return null;
    }
}

exports.getAllEncryptedQuizzes = async (uid) => {
    try {
        const res = await client.query(`select * from quizzes`);
        return res.rows;
    } catch (e) {
        console.error(e);
        return null;
    }
}