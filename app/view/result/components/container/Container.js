Ext.define('ZirvaPortal.view.result.components.container.Container', {
    extend: 'Ext.container.Container',
    xtype: 'dashboard',

    controller: 'container',
    items: [
        {
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

            items: [
                {
                    title: 'Health',
                    iconCls: 'x-fa fa-heart-broken',
                    isPanelAdded: false,
                    listeners: {
                        activate: function() {
                            if (!this.isPanelAdded) {
                                this.add(createGridPanelMultiple(['HTTP', 'PING', 'DNS']));
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
                                this.add(whoisCustomTab('whois', this.up('result').getViewModel().get('param')));
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
                                this.add(createGridPanel('Subdomains'));
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
                                this.add(createGridPanel('DNS History'));
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
                                this.add(createGridPanel('MX Records'));
                                this.isPanelAdded = true;
                            }
                        }
                    }
                }
            ]
        }
    ]
});

function createGridPanel(actionType, param) {
    let storeData = {};
    let columns = [];

    switch (actionType) {
        case 'whois':
            storeData = Ext.create('ZirvaPortal.store.WhoisStore');
            if (param) {
                storeData.getProxy().setUrl( ZirvaPortal.config.Config.baseUrl +`/service/whois?domain=${param}` );
            }
            break;
        default:
            storeData = generateSampleData();
            columns = [{ text: 'Location', dataIndex: 'location', flex: 1 }];
            break;
    }

    return {
        xtype: 'result-grid',
        itemId: actionType,
        store: storeData,
        columns: columns,
    };
}

function createGridPanelMultiple(actionTypes) {
    return {
        xtype: 'container',
        layout: 'hbox',
        items: actionTypes.map((actionType, index) => {
            let margin = '10 10 0 0';
            if (index === actionTypes.length - 1) {
                margin = '10 0 0 0';
            }
            return Ext.apply(createGridPanel(actionType), { margin: margin, title: actionType });
        })
    };
}
function generateSampleData() {
    return {
        fields: ['location'],
        data: [
            { location: 'United States' },
            { location: 'United States Of America' },
        ]
    }
}

function whoisCustomTab(actionType, param) {
    let gridPanel =  Ext.create('ZirvaPortal.view.result.components.container.ResultGrid', createGridPanel(actionType, param));
    let outputComponent = Ext.create('Ext.container.Container', {
        flex: 2,
        scrollable: true,
        height: 300,
        style: {
            padding: '0 5px',
            backgroundColor: '#f0f0f0',
            fontFamily: 'monospace',
            color: '#213547',
            borderWidth: '1px',
            borderColor: '#4974af',
            borderStyle: 'solid',
            borderLeft: '0',
            fontSize: '12px',
        },
        masked: {
            xtype: 'loadmask',
            message: 'Loading...',
        },
    });

    gridPanel.store.load({
        callback: function(records, operation, success) {
            if (!success) {
                console.error('Store load operation failed:', operation.getError());
                return;
            }

            const whoisResponse = operation.getResponse().responseJson;
            const whoisData = whoisResponse.whois;

            if (!whoisData || !whoisData.output) {
                return;
            }

            const gridColumns = [
                {
                    text: 'Key',
                    dataIndex: 'key',
                    width: 120,
                    renderer: function(value, record, dataIndex, cell) {
                        cell.setStyle({ fontWeight: 'bold', color: '#213547', textTransform: 'capitalize' });
                        return value;
                    }
                },
                {
                    text: 'Value',
                    dataIndex: 'value',
                    flex: 1
                }
            ];

            const parsedData = [{ key: 'whois server', value: whoisData.whois_server }]
                .concat(Object.keys(whoisData.details)
                    .map(key =>  ({ key: key.replace(/_/g, ' '), value: whoisData.details[key] })));

            gridPanel.setStore(parsedData);
            gridPanel.setColumns(gridColumns);

            outputComponent.setHtml(`<pre>${whoisData.output}</pre>`);
            outputComponent.unmask();
        }
    });

    return {
        xtype: 'container',
        layout: 'hbox',
        items: [gridPanel, outputComponent]
    };
}