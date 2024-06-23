Ext.define('ZirvaPortal.store.WhoisStore', {
    extend: 'Ext.data.Store',
    alias: 'store.whoisStore',
    fields: ['key', 'value'],
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'whois'
        }
    },
    listeners: {
        beforeload: function(store) {
            let token = LoginController.getUserStoreToken();
            store.getProxy().setHeaders({
                'Authorization': `Bearer ${token}`
            });
        },
        load: function(store, records, successful, operation) {
            if (successful) {
                const whoisResponse = operation.getResponse().responseJson;
                const whoisData = whoisResponse.whois;

                if (!whoisData || !whoisData.output) {
                    return;
                }

                const parsedData = [{ key: 'whois server', value: whoisData.whois_server }]
                    .concat(Object.keys(whoisData.details)
                        .map(key => ({ key: key.replace(/_/g, ' '), value: whoisData.details[key] })));
                store.setData(parsedData);
            }
        }
    },
    autoLoad: true
});