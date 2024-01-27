const login = async (page) => {
    // Using your provided XPath to locate the login button
    const loginButton = await page.$x('/html/body/div/div[1]/div[1]/div[2]/div[1]/div/div/a[1]/button');

    // Click the login button if found
    if (loginButton.length > 0) {
        await loginButton[0].click();
        console.log('Clicked on the login button.');
    } else {
        console.error('Login button not found.');
    }
};

module.exports ={login}