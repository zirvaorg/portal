Ext.define('ZirvaPortal.view.result.domain.components.tabs.Whois', {
    extend: 'Ext.Container',
    xtype: 'tab-whois',

    requires: [
        'Ext.layout.HBox',
        'ZirvaPortal.store.WhoisStore',
        'ZirvaPortal.view.result.domain.components.container.ResultGrid'
    ],

    layout: 'hbox',

    items: [{
        xtype: 'result-grid',
        store: {
            type: 'whoisStore',
            listeners: {
                load: function(store, records, successful, operation) {
                    if (successful) {
                        const whoisResponse = operation.getResponse().responseJson;
                        const whoisData = whoisResponse.whois;

                        if (!whoisData || !whoisData.output) {
                            return;
                        }

                        const parsedData = [{ key: 'whois server', value: whoisData.whois_server }]
                            .concat(Object.keys(whoisData.details)
                                .map(key =>  ({ key: key.replace(/_/g, ' '), value: whoisData.details[key] }) ));
                        store.setData(parsedData);

                        // @todo: set whois output
                    }
                }
            }
        },
        columns: [{
                text: 'Key', dataIndex: 'key', flex: 1,
                renderer: function(value, record, dataIndex, cell) {
                    cell.setStyle({ fontWeight: 'bold', color: '#213547', textTransform: 'capitalize' });
                    return value;
                }
            },
            { text: 'Value', dataIndex: 'value', flex: 2 },
        ],
    }, {
        xtype: 'container',
        itemId: 'whoisOutput',
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
    }],

    onRender: function() {
        let param = this.up('result').getViewModel().get('param');
        let store = this.down('result-grid').getStore();
        store.getProxy().setUrl(`${ZirvaPortal.config.Config.baseUrl}/service/whois?domain=${param}`);
    }
});