Ext.define('ZirvaPortal.view.result.components.tabs.Health', {
    extend: 'Ext.Container',
    layout: 'hbox',
    xtype: 'tab-health',

    requires: [
        'Ext.layout.HBox',
        'ZirvaPortal.view.result.components.container.ResultGrid'
    ],

    items: [{
        title: 'HTTP',
        xtype: 'result-grid',
        store: [{ location: 'USA' }, { location: 'UK' }, { location: 'Canada' }],
        columns:  [{ text: 'Location', dataIndex: 'location', flex: 1 }],
        margin: '10 10 0 0',
    },
    {
        title: 'HTTPS',
        xtype: 'result-grid',
        store: [{ location: 'USA' }, { location: 'UK' }, { location: 'Canada' }],
        columns:  [{ text: 'Location', dataIndex: 'location', flex: 1 }],
        margin: '10 10 0 0',
    },
    {
        title: 'HTTPS',
        xtype: 'result-grid',
        store: [{ location: 'USA' }, { location: 'UK' }, { location: 'Canada' }],
        columns:  [{ text: 'Location', dataIndex: 'location', flex: 1 }],
        margin: '10 0 0 0',
    }]
});