const {Builder, By} = require("selenium-webdriver");
const assert = require("assert");

const driver = new Builder().forBrowser("firefox").build();
let numberOfTestsCompleted = 0;
let numberOfErrors = 0;
const numberOfTests = 7;


async function gotoHomePage() {
        //The driver goes to http://localhost:8080/
        await driver.get("http://127.0.0.1:8080");
        numberOfTestsCompleted = numberOfTestsCompleted + 1;
        /* eslint-disable no-console */
        console.log("RUNNING TEST STEP " + numberOfTestsCompleted + ": Opening the Application at Port 8080..");
}

async function testTitle() {
    try{
        await driver.findElement(By.id("theTitle"))
        .getText().then( (textValue) => {
          assert.notEqual(null, textValue);
        })
        .catch( (err) => {
            /* eslint-disable no-console */
            console.log(err);
            /* eslint-enable no-console */
            numberOfErrors = numberOfErrors + 1;
        });
        numberOfTestsCompleted = numberOfTestsCompleted + 1;
        /* eslint-disable no-console */
        console.log("RUNNING TEST STEP " + numberOfTestsCompleted  + ": Checking the main title of the application is still valid..");
        /* eslint-enable no-console */
    }catch(error){
        /* eslint-disable no-console */
        console.log(error);
        /* eslint-enable no-console */
        numberOfErrors = numberOfErrors + 1;
    }
}

async function testNumbersForActiveCases() {
        //The below function gets the xPath for the "Currently Affected" value
        await driver.findElement(By.xpath("//*[@id='app']/div/div[2]/div[2]/div[1]/div/div/div/p[1]"))
        .getText().then( (textValue) => {
            //The code below strips the input, and gets only the numbers (i.e. number of cases) and gets rid of the characters.
            textValue = textValue.replace(/[^0-9]/g, "");
          assert.notEqual(null, textValue);
          assert.notEqual("0", textValue);
        })
        .catch( (err) => {
            /* eslint-disable no-console */
            console.log(err);
            /* eslint-enable no-console */
            numberOfErrors = numberOfErrors + 1;
        });

        //The below function gets the xPath for the "Last Checked" value
        await driver.findElement(By.xpath("//*[@id='app']/div/div[2]/div[2]/div[1]/div/div/div/p[2]"))
        .getText().then( (textValue) => {
            //The code below strips the input, and gets only the numbers (i.e. number of cases) and gets rid of the characters.
            textValue = textValue.replace(/[^0-9]/g, "");
          assert.notEqual(null, textValue);
          assert.notEqual("0", textValue);
        })
        .catch( (err) => {
            /* eslint-disable no-console */
            console.log(err);
            /* eslint-enable no-console */
            numberOfErrors = numberOfErrors + 1;
        });

        //The below function gets the xPath for the "Last Reported" value
        await driver.findElement(By.xpath("//*[@id='app']/div/div[2]/div[2]/div[1]/div/div/div/p[3]"))
        .getText().then( (textValue) => {
            //The code below strips the input, and gets only the numbers (i.e. number of cases) and gets rid of the characters.
            textValue = textValue.replace(/[^0-9]/g, "");
          assert.notEqual(null, textValue);
          assert.notEqual("0", textValue);
        })
        .catch( (err) => {
            /* eslint-disable no-console */
            console.log(err);
            /* eslint-enable no-console */
            numberOfErrors = numberOfErrors + 1;
        });

        numberOfTestsCompleted = numberOfTestsCompleted + 1;
        /* eslint-disable no-console */
        console.log("RUNNING TEST STEP " + numberOfTestsCompleted  + ": Checking the Active Cases component's values..");
        /* eslint-enable no-console */
}

