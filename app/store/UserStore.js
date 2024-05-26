Ext.define('ZirvaPortal.store.UserStore', {
    extend: 'Ext.data.Store',
    alias: 'store.userstore', 
    storeId: 'userstore', 

    fields: ['username', 'loggedIn', 'token', 'email', 'point', 'registerDate'],

    proxy: {
        type: 'localstorage',
        id: 'user-data'
    },

    autoLoad: true,
    autoSync: true
});
