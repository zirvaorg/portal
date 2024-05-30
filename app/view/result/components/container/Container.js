Ext.define('ZirvaPortal.view.result.components.container.Container', {
    extend: 'Ext.container.Container',
    xtype: 'dashboard',

    requires: [
        'Ext.grid.Grid',
        'Ext.tab.Panel'
    ],

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
                    items: [createGridPanelMultiple(['HTTP', 'PING', 'DNS'])]
                },
                {
                    title: 'WhoIs',
                    iconCls: 'x-fa fa-user-secret',
                    items: [whoisCustomTab('whois', 'google.com')]
                },
                {
                    title: 'Subdomains',
                    iconCls: 'x-fa fa-sitemap',
                    items: [createGridPanel('subdomains')]
                },
                {
                    title: 'DNS History',
                    iconCls: 'x-fa fa-history',
                    items: [createGridPanel('DNS History')]
                },
                {
                    title: 'MX Records',
                    iconCls: 'x-fa fa-envelope',
                    items: [createGridPanel('MX Records')]
                }
            ]
        }
    ]
});

function createGridPanel(actionType, domain) {
    let storeData = {};
    let columns = [];

    switch (actionType) {
        case 'whois':
            storeData = Ext.create('ZirvaPortal.store.WhoisStore');
            if (domain) {
                console.log("Domain: ", domain);
                storeData.getProxy().setUrl( ZirvaPortal.config.Config.baseUrl +`/service/whois?domain=${domain}`);
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
            let margin = '0 4 0 0';
            if (index === actionTypes.length - 1) {
                margin = '0 0 0 0';
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

function whoisCustomTab(actionType, domain) {
    let gridPanel = createGridPanel(actionType, domain);

    let outputComponent = {
        flex: 3,
        xtype: 'container',
        scrollable: true,
        style: {
            padding: '0 5px',
            backgroundColor: '#f0f0f0',
            fontFamily: 'monospace',
            color: '#213547',
            borderWidth: '1px',
            borderColor: '#4974af',
            borderStyle: 'solid',
            borderLeft: '0',
        },
        html: '<pre>Loading...</pre>'
    };


    gridPanel.store.load({
        callback: function(records, operation, success) {
            function createGridColumns() {
                return [
                  { text: 'Key', dataIndex: 'key', width: 95, 
                  renderer: function(value, record, dataIndex, cell) {
                        cell.setStyle({ fontWeight: 'bold', color: '#213547' });
                        return value;
                    } 
                },
                  { text: 'Value', dataIndex: 'value', flex: 1, 
                  renderer: function(value, record, dataIndex, cell) {
                    return value;
                        } 
                    },
                ];
              }

            if (success) {
                try {
                    const whoisResponse = operation.getResponse().responseJson;
                    const whoisData = whoisResponse.whois;

                    if (whoisData && whoisData.output) {
                        outputComponent.html = `<pre>${whoisData.output}</pre>`;

                        const gridColumns = createGridColumns();
                        const newData = [{ key: 'whois server', value: whoisData.whois_server }]
                            .concat(Object.keys(whoisData.details)
                                .map(key =>  ({ key: key.replace(/_/g, ' '), value: whoisData.details[key] })));
                      

                        gridPanel.columns = gridColumns;
                        gridPanel.store.setData(newData);

                    } 
                } catch (e) {
                    console.error('Error processing response:', e);
                }
            } else {
                console.error('Store load operation failed:', operation.getError());
            }
        }
    });

    return {
        xtype: 'container',
        layout: 'hbox',
        height: 300,
        items: [gridPanel, outputComponent]
    };
}