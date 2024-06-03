Ext.define('ZirvaPortal.view.result.domain.components.tabs.Subdomains', {
    extend: 'Ext.Container',
    xtype: 'tab-subdomains',

    requires: [
        'ZirvaPortal.store.SubdomainsStore',
        'ZirvaPortal.view.result.domain.components.container.ResultGrid'
    ],

    items: [{
        xtype: 'result-grid',
        store: {
            type: 'SubdomainsStore',
            sorters: [{
                property: 'timestamp',
                direction: 'DESC'
            }],
        },
        variableHeights: true,
        columns: [{
                width: 1,
                cell: {
                    encodeHtml: false
                },
                renderer: function(value, record, dataIndex, cell) {
                    if (record.data.ip != null) {
                        return '<i class="fa fa-check-circle" style="color:#4974af"></i>';
                    }
                    return '<i class="fa fa-times-circle" style="color:gray"></i>';
                },
                align: 'center',
            },
            { text: 'Domain', dataIndex: 'domain', flex: 1 },
            {
                text: 'IP',
                dataIndex: 'ip',
                flex: 1,
                cell: {
                    encodeHtml: false,
                    tpl: new Ext.XTemplate(
                        '<tpl for="ip">',
                        '{.}<br />',
                        '</tpl>'
                    )
                },
            },
            { text: 'Registrar', dataIndex: 'registrar', flex: 3 },
            { text: 'Timestamp', dataIndex: 'timestamp', flex: 1 },
        ],


    }],

    onRender: function() {
        let param = this.up('result').getViewModel().get('param');
        let store = this.down('result-grid').getStore();
        store.getProxy().setUrl(`${ZirvaPortal.config.Config.baseUrl}service/subdomain?domain=${param}`);
    }
});