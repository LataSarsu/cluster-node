import http from 'http';

var options = {
    host: 'localhost',
    path: '/'
}

function runReq(response) {
    let str = '';
    response.on('data', function (data) {
        str += data;
    })
    response.on('end', () => {
        console.log(str);
    })
}
for (let i = 0; i < 100; i++) {
    http.request(options, runReq).end();
}
