const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3001;
const stealthPlugin = require('puppeteer-extra-plugin-stealth')
const puppeteer = require('puppeteer')
const { login } = require('./workers/login.js')
require('dotenv').config();
app.get('/',(req,res) =>{

})
const startServer = async () => {
    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote"
        ],
        executablePath: process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
    });

    try {


        const page = await browser.newPage()

        page.on('console', (msg) => {
            if (msg.type() === 'log') {
                console.log(`[Page Log] ${msg.text()}`);
            } else if (msg.type() === 'error') {
                console.error(`[Page Error] ${msg.text()}`);
            } else {
                // Handle other message types if needed
            }
        });
        await page.emulate(puppeteer.devices['iPhone X']);
        await page.goto('https://faucetearner.org')
        // await page.screenshot({ path: 'example.png' });
        const loginButton = await page.$x('//*[@id="hero"]/div/div/div/div[2]/a[2]');
        await loginButton[0].click();
        await page.waitForNavigation();
       // await page.screenshot({ path: 'example.png' });
        const phoneInput = await page.$x('//*[@id="email"]')
        const passwordInput = await page.$x('//*[@id="password"]')
        const logbtn = await page.$x('/html/body/div[1]/div/div/div/form/button')
        const phoneInputElement = phoneInput[0];
        const passwordInputElement = passwordInput[0];

        // Typing into the input fields
        await phoneInputElement.type('peterninyo4@gmail.com');
        await passwordInputElement.type('12858588');
        await logbtn[0].click()
        await page.waitForNavigation();

        await new Promise(resolve => setTimeout(resolve, 2000));
     //   await page.screenshot({ path: 'exampled.png' });
        const modalbtn = await page.$x('//*[@id="basic-addon1"]')
        if (modalbtn.length > 0) {
            modalbtn[0].click()
            console.log('modal clicked')
        }
        else {
            console.log('modal doesnt exist')
        }
        //  await new Promise(resolve => setTimeout(resolve, 60000));
        //  await btntoclick[0].click()
        //  await page.screenshot({ path: 'clickedd.png' });
        async function clickButtonRepeatedly() {
            const btntoclick = await page.$x('//*[@id="body"]/div[1]/div[3]/div[2]/div/div[4]/div[1]/form/button');

            if (btntoclick.length > 0) {
                setInterval(async () => {
                    await btntoclick[0].click();
                  //  await page.screenshot({ path: 'clickedd.png' });
                    console.log('clicked')
                }, 60000);
            } else {
                console.error('Button not found.');
            }
        }

        await clickButtonRepeatedly();
    }
    catch (error) {
        console.log(error)
    }


}
app.get('/',(req,res) =>{
    startServer()
    res.send('Puppeteer is working well')
})

server.listen(port, () => {
    startServer()
    console.log('server is listening')
})
