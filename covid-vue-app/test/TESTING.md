## How this app is tested

This application uses Vue.js and Node.js. Testing is done with Jest and Selenium Webdriver. Node.js is tested with Jest, and Vue.js components are tested at `localhost:8080` automatically. 

<h3><u>server.test.js</u></h3>

Requirements: `Jest`

What is tested: `server.js`

The file `server.test.js` uses Jest, and tests the file server.js, which uses Node.js. It checks the response codes from the routing of pages, and also outputs a code coverage report in `covid-vue-app/coverage`. 

You can run it with: `npm test` inside of  `covid-vue-app`

`Test 1: Test the root path to the homepage`

`Test 2: Test the path to stats page`

<h3><u>frontend.test.js</u></h3>

Requirements: `Node.js`, `Firefox` and run  `npm run serve` inside of `covid-vue-app` in another terminal beforehand. This allows `frontend.test.js` to go to `localhost:8080` to test the frontend. 

What is tested: `front-end UI Vue.js rendering`

This file automatically opens a new firefox tab, and goes to the development server. This file `frontend.test.js` uses Selenium WebdriverJS, and tests the front-end UI components from Vue.js. It does things such as making sure important values are rendered, ensuring the user will still be able to see any important information after any changes. `console.log()` statements are outputted as each test runs. If the whole file runs without any errors, then all tests have passed. 

You can run it with: `node frontend.test.js` inside of `covid-vue-app/test`.

`Test 1: Go to the home page..`

`Test 2: Validate the title..`

`Test 3: Check numbers for active cases are valid...`

`Test 4: Check numbers for closed cases are valid...`

`Test 5: Check that the "GET DATA" button works...`

`Test 6: Go to the stats page...`

`Test 7: Check that the stats buttons work...`
