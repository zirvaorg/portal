Ext.define('ZirvaPortal.view.main.components.searchBar.SearchBar', {
    extend: 'Ext.field.Search',
    xtype: 'search-bar',

    requires: [
        'Ext.dataview.pullrefresh.PullRefresh',
        'Ext.field.Search'
    ],

    id: 'searchBar',
    ui: 'solo',
    flex: 3,
    placeholder: 'Hostname / IP Address / Email Address',
    listeners: {
        specialkey: function (field, e) {
            if (e.getKey() === e.ENTER) {
                TabSync.addTab(field.getValue());
                Ext.getCmp('searchBar').clearValue();
            }
        },
    },
});