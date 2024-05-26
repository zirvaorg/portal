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
                    items: [createMultipleGridPanels(['HTTP', 'PING', 'DNS'])]
                },
                {
                    title: 'WhoIs',
                    iconCls: 'x-fa fa-user-secret',
                    items: [createGridPanel('whois')]
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

function createGridPanel(actionType) {
    return {
        xtype: 'grid',
        flex: 1,
        height: '300px',
        scrollable: true,
        itemId: actionType,
        style: {
            borderWidth: '1px',
            borderColor: '#4974af',
            borderStyle: 'solid',
        },
        masked: {
            xtype: 'loadmask',
            message: 'Loading...',
        },
        striped: true,
        store: {
            fields: ['location', 'result', 'time', 'code', 'ip'],
            data: generateSampleData()
        },
        columns: [
            { text: 'location', dataIndex: 'location', width: 100 },
            { text: 'result', dataIndex: 'result', width: 100 },
            { text: 'time', dataIndex: 'time', width: 100 },
            { text: 'code', dataIndex: 'code', width: 100 },
            { text: 'ip', dataIndex: 'ip', width: 100 }
        ],

    };
}

function createMultipleGridPanels(actionTypes) {
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
    return [
        { location: 'Germany', result: 200, time: '0.4s', code: 301, ip: '127.0.0.1' },
        { location: 'Germany', result: 200, time: '0.5s', code: 301, ip: '127.0.0.1' },
        { location: 'Germany', result: 200, time: '0.6s', code: 301, ip: '127.0.0.1' },
        { location: 'Germany', result: 200, time: '0.7s', code: 301, ip: '127.0.0.1' },
        { location: 'Germany', result: 200, time: '0.8s', code: 301, ip: '127.0.0.1' },
        { location: 'Germany', result: 200, time: '0.9s', code: 301, ip: '127.0.0.1' },
    ];
}
