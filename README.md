# frontend_modules

Hirediversity frontend 개발을 위한 api, 정적 자료, React 컴포넌트, 인터페이스, 변수

## 사용방법

### install

```bash
cd {your frontend directory}
git submodule add {link of this repository} fe-modules
```

### config

이후 tsconfig.json 의 paths 에

```json
"fe-modules/*": ["./fe-modules/*"],
```

추가

### dev

```typescript
import { what_you_want } from 'fe-modules/...';
```

## 개발방법

frontend_modules_test 저장소에서 개발

## 제공기능

apis : aws, 서버, airtable api

- airtable : airtable api
- client : client side 서버 api
- dynamoDB : aws dynamoDB api
- s3 : aws s3 api
- lambda : aws test api (temporary api)

components : React 컴포넌트

- FormUI : Hirediversity 자체폼 컴포넌트
- FormPage : Hirediversity 자체폼

models : React 인터페이스, 타입

hooks : React 커스텀 훅
