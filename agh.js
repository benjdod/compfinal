const database = require('./util/database');
const password = require('./util/auth/password');

const f = async () => {

    const hashed = await password.hash('password');

    await database.updateUser(1, 'testuser', 'Benjamin', 'Harrison', hashed)
        .then(res => console.log(res))
        .catch(err => console.error(err));

    await database.getByUID(1)
        .then(res => console.log(res))
        .catch(err => console.error(err));
}

f();