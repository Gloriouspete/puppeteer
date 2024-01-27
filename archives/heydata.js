const startServer = async () => {
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    });
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
    await page.goto('https://heydata.com.ng')
    // await page.screenshot({ path: 'example.png' });
    const loginButton = await page.$x('/html/body/div/div[1]/div[1]/div[2]/div[1]/div/div/a[1]/button');
    await loginButton[0].click();
    await page.waitForNavigation();
    await page.screenshot({ path: 'exampled.png' });
    const phoneInput = await page.$x('/html/body/main/div/form/label[1]/input')
    const passwordInput = await page.$x('/html/body/main/div/form/label[2]/input')
    const logbtn = await page.$x('/html/body/main/div/form/button')
    const phoneInputElement = phoneInput[0];
    const passwordInputElement = passwordInput[0];

    // Typing into the input fields
    await phoneInputElement.type('1122');
    await passwordInputElement.type('1258');
    await logbtn[0].click()
    await page.waitForNavigation();

    await new Promise(resolve => setTimeout(resolve, 2000));


    await page.screenshot({ path: 'exampled.png' });


}