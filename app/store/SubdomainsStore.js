Ext.define('ZirvaPortal.store.SubdomainsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.SubdomainsStore',
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'subdomains'
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