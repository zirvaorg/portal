Ext.define('ZirvaPortal.view.point.Point', {
   extend: 'Ext.panel.Panel',
    alias: 'widget.point',

    items: [{
        title: 'Point History',
        xtype: 'grid',
        extend: 'Ext.grid.Grid',
        height: 400,
        store: {
            fields: ['date', 'action', 'points'],
            data: [{
                date: '1/1/2019 10:00',
                action: 'register promotion',
                points: 100
            },
            {
                date: '1/1/2019 10:00',
                action: 'register promotion',
                points: -100
            },
            {
                date: '1/1/2019 10:00',
                action: 'register promotion',
                points: 11
            },
            {
                date: '1/1/2019 10:00',
                action: 'register promotion',
                points: -3
            }]
        },
        columns: [{
            text: 'Date',
            dataIndex: 'date',
            flex: 1
        }, {
            text: 'Action',
            dataIndex: 'action',
            flex: 1
        }, {
            text: 'Points',
            dataIndex: 'points',
            flex: 1,
            renderer: function(value) {
                return `<span style="color:${value > 0 ? 'green' : 'red'}">${value}</span>`
            },

            cell: {
                encodeHtml: false
            }
        }]
    }],

});