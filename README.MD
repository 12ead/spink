# How to run

* Add Environment var MONGO_DB
* run with npm
```
npm start
```

* 가중치
┌──────┬──────┬──────┐
│   2  │   3  │   4  │
└──────┴──────┴──────┘
아무것도 맞추기 못했을 때의 가중치는 0
첫번째칸을 맞췄을 경우 가중치는 2
두번째칸을 맞췄을 경우 가중치는 3
세번째칸을 맞췄을 경우 가중치는 4
첫번째칸, 두번째칸 맞음 경우 2*3 = 6


ex>첫번째 칸만 맟춤 - 기본 0 의 값을 가짐
그 이후로 능력치가 누적 +되는 값은  


* 가중치에 따른 능력치
┌──────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│      │     │     │  0  │  2  │  3  │  4  │  6  │  8  │  12 │  24 │
├──────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│  힘  │ 100 │ -23 │  77 │  79 │  82 │  86 │  92 │ 100 │ 112 │ 136 │
├──────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│ 민첩 │ 100 │ -31 │  69 │  71 │  74 │  78 │  84 │  92 │ 104 │ 128 │
├──────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│ 방어 │ 100 │ -46 │  54 │  56 │  59 │  63 │  69 │  77 │  89 │ 113 │
├──────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│ 적중 │ 100 │ -27 │  73 │  75 │  78 │  82 │  88 │  96 │ 108 │ 132 │
├──────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│  운  │ 100 │ -33 │  67 │  69 │  72 │  76 │  82 │  90 │ 102 │ 126 │
├──────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│ 체쳑 │ 100 │ -32 │  70 │  70 │  73 │  77 │  83 │  91 │ 103 │ 127 │
└──────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘

* {(a+b)*2 + (c+d)*3} * e + f =  **


* heroku err -> "start": "nodemon --debug ./app.js --watch ./query --watch ./lib --watch ./config --watch ./models --watch ./public --watch ./routes --watch ./views --watch ./middleware --watch ./app.js",*/   **

2016-10-13T13:43:34.989654+00:00 heroku[web.1]: Starting process with command `npm start`
2016-10-13T13:43:37.181332+00:00 app[web.1]:
2016-10-13T13:43:37.181347+00:00 app[web.1]: > myapp1@1.0.0 start /app
2016-10-13T13:43:37.181348+00:00 app[web.1]: > nodemon --debug ./app.js --watch                          ./query --watch ./lib --watch ./config --watch ./models --watch ./public --watch                          ./routes --watch ./views --watch ./middleware --watch ./app.js
2016-10-13T13:43:37.181349+00:00 app[web.1]:
2016-10-13T13:43:37.186317+00:00 app[web.1]: sh: 1: nodemon: not found
2016-10-13T13:43:37.191948+00:00 app[web.1]:

* 수정 -> "start": "node app.js",

12ead.com 으로 접속됨.
https://spinkboard.herokuapp.com/spink  직접 접속시 인증되지 않은 소스 에러.
F12확인
Mixed Content: The page at 'https://mirionboard.herokuapp.com/spink' was loaded over HTTPS, but requested an insecure stylesheet 'http://www.w3schools.com/lib/w3.css'. This request has been blocked; the content must be served over HTTPS.
