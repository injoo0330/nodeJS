//싱글 프로세스로 동작하는 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈.
//포트를 공유하는 노드 프로세스를 여러개 둘 수 있다.
// --> 요청이 많은 경우 병렬로 실행되 서버의 개수 만큼 요청이 분산되게 할 수 있다.
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster){   
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    //cpu 개수 만큼 worker를 생산
    for(let i=0; i<numCPUs; i += 1){
        cluster.fork();
    }
    //worker가 종료 되었을 때.
    cluster.on('exit',(worker, code, signal)=>{
        console.log(`${worker.process.pid}번 worker 종료.!`);
        console.log('code', code, 'signal', signal);
    });
} else {
    //port에서 worker 대기
    http.createServer((req, res)=>{
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');
        setTimeout(()=>{//worker의 존재 확인을 위해 1초마다 강제 종료
            process.exit(1);
        }, 1000);
    }).listen(8086);
    console.log(`${process.pid}번 worker 실행`);
}