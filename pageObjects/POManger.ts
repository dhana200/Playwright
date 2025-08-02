import { LoginPage } from '../pageObjects/LoginPage.ts';
import { DashBoardPage } from '../pageObjects/DashBoardPage.ts';
import { CartPage } from '../pageObjects/CartPage.ts';
import { CheckOutPage } from '../pageObjects/CheckOutPage.ts';
import { EndPage } from '../pageObjects/EndPage.ts';

export class POManger{

    page: any;
    loginPage: LoginPage;
    dashboardPage: DashBoardPage;
    cartPage: CartPage;
    checkOutPage: CheckOutPage;
    endPage: EndPage;

    constructor(page: any) {
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