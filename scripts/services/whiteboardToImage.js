const puppeteer = require('puppeteer');

function whiteboardToImage(whiteboardId,x,y, width, height) {
    return new Promise(async (resolve, reject) => {
        let browser;
        try {
            // Launch Puppeteer, set the viewport size, and render the HTML
            browser = await puppeteer.launch({headless: "new",
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--single-process'
                ]});
            const page = await browser.newPage();
            await page.setBypassCSP(true);
            await page.goto(`http://localhost:8080/view.html?whiteboardid=${whiteboardId}`, {
                waitUntil: 'networkidle0', // wait until no new network connections for at least 500ms
            });
            await page.setViewport({width: width, height: height});

            // Take a screenshot and resolve the Promise with the Buffer
            const screenshotBuffer = await page.screenshot();
            resolve(screenshotBuffer);
        } catch (error) {
            reject(error);
        } finally {
            // Ensure browser is closed even if an error occurs
            if (browser) await browser.close();
        }
    });
}


module.exports = whiteboardToImage;
