Ext.define('ZirvaPortal.view.result.domain.components.tabs.Ports', {
    extend: 'Ext.Container',
    xtype: 'tab-ports',
    layout: 'vbox',

    requires: [
        'Ext.layout.HBox',
        'ZirvaPortal.view.result.domain.components.container.ResultGrid'
    ],

    items: [{
        xtype: 'container',
        layout: {
            type: 'hbox',
        },
        flex: 1,
        width: '100%',
        style: {
            background: '#4974af',
            padding: '0 0 5px 0',
        },

        defaults: {
            margin: '0 10 0 0',
        },

        items: [
            {
                xtype: 'component',
                html: 'IP:',
                style: {
                    color: 'white',
                    padding: '7px 0 0 10px',
                    fontWeight: 'bold',
                },
            }, {
                xtype: 'textfield',
                autoCapitalize: false,
                placeholder: 'IP',
                value: '123.123.123.123',
                width: 200,
                ui: 'alt',
                allowBlank: false,
                required: true,
            },
            {
                xtype: 'component',
                html: 'Port:',
                style: {
                    color: 'white',
                    padding: '7px 0 0 0',
                    fontWeight: 'bold',
                },
            },
            {
                itemId: 'portField',
                xtype: 'spinnerfield',
                autoCapitalize: false,
                placeholder: '80',
                width: 80,
                minValue: 0,
                ui: 'alt',
                allowBlank: false,
                required: true,
            },
            {
                xtype: 'selectfield',
                itemId: 'serviceField',
                autoCapitalize: false,
                placeholder: 'Service',
                style: {
                    cursor: 'pointer',
                },
                width: 140,
                ui: 'alt',
                value: '21',
                store: [
                    { text: '21 - FTP', value: '21' },
                    { text: '22 - SSH', value: '22' },
                ],
                listeners: {
                    change:  function(f, v) {
                        this.up().down('#portField').setValue(v);
                    }
                }
            },{
            xtype: 'button',
            text: 'Check',
            width: 100,
        }],
    }, {
        xtype: 'component',
        html: 'No data found',
    }]
});