# Build a Simple TypeScript API on AWS

This guide builds a small API one component at a time. The finished endpoint is:

```text
GET /hello?name=Tom
```

It returns:

```json
{
  "message": "Hello, Tom!"
}
```

## Architecture

```text
Client -> API Gateway HTTP API -> Lambda -> JSON response
```

- **API Gateway** receives `GET /hello` requests.
- **Lambda** runs the TypeScript handler.
- **AWS SAM** builds the code and deploys the CloudFormation stack.

## 1. Install the tools

Install Node.js 22 or newer, Docker Desktop, AWS CLI, and AWS SAM CLI. Verify them in PowerShell:

```powershell
node --version
npm --version
docker --version
aws --version
sam --version
```

## 2. Create the folders

```powershell
New-Item -ItemType Directory -Name typescript-aws-api
Set-Location typescript-aws-api
New-Item -ItemType Directory -Path src/handlers
New-Item -ItemType Directory -Path tests
New-Item -ItemType Directory -Path events
```

## 3. Configure Node.js

Create `package.json`. It defines commands for type checking, testing, building, local execution, and deployment. It also installs TypeScript, Lambda types, the `tsx` test runner, and the `esbuild` bundler.

After creating it, install the packages:

```powershell
npm install
```

Create `tsconfig.json`. The important setting is `strict: true`, which helps TypeScript catch common mistakes.

## 4. Create the Lambda component

Create `src/handlers/hello.ts`.

The exported `handler` is the function AWS invokes. It reads `name` from `event.queryStringParameters`, builds a JSON response, and returns HTTP status `200`. If no name is supplied, it uses `World`.

## 5. Create the API Gateway and infrastructure components

Create `template.yaml`.

The template contains:

- `HttpApi`, which creates the API Gateway HTTP API.
- `HelloFunction`, which creates the Node.js 22 Lambda.
- `HelloRoute`, which connects `GET /hello` to the Lambda.
- `BuildMethod: esbuild`, which compiles and bundles TypeScript.
- `ApiUrl`, which prints the endpoint after deployment.

SAM also generates the Lambda execution role and permission for API Gateway to invoke Lambda.

## 6. Create a local test event

Create `events/hello.json`. It represents an API Gateway version 2 request and supplies `name=Tom` as the query string.

Invoke the function with this event after building:

```powershell
sam local invoke HelloFunction --event events/hello.json
```

## 7. Create the automated test

Create `tests/hello.test.ts`. It checks both behaviours:

1. No name returns `Hello, World!`.
2. `Tom` returns `Hello, Tom!`.

Run the checks:

```powershell
npm run typecheck
npm test
```

## 8. Build the application

```powershell
npm run build
```

SAM reads `template.yaml`, compiles the TypeScript with esbuild, and writes generated files to `.aws-sam`.

## 9. Run the API locally

Start Docker Desktop, then run:

```powershell
npm run local
```

In a second PowerShell window, test the endpoint:

```powershell
Invoke-RestMethod "http://127.0.0.1:3000/hello?name=Tom"
```

Press `Ctrl+C` to stop the API.

## 10. Configure AWS credentials

```powershell
aws configure
aws sts get-caller-identity
```

Choose your AWS region, such as `ap-southeast-2`. Never place AWS access keys in the project.

## 11. Deploy to AWS

```powershell
npm run build
npm run deploy
```

Suggested guided-deployment answers:

```text
Stack Name: typescript-aws-api
AWS Region: ap-southeast-2
Confirm changes before deploy: Y
Allow SAM CLI IAM role creation: Y
Disable rollback: N
Save arguments to configuration file: Y
```

When deployment finishes, copy the `ApiUrl` output and test it:

```powershell
Invoke-RestMethod "YOUR_API_URL?name=Tom"
```

## 12. View Lambda logs

```powershell
sam logs --name HelloFunction --stack-name typescript-aws-api --tail
```

## 13. Remove the AWS resources

Delete the stack when finished practising:

```powershell
sam delete --stack-name typescript-aws-api
```

## Project structure

```text
typescript-aws-api/
|-- events/hello.json
|-- src/handlers/hello.ts
|-- tests/hello.test.ts
|-- .gitignore
|-- package.json
|-- README.md
|-- template.yaml
|-- tsconfig.json
`-- TUTORIAL.md
```

## Next exercises

1. Add a `POST /hello` route.
2. Validate the request and return HTTP `400` for invalid input.
3. Store records in DynamoDB.
4. Add Cognito authentication.