async function testNumbersForClosedCases() {
        //The below function gets the xPath for the "Closed Cases" value
        await driver.findElement(By.xpath("//*[@id='app']/div/div[2]/div[2]/div[2]/div/div/div/p[1]"))
        .getText().then( (textValue)  => {
            //The code below strips the input, and gets only the numbers (i.e. number of cases) and gets rid of the characters.
            textValue = textValue.replace(/[^0-9]/g, "");
          assert.notEqual(null, textValue);
          assert.notEqual("0", textValue);
        })
        .catch( (err) => {
            /* eslint-disable no-console */
            console.log(err);
            /* eslint-enable no-console */
            numberOfErrors = numberOfErrors + 1;
        });

        //The below function gets the xPath for the "Recovered" value
        await driver.findElement(By.xpath("//*[@id='app']/div/div[2]/div[2]/div[2]/div/div/div/p[2]"))
        .getText().then( (textValue)  => {
            //The code below strips the input, and gets only the numbers (i.e. number of cases) and gets rid of the characters.
            textValue = textValue.replace(/[^0-9]/g, "");
          assert.notEqual(null, textValue);
          assert.notEqual("0", textValue);
        })
        .catch( (err) => {
            /* eslint-disable no-console */
            console.log(err);
            /* eslint-enable no-console */
            numberOfErrors = numberOfErrors + 1;
        });

        //The below function gets the xPath for the "Deaths" value
        await driver.findElement(By.xpath("//*[@id='app']/div/div[2]/div[2]/div[2]/div/div/div/p[3]"))
        .getText().then( (textValue)  => {
            //The code below strips the input, and gets only the numbers (i.e. number of cases) and gets rid of the characters.
            textValue = textValue.replace(/[^0-9]/g, "");
          assert.notEqual(null, textValue);
          assert.notEqual("0", textValue);
        })
        .catch( (err) => {
            /* eslint-disable no-console */
            console.log(err);
            /* eslint-enable no-console */
            numberOfErrors = numberOfErrors + 1;
        });

        numberOfTestsCompleted = numberOfTestsCompleted + 1;
        /* eslint-disable no-console */
        console.log("RUNNING TEST STEP " + numberOfTestsCompleted  + ": Checking the Closed Cases component's values..");
        /* eslint-enable no-console */
}


async function testGetDataButton() {
        //The below function gets the xPath for the "Get Data" button
        await driver.findElement(By.xpath("//*[@id='app']/div/div[2]/div[2]/div[1]/div/div/div/button")).click();
        await driver.findElement(By.xpath("//*[@id='app']/div/div[2]/div[2]/div[2]/div/div/div/button")).click();
        numberOfTestsCompleted = numberOfTestsCompleted + 1;
        /* eslint-disable no-console */
        console.log("RUNNING TEST STEP " + numberOfTestsCompleted  + ": Clicking the `GET DATA` button..");
        /* eslint-enable no-console */
}

async function gotoStatsPage() {
    //The driver goes to http://localhost:8080/
    await driver.get("http://127.0.0.1:8080/stats");
    numberOfTestsCompleted = numberOfTestsCompleted + 1;
    /* eslint-disable no-console */
    console.log("RUNNING TEST STEP " + numberOfTestsCompleted + ": Opening the Application at Port 8080..");
}

async function testStatsButtons() {
    //The below function gets the xPath for the "Render Latest Information" button
    await driver.findElement(By.xpath("//*[@id='app']/div/div[2]/div[1]/button")).click();
    await driver.findElement(By.xpath("//*[@id='app']/div/div[2]/div[1]/div/div")).click();
    numberOfTestsCompleted = numberOfTestsCompleted + 1;
    /* eslint-disable no-console */
    console.log("RUNNING TEST STEP " + numberOfTestsCompleted  + ": Clicking the `GET DATA` button..");
    /* eslint-enable no-console */
}

async function runAllTests() {
    try{
        /* eslint-disable no-console */
        console.log("TOTAL NUMBER OF TESTS: " + numberOfTests);
        /* eslint-enable no-console */
        //Open the App using Firefox, at Port 8080
        await gotoHomePage();

        //Make sure the main title of the application has not been damaged
        await testTitle();

        //Make sure the values for Active cases is not null, and is not 0.
        await testNumbersForActiveCases();

        //Make sure the values for Closed cases is not null, and is not 0.
        await testNumbersForClosedCases();

        //Test the Get Data Button
        await testGetDataButton();

        //Go to statistics page
        await gotoStatsPage();

        //Test buttons on the statistics page
        await testStatsButtons();

        //We are done testing!
        await driver.close();

        //Final message to verify results
        if(numberOfTests === numberOfTestsCompleted){
            /* eslint-disable no-console */
            console.log("ALL TESTS HAVE PASSED!");
            /* eslint-enable no-console */
        }
        else{
            /* eslint-disable no-console */
            console.log(numberOfErrors + " TESTS HAVE FAILED!");
            /* eslint-enable no-console */
        }
    }catch(error){
        /* eslint-disable no-console */
        console.log(error);
        /* eslint-enable no-console */
        numberOfErrors = numberOfErrors + 1;
    }
}


//Function call to run ALL tests.
runAllTests();



