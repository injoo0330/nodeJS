//http2 모듈은 SSL 암호화 와 최신 HTTP 프로토콜(http/2)를 사용할 수 있게 함.
const http2 = require('http2');
const fs = require('fs');

http2.createSecureServer({
    cert: fs.readFileSync('발급 받은 도메인 인증서 경로'),
    key: fs.readFileSync('발급 받은 비밀키 경로'),
    ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res)=>{
    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Http2-Server!</p>');
})
.listen(443, ()=>{
    console.log('443포트에서 서버 대기 중입니다.');
});