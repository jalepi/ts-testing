# ts-testing
Examples of testing with Jest and Vitest

# initial setup
Create NPM package `npm init`  
Create source folder `md src`  
Install TypeScript `npm install -D typescript`  
Init TypeScript `npx tsc --init`  
Create dummy `src/index.ts`  

# setup Jest
Uses JSDOM for DOM emulation  
Install dependencies `npm install -D jest @jest/globals jest-environment-jsdom ts-jest`  
Configure Jest `npm init jest@latest`  
Add dummy test `src/index.jest.ts`  

# setup Vitest
Uses Happy DOM for DOM emulation - to avoid package conflict with Jest  
Install dependencies `npm install -D vitest happy-dom`  
Configure Vitest - create `vitest.config.mts` file  
Setup script in `package.json`  
Add dummy test `src/index.vitest.ts`  

# review scripts
Jest test run `npm run jest`  
Jest test run with watch `npm run jest:watch`  
Vitest test run `npm run vitest`  
Vitest test run with watch `npm run vitest:watch`  




