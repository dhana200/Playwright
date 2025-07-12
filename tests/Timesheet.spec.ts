import {test,expect,request} from '@playwright/test';
const fs = require('fs');
const statejson = './state.json';

test.describe('Timesheet Tests', () => {

    const loginpayload = {
                            "employeeid": "PDHANUSH",
                            "password": "Keerthi@2k"
                        };
    const timesheetpayload = {
        "mode": "sheet",
        "employee": "pdhanush",
        "shift_end": "02:00:00",
        "date": "07/11/2025",
        "start": "10:00 am",
        "end": "06:00 pm",
        "hours": "8.00",
        "earning": "REG",
        "department": "732",
        "job": "24755",
        "entry_type": "regular",
        "notes": "Automation Testing."
    };

    test.only('TimeSheet Update', async ({browser}) => {

        const newContext = await browser.newContext();
        const page = await newContext.newPage();
        const apiContext = await request.newContext();

        await page.goto('https://on-timeweb.com/aptean/');
        await page.waitForLoadState('networkidle');

        const usernameInput = page.locator('#employeeid');
        const passwordInput = page.locator('#password');

        await usernameInput.fill(loginpayload.employeeid);
        await passwordInput.fill(loginpayload.password);

        const loginButton = page.getByRole('button', { name: 'Login' });

        await loginButton.click();

        await page.waitForLoadState('networkidle');

        await newContext.storageState({ path: 'state.json' });

        // Read the state.json file and extract the PHPSESSID token from cookies
        const state = JSON.parse(fs.readFileSync(statejson, 'utf-8'));
        const cookies = state.cookies || [];
        const token = cookies[0].value;
        console.log(`Token from state.json: ${token}`);

        const filltimesheetResponse = await apiContext.post('https://on-timeweb.com/aptean/assets/ajax/timesheet.php', {
            form: timesheetpayload,
            headers: {
                'Cookie': `PHPSESSID=${token}`,
                'Accept-Encoding': 'gzip',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0',
                'X-Requested-With': 'XMLHttpRequest',
                'Connection': 'Keep-Alive',
                'Fetch-Mode': 'cors'
            }
        });

        
        const timesheetjson = JSON.stringify(filltimesheetResponse);
        console.log(`Fill Timesheet Response: ${timesheetjson}`);

        expect(filltimesheetResponse.ok()).toBeTruthy();
    });

});