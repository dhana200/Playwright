// class APIUtil
// {
//     apiContext: any;
//     loginpayload: any;
//     response: any;

//     constructor(apiContext, loginpayload)
//     {
//         this.apiContext = apiContext;
//         this.loginpayload = loginpayload;
//     }
    
//     async getOrderId()
//     {
//         const getresponse = await this.apiContext.post(, {
//             data: this.loginpayload
//         });
//         const responseBody = await getresponse.json();
//         this.response.token = responseBody.token;
//         return this.response.token;
//     }


//     async createOrder(orderPayload)
//     {
//          const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
//                 data: {
//                     orders: orderPayload
//                 },
//                 headers: {
//                     'Authorization': this.getOrderId(),
//                     'content-type': 'application/json'
//                 }
//             });
        
//             const orderResponseBody = await orderResponse.json();
//             this.response.OrderId = orderResponseBody.orders[0];
//             return this.response;
//     }
// }

// export { APIUtil };