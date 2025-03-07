# Task 관리 API 서버 (Node.js, Express, MongoDB Atlas)

## 개요

본 프로젝트는 Node.js와 Express 프레임워크를 사용하여 구축된 Task 관리 API 서버입니다.  
MongoDB Atlas를 데이터베이스로 사용하고, Mongoose 라이브러리를 통해 데이터베이스와의 상호작용을 처리합니다.  
이 서버는 Task 데이터를 CRUD(Create, Read, Update, Delete) 작업을 통해 관리할 수 있는 RESTful API를 제공합니다.

---

## 주요 기능

### Task 조회 (GET /tasks)

- Task 목록을 조회합니다.
- 쿼리 파라미터 `sort`를 사용하여 정렬 순서를 지정할 수 있습니다. (`oldest` 또는 `desc`, 기본값: `desc`)
- 쿼리 파라미터 `count`를 사용하여 조회할 Task의 갯수를 제한할 수 있습니다.
- MongoDB Atlas에서 데이터를 가져옵니다.

### Task 상세 조회 (GET /tasks/:id)

- 특정 ID의 Task 상세 정보를 조회합니다.
- MongoDB Atlas에서 데이터를 가져옵니다.

### Task 생성 (POST /tasks)

- 새로운 Task를 생성합니다.
- MongoDB Atlas에 데이터를 추가합니다.

### Task 수정 (PATCH /tasks/:id)

- 특정 ID의 Task 정보를 수정합니다.
- MongoDB Atlas의 데이터를 수정합니다.

### Task 삭제 (DELETE /tasks/:id)

- 특정 ID의 Task를 삭제합니다.
- MongoDB Atlas의 데이터를 삭제합니다.

---

## 기술 스택

- **Node.js**: 서버 사이드 JavaScript 런타임 환경
- **Express**: Node.js 웹 프레임워크
- **MongoDB Atlas**: 클라우드 기반 MongoDB 데이터베이스 서비스
- **Mongoose**: MongoDB ODM(Object Data Modeling) 라이브러리
- **JavaScript**: 프로그래밍 언어

---

## 환경 설정

### MongoDB Atlas 설정

1. MongoDB Atlas 계정을 생성하고, 클러스터를 생성합니다.
2. 데이터베이스 연결 문자열(`DATABASE_URL`)을 환경 변수에 설정합니다.

### Node.js 환경 설정

1. Node.js와 npm(또는 yarn)을 설치합니다.
2. `npm install` 명령어를 실행하여 필요한 의존성을 설치합니다.
3. `.env` 파일을 생성하고, `DATABASE_URL`을 채워줍니다.

### 실행 방법

- `npm run start`: 배포 환경 실행
- `npm run dev`: 개발 환경 실행
- `npm run seed`: MongoDB에 데이터 Seeding
