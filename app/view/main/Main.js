Ext.define('ZirvaPortal.view.main.Main', {
    extend: 'Ext.container.Container',

    requires: [
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'Ext.tab.Panel',
        'Ext.layout.overflow.Scroller',
        'ZirvaPortal.view.main.components.searchBar.SearchBar'
    ],

    layout: {
        type: 'vbox',
    },

    defaultType: 'panel',

    items: [{
        docked: 'top',
        xtype: 'toolbar',
        id: 'mainToolbar',
        items: [{
            xtype: 'component',
            html: '<h1 style="margin-bottom:7px">zirva.org</h1><span style="color:#f1f1f1">the power of community</span>',
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'search-bar',
        },
        {
            xtype: 'button',
            text: 'clear all',
            ui: 'alt',
            handler: function () {
                // confirm dialog
                Ext.Msg.confirm('Clear All Tabs', 'Are you sure you want to close all tabs?', function (btn) {
                    if (btn === 'yes') {
                        TabSync.removeAllTabs(Ext.getCmp('mainTabPanel'));
                    }
                });
            }
        },
        '->']
    }, {
        flex: 1,
        xtype: 'tabpanel',
        id: 'mainTabPanel',
        layout: {
            type: 'card',
            animation: false,
        },
        autoSize: true,

        tabBar: {
            layout: {
                pack: 'start',
                overflow: 'scroller'
            },
        },

        defaults: {
            scrollable: true,
            userCls: 'card',
            tab: {
                maxWidth: 250,
            },
        },

        items: [{
            title: 'home',
            iconCls: 'x-fa fa-home',
        }]
    }, {
        docked: 'bottom',
        xtype: 'toolbar',
        shadow: true,
        items: [{
            xtype: 'component',
            html: 'zirva.org &copy; 2024 all rights reserved',
        },
        '->',
        {
            xtype: 'container',
            defaultType: 'button',
            defaults: {
                ui: 'alt'
            },
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'space-around'
            },
            items: [{
                text: 'Terms & Conditions',
                handler: function () {
                    Ext.create('terms-and-conditions').show();
                }
            },
            {
                text: 'Disclaimer'
            },
            {
                text: 'Contact'
            }]
        }]
    }]
});