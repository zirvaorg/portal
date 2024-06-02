Ext.define('ZirvaPortal.view.main.components.searchBar.SearchBar', {
    extend: 'Ext.field.Search',
    xtype: 'search-bar',

    id: 'searchBar',
    ui: 'solo',
    flex: 3,
    autoComplete: false,
    listeners: {
        specialkey: function (field, e) {
            if (e.getKey() === e.ENTER) {
                TabSync.addTab(field.getValue());
                Ext.getCmp('searchBar').clearValue();
            }
        },
    },

    onRender: function(field) {
        this.callParent(arguments);
        this.focus(false, 1000);
        this.setPlaceholder('Hostname / IP Address / Email');
    }
});