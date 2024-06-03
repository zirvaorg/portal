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
        }
    },
    autoLoad: true
});