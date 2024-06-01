Ext.define('ZirvaPortal.view.result.components.title.Title', {
    extend: 'Ext.container.Container',
    alias: 'widget.result-title',

    flex: 1,
    style: 'background-color: #f3f4f6;color:#383838;border:1px solid #4974af;',
    margin: '0 0 0 10',

    items: [
        {
            xtype: 'panel',
            bind: {
                title: '{param}'
            },

            iconCls: 'x-fa fa-sitemap',
            tools: [
                {
                    type: 'print',
                    tooltip: 'Print',
                }]
        },
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                pack: 'center'
            },

            padding: '10 10 10 10',
            minHeight: 80,

            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 10 0',
                    items: [
                        {
                            xtype: 'component',
                            html: '<b>IP Address:</b>',
                            width: 120
                        },
                        {
                            xtype: 'component',
                            bind: {
                                html: '{ipAddress}'
                            },
                            flex: 1
                        },
                        {
                            xtype: 'component',
                            html: '<b>Organization:</b>',
                            width: 120,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'component',
                            bind: {
                                html: '{organization}'
                            },
                            flex: 1
                        },
                        {
                            xtype: 'component',
                            html: '<b>Country:</b>',
                            width: 120,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'component',
                            bind: {
                                html: '{country}'
                            },
                            flex: 1
                        },
                        {
                            xtype: 'component',
                            html: '<b>HTTP:</b>',
                            width: 80,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'component',
                            bind: {
                                html: '{http}',
                            },
                            width: 50
                        },
                        {
                            xtype: 'component',
                            html: '<b>TCP:</b>',
                            width: 80,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'component',
                            bind: {
                                html: '{tcp}'
                            },
                            width: 50
                        },
                    ],
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'component',
                            html: '<b>Hostname:</b>',
                            width: 120
                        },
                        {
                            xtype: 'component',
                            bind: {
                                html: '{hostname}'
                            },
                            flex: 1
                        },
                        {
                            xtype: 'component',
                            html: '<b>ISP:</b>',
                            width: 120,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'component',
                            bind: {
                                html: '{isp}'
                            },
                            flex: 1
                        },
                        {
                            xtype: 'component',
                            html: '<b>IP Range:</b>',
                            width: 120,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'component',
                            bind: {
                                html: '{ipRange}'
                            },
                            flex: 1
                        },
                        {
                            xtype: 'component',
                            html: '<b>HTTPS:</b>',
                            width: 80,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'component',
                            bind: {
                                html: '{https}'
                            },
                            width: 50
                        },
                        {
                            xtype: 'component',
                            html: '<b>DNS:</b>',
                            width: 80,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'component',
                            bind: {
                                html: '{dns}'
                            },
                            width: 50
                        },
                    ],
                }
            ],
        }
    ]
});
