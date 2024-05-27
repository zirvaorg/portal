Ext.define('ZirvaPortal.view.result.Result', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.result',

    requires: [
        'Ext.layout.VBox',
        'ZirvaPortal.view.result.components.container.Container'
    ],

    layout: {
        type: 'vbox'
    },

    defaults: {
        type: 'container',
        flex: 1,
    },

    items: [{
        flex: 1,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'image',
            width: 177,
            alt: 'Image',
            style: 'border:1px solid #4974af;background-size:cover;',
            bind: {
                src: '{img_src}'
            },
        }, {
            xtype: 'result-title',
            bind: {
                viewModel: {
                    data: {
                        title: '{title}',
                        scan_date: '{scan_date}',
                        scan_date_human_readable: '{scan_date_human_readable}',
                    }
                }
            }

        }]
    },
        {
            flex: 1,
            layout: 'fit',
            xtype: 'dashboard',
            margin: '10 0 0 0',
            style: {
                fontSize: '14px',
                minHeight: '400px',
            },
        }]

});