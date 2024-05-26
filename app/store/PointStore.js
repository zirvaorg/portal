Ext.define('ZirvaPortal.store.PointStore', {
    extend: 'Ext.data.Store',
    alias: 'store.pointstore',
    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Points', type: 'int'},
        {name: 'Request', type: 'string'},
        {name: 'createdAt', type: 'date'}
    ],
    proxy: {
        type: 'ajax',
        url: ZirvaPortal.config.Config.baseUrl + 'user/point-history',
        reader: {
            type: 'json',
            rootProperty: 'point_history' 
        }
    },
    listeners: {
        beforeload: function(store, operation, eOpts) {
            var token = LoginController.getUserStoreToken();
            store.getProxy().setHeaders({
                'Authorization': `Bearer ${token}`
            });
        }
    },
    autoLoad: true
});
