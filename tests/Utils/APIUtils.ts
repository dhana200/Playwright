export class APIUtils
{
    apiContext: any;
    loginpayload: any;

    constructor(apiContext:any, loginpayload:any)
    {
        this.apiContext = apiContext;
        this.loginpayload = loginpayload;
    }
    
    async getOrderId()
    {
        const getresponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: this.loginpayload
        });
        const responseBody = await getresponse.json();
        let token: string = responseBody.token;
        return token;
    }


    async createOrder(orderPayload:any)
    {
        let response = {};
        response['token'] = await this.getOrderId();
        console.log(`Order PayLoad: ${JSON.stringify(orderPayload)}`);

        let orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload,
            headers: {
                'Authorization': response['token'],
                'content-type': 'application/json'
            }
        });
    
        const orderResponseBody = await orderResponse.json();
        console.log(`Order Response: ${JSON.stringify(orderResponseBody)}`);
        response['OrderId'] = orderResponseBody.orders[0];
        return response;
    }
}