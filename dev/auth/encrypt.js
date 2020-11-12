const bcrypt = require('bcrypt');

const aes = require('./jsaes');

/*
bcrypt.hash('TesTpa$$w0rD', 9, (err, encrypted) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(encrypted)
});
*/

aes.init();

aes.init();
 
let password = 'hello there!';

     var block = new Array(16);
     for(var i = 0; i < 16; i++)
        if (password.charAt(i) != -1) {
            block[i] = password.charCodeAt(i);
        } else {
            block[i] = 0x11 * i;
        }
 
     var key = new Array(32);
     for(var i = 0; i < 32; i++)
         key[i] = i;
 
     aes.expandKey(key);
    aes.encrypt(block, key);

    console.log(block);
    
    aes.decrypt(block, key);

    let decrypted = ''

    block.forEach(b => {
        decrypted += String.fromCharCode(b);
    })

    console.log(decrypted)