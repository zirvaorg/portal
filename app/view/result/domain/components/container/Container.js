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
                    title: 'DNS',
                    iconCls: 'x-fa fa-info-circle',
                    isPanelAdded: false,
                    listeners: {
                        activate: function() {
                            if (!this.isPanelAdded) {
                                this.add({ });
                                this.isPanelAdded = true;
                            }
                        }
                    }
                },{
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
                    title: 'Ports',
                    iconCls: 'x-fa fa-network-wired',
                    isPanelAdded: false,
                    listeners: {
                        activate: function() {
                            if (!this.isPanelAdded) {
                                this.add({ xtype: 'tab-ports' });
                                this.isPanelAdded = true;
                            }
                        }
                    }
                },
            ]
        }
    ]
});