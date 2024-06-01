Ext.define('ZirvaPortal.store.WhoisStore', {
    extend: 'Ext.data.Store',
    alias: 'store.whoisstore',
    fields: ['key', 'value'],
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    listeners: {
        beforeload: function(store) {
            var token = LoginController.getUserStoreToken();
            store.getProxy().setHeaders({
                'Authorization': `Bearer ${token}`
            });
        }
    },
    autoLoad: true
});