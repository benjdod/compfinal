const database = require('./util/database');
const password = require('./util/auth/password');
const crypt = require('./util/crypt');
const { calculateRisk } = require('./util/quiz');
const { packageQuizData, encrypt, decrypt, decryptToString, generateUserKey, unpackageQuizData, derivePasswordKey } = require('./util/crypt');

const g = () => {
    const p = packageQuizData({
        latitude: 54.4324,
        longitude: -77.4324,
        eventDuration: 20,
        eventSize: 6,
        eventOutside: true,
        socialDistancing: 2,
        maskWearing: false,
        maskPercentage: 0,
        risk: 0.12,
        quizVersion: 6,
    })
    const key = generateUserKey();
    const e = encrypt(p, key);
    const d = decrypt(e, key);
    const u = unpackageQuizData(d);

    console.log(p);
    console.log(e);
    console.log(d);
    console.log(u);
}

const h = () => {
    const data = {
        latitude: 54.4324,
        longitude: -77.4324,
        eventDuration: 20,
        eventSize: 6,
        eventOutside: true,
        socialDistancing: 2,
        maskWearing: false,
        maskPercentage: 0,
        risk: 0.12,
        quizVersion: 6,
    }
    const filled = calculateRisk(data);
    console.log(filled);
}

const loadUser = async () => {
    const pw = 'password'
    const hashed = await password.hash(pw);
    const masterKey = generateUserKey();
    const userKey = derivePasswordKey(pw);
    const encKey = crypt.encrypt(masterKey, userKey);
    console.log(masterKey);
    database.updateUser(1, 'testuser', 'Benny', 'Ringold', hashed, encKey);

    const g = await database.getByUID(1);

    console.log(g);
    console.log(decryptToString(g.key, derivePasswordKey(pw)));
}

const loadQuizzes = () => {

    const data = [
        {
            latitude: 54.4324,
            longitude: -77.4324,
            eventDuration: 20,
            eventSize: 6,
            eventOutside: true,
            socialDistancing: 2,
            maskWearing: false,
            maskPercentage: 0,
            userMaskWearing: true,
            risk: 0.12,
            quizVersion: 1,
        },
        {
            latitude: 21.4734,
            longitude: -11.907,
            eventDuration: 500,
            eventSize: 500,
            eventOutside: false,
            socialDistancing: 0,
            maskWearing: false,
            maskPercentage: 0,
            userMaskWearing: false,
            risk: 0.98,
            quizVersion: 1,
        },
        {
            latitude: 81.9348,
            longitude: 2.7583477,
            eventDuration: 1,
            eventSize: 1,
            eventOutside: true,
            socialDistancing: 12,
            maskWearing: true,
            maskPercentage: 100,
            userMaskWearing: true,
            risk: 0.01,
            quizVersion: 1,
        },
    ]

    database.getByUID(1)
        .then(user => {
            const masterKey = decryptToString(user.key, derivePasswordKey('password'));
            console.log(masterKey);
            data.forEach(datum => database.insertQuiz(1, masterKey, datum));
            
        })
}

const viewQuizzes = () => {
    database.getByUID(1)
    .then(user => {
        const masterKey = decryptToString(user.key, derivePasswordKey('password'));
        database.getQuizzes(1, masterKey)
        .then(res => {
            console.log('db responded with: ', res);
        })
        .catch(e => {
            console.error(e);
        })
    })
}

//loadUser();
//loadQuizzes();
viewQuizzes()