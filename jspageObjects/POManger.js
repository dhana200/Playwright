import { LoginPage } from './LoginPage.js';
import { DashBoardPage } from './DashBoardPage.js';
import { CartPage } from './CartPage.js';
import { CheckOutPage } from './CheckOutPage.js';
import { EndPage } from './EndPage.js';

export class POManger {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashBoardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkOutPage = new CheckOutPage(this.page);
        this.endPage = new EndPage(this.page);
    }

    async getLoginPage() {
        return this.loginPage;
    }

    async getDashboardPage() {
        return this.dashboardPage;
    }

    async getCartPage() {
        return this.cartPage;
    }

    async getCheckOutPage() {
        return this.checkOutPage;
    }

    async getEndPage() {
        return this.endPage;
    }

}
