Ext.define('ZirvaPortal.model.User', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'username', type: 'string' },
        { name: 'loggedIn', type: 'boolean', defaultValue: false }
    ]
});