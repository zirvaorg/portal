Ext.define('ZirvaPortal.view.point.Point', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.point',
    requires: [
        'ZirvaPortal.store.PointStore'
    ],
    items: [{
        title: 'Point History',
        xtype: 'grid',
        extend: 'Ext.grid.Grid',
        height: 400,
        store: {
            type: 'pointstore'
        },
        columns: [{
            text: 'Date',
            dataIndex: 'CreatedAt',
            flex: 1,
            renderer: Ext.util.Format.dateRenderer('m/d/Y H:i')
        }, {
            text: 'Action',
            dataIndex: 'Request',
            flex: 1
        }, {
            text: 'Points',
            dataIndex: 'Points',
            flex: 1,
            renderer: function(value) {
                return `<span style="color:${value > 0 ? 'green' : 'red'}">${value}</span>`
            },
            cell: {
                encodeHtml: false
            }
        }]
    }]
});