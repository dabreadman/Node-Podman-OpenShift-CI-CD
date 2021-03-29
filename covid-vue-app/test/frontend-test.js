const {Builder, By} = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder().forBrowser("firefox").build();
var numberOfTestsCompleted = 0;
var numberOfErrors = 0;
const numberOfTests = 5;


async function openTheApp() {
    try{
        await driver.get("http://localhost:8080/");
        numberOfTestsCompleted = numberOfTestsCompleted + 1;
        console.log("RUNNING TEST STEP " + numberOfTestsCompleted + ": Opening the Application at Port 8080..");
    }catch(error){
        console.log(error);
        numberOfErrors = numberOfErrors + 1;
    }
}

async function testTitle() {
    try{
        await driver.findElement(By.className('display-4'))
        .getText().then(textValue => {
          assert.equal('Coronavirus total cases', textValue);
        })
        .catch(err => {
            console.log(error);
            numberOfErrors = numberOfErrors + 1;
        });
        numberOfTestsCompleted = numberOfTestsCompleted + 1;
        console.log("RUNNING TEST STEP " + numberOfTestsCompleted  + ": Checking the main title of the application is still valid..");
    }catch(error){
        console.log(error);
        numberOfErrors = numberOfErrors + 1;
    }
}

async function testNumbersForActiveCases() {
    try{
        //The below function gets the xPath for the "Currently Affected" value
        await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div[2]/div[1]/div/div[2]/div/p[1]'))
        .getText().then(textValue => {
            //The code below strips the input, and gets only the numbers (i.e. number of cases) and gets rid of the characters.
            textValue = textValue.replace(/[^0-9]/g, '');
          assert.notEqual(null, textValue);
          assert.notEqual("0", textValue);
        })
        .catch(err => {
            console.log(error);
            numberOfErrors = numberOfErrors + 1;
        });

        //The below function gets the xPath for the "Mild Condition" value
        await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div[2]/div[1]/div/div[2]/div/p[2]'))
        .getText().then(textValue => {
            //The code below strips the input, and gets only the numbers (i.e. number of cases) and gets rid of the characters.
            textValue = textValue.replace(/[^0-9]/g, '');
          assert.notEqual(null, textValue);
          assert.notEqual("0", textValue);
        })
        .catch(err => {
            console.log(error);
            numberOfErrors = numberOfErrors + 1;
        });

        //The below function gets the xPath for the "Mild Condition" value
        await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div[2]/div[1]/div/div[2]/div/p[3]'))
        .getText().then(textValue => {
            //The code below strips the input, and gets only the numbers (i.e. number of cases) and gets rid of the characters.
            textValue = textValue.replace(/[^0-9]/g, '');
          assert.notEqual(null, textValue);
          assert.notEqual("0", textValue);
        })
        .catch(err => {
            console.log(error);
            numberOfErrors = numberOfErrors + 1;
        });

        numberOfTestsCompleted = numberOfTestsCompleted + 1;
        console.log("RUNNING TEST STEP " + numberOfTestsCompleted  + ": Checking the Active Cases component's values..");
    }catch(error){
        console.log(error);
        numberOfErrors = numberOfErrors + 1;
    }
}

async function testNumbersForClosedCases() {
    try{
        //The below function gets the xPath for the "Currently Affected" value
        await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div[2]/div[2]/div/div[2]/div/p[1]'))
        .getText().then(textValue => {
            //The code below strips the input, and gets only the numbers (i.e. number of cases) and gets rid of the characters.
            textValue = textValue.replace(/[^0-9]/g, '');
          assert.notEqual(null, textValue);
          assert.notEqual("0", textValue);
        })
        .catch(err => {
            console.log(error);
            numberOfErrors = numberOfErrors + 1;
        });

        //The below function gets the xPath for the "Mild Condition" value
        await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div[2]/div[2]/div/div[2]/div/p[2]'))
        .getText().then(textValue => {
            //The code below strips the input, and gets only the numbers (i.e. number of cases) and gets rid of the characters.
            textValue = textValue.replace(/[^0-9]/g, '');
          assert.notEqual(null, textValue);
          assert.notEqual("0", textValue);
        })
        .catch(err => {
            console.log(error);
            numberOfErrors = numberOfErrors + 1;
        });

        //The below function gets the xPath for the "Mild Condition" value
        await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div[2]/div[2]/div/div[2]/div/p[3]'))
        .getText().then(textValue => {
            //The code below strips the input, and gets only the numbers (i.e. number of cases) and gets rid of the characters.
            textValue = textValue.replace(/[^0-9]/g, '');
          assert.notEqual(null, textValue);
          assert.notEqual("0", textValue);
        })
        .catch(err => {
            console.log(error);
            numberOfErrors = numberOfErrors + 1;
        });

        numberOfTestsCompleted = numberOfTestsCompleted + 1;
        console.log("RUNNING TEST STEP " + numberOfTestsCompleted  + ": Checking the Closed Cases component's values..");
    }catch(error){
        console.log(error);
        numberOfErrors = numberOfErrors + 1;
    }
}


async function testGetDataButton() {
    try{
        //The below function gets the xPath for the "Get Data" button
        await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div[2]/div[2]/div/div[2]/div/button')).click();
        numberOfTestsCompleted = numberOfTestsCompleted + 1;
        console.log("RUNNING TEST STEP " + numberOfTestsCompleted  + ": Clicking the `GET DATA` button..");
    }catch(error){
        console.log(error);
        numberOfErrors = numberOfErrors + 1;
    }
}

async function runAllTests() {
    try{
        console.log("TOTAL NUMBER OF TESTS: " + numberOfTests);
        //Open the App using Firefox, at Port 8080
        await openTheApp();

        //Make sure the main title of the application has not been damaged
        await testTitle();

        //Make sure the values for Active cases is not null, and is not 0.
        await testNumbersForActiveCases();

        //Make sure the values for Closed cases is not null, and is not 0.
        await testNumbersForClosedCases();

        //Test the Get Data Button
        await testGetDataButton();

        //We are done testing!
        await driver.close();

        //Final message to verify results
        if(numberOfTests == numberOfTestsCompleted){
            console.log("ALL TESTS HAVE PASSED!")
        }
        else{
            console.log(numberOfErrors + " TESTS HAVE FAILED!")
        }
    }catch(error){
        console.log(error);
        numberOfErrors = numberOfErrors + 1;
    }
}


//Function call to run ALL tests.
runAllTests();



