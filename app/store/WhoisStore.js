Ext.define('ZirvaPortal.store.WhoisStore', {
    extend: 'Ext.data.Store',
    alias: 'store.whoisstore',
    fields: ['key', 'value'],
    proxy: {
        type: 'ajax',
        // url: ZirvaPortal.config.Config.baseUrl,
        reader: {
            type: 'json',
            rootProperty: 'data' // Adjust based on the actual structure of your API response
        }
    },
    listeners: {
        beforeload: function(store, operation, eOpts) {
            // var token = LoginController.getUserStoreToken();
            // if (token) {
            //     console.log("Token: ", token);
            // } else {
            //     console.log("No token found");
            // }
            store.getProxy().setHeaders({
                // 'Authorization': `Bearer ${token}`
                'Authorization': "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTc1NDcwNTYsInV1aWQiOiJkNGE5MzIzYi1mZmU5LTQxMjAtYmUzNS0zMmMxZTgxMTFiYzQifQ.XR2H6NzX8-5IZWXgTD8S2xa09jPFkAXZdKsQgBOItEtVRgLLGNDJkle8QWuf2Q__atDwSW4BVZPM9dgMKW-_lhM71-jjVWkaQ_YisasEGYtyIfyW3y4Uercfgi_8ifkhi5y-KwOaXdx1zUUwA_8I6IKBvMwv9tCmZXavDA1EgXC5Kiyp1FLQt7I6WYC5arsXg-Y3aPHQRRZGI2JBJ6vrSfxuccjmApIX1h72NDtx0TiF-EA0PPcPDTjO2fkBLY0fyLJtI7wpG0rQji1cdlqsfxrl6T1b67TxJ0IozxQut89A0Z8NwAAgw4-5CxPVUuB7xHTywRqnn0_ofpJNq-5uQw"
            });
        }
    },
    autoLoad: true
});