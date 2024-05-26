Ext.define('ZirvaPortal.view.main.components.stats.StatsBar', {
    extend: 'Ext.Container',
    xtype: 'stats-bar',

    requires: [
        'Ext.ux.gauge.Gauge',
    ],

    viewModel: {
        data: {
            liveUpdate: true,
            value: 85
        }
    },

    layout: {
        type: 'hbox',
    },

    draggable: true,

    items: [{
        xtype: 'panel',
        title: 'Stats',
        shadow: true,
        tools: [{
            type: 'refresh',
            handler: function() {
                this.up('stats-bar').getViewModel().set('value', Ext.Number.randomInt(0, 100));
            }
        }],
        items: [{
            xtype: 'gauge',
            bind: '{value}',
        }]
    }, {
        xtype: 'panel',
        title: 'Stats',
        shadow: true,
        tools: [{
            type: 'refresh',
            handler: function() {
                this.up('stats-bar').getViewModel().set('value', Ext.Number.randomInt(0, 100));
            }
        }],
        items: [{
            xtype: 'gauge',
            bind: '{value}',
        }]
    }],

});