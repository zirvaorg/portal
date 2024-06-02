Ext.define('ZirvaPortal.store.PointStore', {
    extend: 'Ext.data.Store',
    alias: 'store.pointStore',

    requires: [
        'ZirvaPortal.config.Config'
    ],

    storeId: 'pointStore',
    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Points', type: 'int'},
        {name: 'Request', type: 'string'},
        {name: 'CreatedAt', type: 'date'}
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
        beforeload: function(store) {
            let token = LoginController.getUserStoreToken();
            store.getProxy().setHeaders({
                'Authorization': `Bearer ${token}`
            });
        }
    },
    autoLoad: true
});
