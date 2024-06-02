Ext.define('ZirvaPortal.view.point.Point', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.point',

    requires: [
        'Ext.grid.Grid',
        'Ext.util.Format',
        'ZirvaPortal.store.PointStore'
    ],

    items: [{
        title: 'Point History',
        xtype: 'grid',
        extend: 'Ext.grid.Grid',
        height: '500px',
        scrollable: true,
        striped: true,
        style: {
            borderWidth: '1px',
            borderColor: '#4974af',
            borderStyle: 'solid',
        },
        store: {
            type: 'pointStore'
        },
        columns: [{
            text: 'ID',
            dataIndex: 'ID',
            width: 100
        }, {
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
    }],
    onRender: function() {
        this.callParent(arguments);
        this.down('grid').getStore().load();
    }
});