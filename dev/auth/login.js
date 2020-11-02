const axios = require('axios');

const result = axios({
    method: 'get',
    url: 'http://localhost:3000/restricted',
    headers: {
        "authentication": "bunny"
    }
})
.then(response => console.log(response))
.catch(error => console.error(error));
