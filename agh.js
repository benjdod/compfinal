const { packageQuizData, unpackageQuizData } = require('./util/quizdata');
const { generateUserKey, encrypt, decrypt, derivePasswordKey } = require('./util/crypt');
const { insertQuiz, getByUID } = require('./util/database');

const packaged = packageQuizData({
    fips: 1001,
    eventSize: 400,
    eventDuration: 56,
    eventOutside: true,
    maskPercentage: 0.34,
    maskWearing: true,
    userMaskWearing: true,
    risk: 0.45,
    quizVersion: 0,
    socialDistancing: 4,
})

const key = generateUserKey();

const encrypted = encrypt(packaged, key);
const decrypted = decrypt(encrypted, key);

console.log(packaged);
console.log(encrypted.length);
console.log(unpackageQuizData(decrypted));

const seedQuizzes = async () => {

    const dataArray = [
        {
            fips: 1001,
            eventSize: 400,
            eventDuration: 56,
            eventOutside: true,
            maskPercentage: 0.34,
            maskWearing: true,
            userMaskWearing: true,
            risk: 0.45,
            quizVersion: 0,
            socialDistancing: 4,
        },
        {
            fips: 1001,
            eventSize: 20,
            eventDuration: 1,
            eventOutside: false,
            maskPercentage: 0.90,
            maskWearing: true,
            userMaskWearing: true,
            risk: 0.21,
            quizVersion: 0,
            socialDistancing: 0,
        },
        {
            fips: 1001,
            eventSize: 6,
            eventDuration: 90,
            eventOutside: false,
            maskPercentage: 0,
            maskWearing: false,
            userMaskWearing: false,
            risk: 0.12,
            quizVersion: 0,
            socialDistancing: 0,
        },
    ]

    const user = await getByUID(1);

    const masterKey = decrypt(user.key, derivePasswordKey('password'));

    dataArray.forEach(datum => insertQuiz(1, masterKey, datum))
}

seedQuizzes();