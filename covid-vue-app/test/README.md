## How this app is tested

This application uses Vue.js and Node.js. Testing is done with Jest and Selenium Webdriver. Node.js is tested with Jest, and Vue.js components are tested at ```localhost:8080``` automatically. 

### server.test.js
The file ```server.test.js``` uses Jest, and tests the file server.js, which uses Node.js. It checks the response codes from the routing of pages, and also outputs a code coverage report in ```covid-vue-app/coverage```. You can run it with: ```npm test``` inside of  ```covid-vue-app```

### frontend-test.js
Prerequisites: You must have Node.js installed, and run  ```npm run serve``` inside of ```covid-vue-app``` in another terminal - This allows ```frontend-test.js``` to go to ```localhost:8080``` to test the frontend.
This file ```frontend-test.js``` uses Selenium WebdriverJS, and tests the front-end UI components from Vue.js. It does things such as making sure values are not null or 0, ensuring the user sees the right values. ```console.log()``` statements are outputted as each test runs. If the whole file runs without any errors, then all tests have passed. You can run it with: ```node frontend-test.js``` inside of ```covid-vue-app/test```.