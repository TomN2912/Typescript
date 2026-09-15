# Simple TypeScript API on AWS

A beginner project using TypeScript, AWS Lambda, API Gateway HTTP API, and AWS SAM.

The API exposes:

```text
GET /hello
GET /hello?name=Tom
```

Example response:

```json
{
  "message": "Hello, Tom!"
}
```

Follow [TUTORIAL.md](TUTORIAL.md) to create, understand, test, and deploy every component.

## Quick start

```powershell
npm install
npm run typecheck
npm test
npm run build
npm run local
```

Test the local endpoint:

```powershell
Invoke-RestMethod "http://127.0.0.1:3000/hello?name=Tom"
```

Deploy to AWS:

```powershell
npm run deploy
```

Remove the deployed resources when finished:

```powershell
sam delete
```
