express-typescript-typeorm-boilerplate
=============

이전에 만들던 프로젝트에서 필요한 부분만 골라서 만든 boilerplate코드

# stack
- typescript
- express
- typeorm
- passport

### 다음 2개의 파일을 생성해야 함
ormconfig.json
```json
{
    "type": "mysql",
    "host": "yourhostaddress",
    "port": 3306,
    "username": "yourusername", 
    "password": "yourpassword", 
    "database": "yourdb", 
    "synchronize": true,
    "logging": false,
    "entities": [
       "src/entity/**/*.ts"
    ],
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ]
}
```

.env
```
JWT_SECRET=YOURSECRETKEY
PORT=YOURPORT
```

### PM2 사용하기
- nodejs 어플리케이션의 process를 관리하기 위한 유틸
- cluster모드로 실행하면 지정된 개수 만큼(0이면 코어개수 만큼) process를 생성
- stateless하게 만들었다면 알아서 로드밸런싱을 해준다고 함... 현재 코드에 문제가 될만한 부분은 없는지...

사용방법
```bash
 > ./node_modules/pm2/bin/pm2 install typescript # pm2가 ts-node를 실행시키게 하기 위해 필요
 > yarn run development
```
