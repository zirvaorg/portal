Ext.define('ZirvaPortal.view.result.domain.components.container.Container', {
    extend: 'Ext.container.Container',
    xtype: 'dashboard',

    requires: [
        'Ext.layout.Card',
        'Ext.tab.Panel',
        'Ext.layout.overflow.Scroller',
        'ZirvaPortal.view.result.domain.components.tabs.Health',
        'ZirvaPortal.view.result.domain.components.tabs.Whois'
    ],

    items: [{
            xtype: 'tabpanel',
            itemId: 'tabpanel',
            layout: {
                type: 'card',
                animation: false,
            },

            tabBar: {
                layout: {
                    pack: 'start',
                    overflow: 'scroller'
                },
            },

            items: [{
                    title: 'Health',
                    iconCls: 'x-fa fa-heart-broken',
                    isPanelAdded: false,
                    listeners: {
                        activate: function() {
                            if (!this.isPanelAdded) {
                                this.add({ xtype: 'tab-health' });
                                this.isPanelAdded = true;
                            }
                        }
                    }
                },
                {
                    title: 'Whois',
                    iconCls: 'x-fa fa-user-secret',
                    isPanelAdded: false,
                    listeners: {
                        activate: function() {
                            if (!this.isPanelAdded) {
                                this.add({ xtype: 'tab-whois' });
                                this.isPanelAdded = true;
                            }
                        }
                    }
                },
                {
                    title: 'Subdomains',
                    iconCls: 'x-fa fa-sitemap',
                    isPanelAdded: false,
                    listeners: {
                        activate: function() {
                            if (!this.isPanelAdded) {
                                this.add({ xtype: 'tab-subdomains' });
                                this.isPanelAdded = true;
                            }
                        }
                    }
                },
                {
                    title: 'DNS History',
                    iconCls: 'x-fa fa-history',
                    isPanelAdded: false,
                    listeners: {
                        activate: function() {
                            if (!this.isPanelAdded) {
                                //
                                this.isPanelAdded = true;
                            }
                        }
                    }
                },
                {
                    title: 'MX Records',
                    iconCls: 'x-fa fa-envelope',
                    isPanelAdded: false,
                    listeners: {
                        activate: function() {
                            if (!this.isPanelAdded) {
                                //
                                this.isPanelAdded = true;
                            }
                        }
                    }
                }
            ]
        }
    ]
});