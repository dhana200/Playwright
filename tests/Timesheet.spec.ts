import {test,expect,request} from '@playwright/test';
const fs = require('fs');
const statejson = './state.json';

test.describe('Timesheet Tests', () => {

    const loginpayload = {
        "employeeid": "agnana",
        "password": "Alpha@007!"
    };

    const baseTimesheetPayload = {
        "mode": "sheet",
        "employee": "agnana",
        "shift_end": "02:00:00",
        "start": "01:00 pm",
        "end": "10:00 pm",
        "hours": "8.00",
        "earning": "REG",
        "department": "732",
        "job": "24755",
        "entry_type": "regular",
        "notes": "Automation Testing."
    };

    // Helper to get all weekdays (Mon-Fri) for a given week
    function getWeekdays(startDate: string): string[] {
        const [month, day, year] = startDate.split('/').map(Number);
        const start = new Date(year, month - 1, day);
        // Find Monday of the week
        const dayOfWeek = start.getDay();
        const monday = new Date(start);
        monday.setDate(start.getDate() - ((dayOfWeek + 6) % 7));
        // Collect dates for Mon-Fri
        const weekdays: string[] = [];
        for (let i = 0; i < 5; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            const yyyy = d.getFullYear();
            weekdays.push(`${mm}/${dd}/${yyyy}`);
        }
        return weekdays;
    }

    test.only('TimeSheet Update for Working Week', async ({ browser }) => {

        // Create a new browser context and page
        const newContext = await browser.newContext();
        const page = await newContext.newPage();

        // Create a new API request context
        const apiContext = await request.newContext();

        // Navigate to the login page
        await page.goto('https://on-timeweb.com/aptean/');

        // Wait for the page to load
        await page.waitForLoadState('networkidle');

        // Fill in the login form
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

        // Set the week start date (e.g., "07/14/2025" for Monday)
        const weekStartDate = "07/14/2025";
        const weekdays = getWeekdays(weekStartDate);

        for (const date of weekdays) {
            const timesheetpayload = {
                ...baseTimesheetPayload,
                date
            };

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

            expect(filltimesheetResponse.ok()).toBeTruthy();
        }
    });

});