Ext.define('ZirvaPortal.view.result.domain.components.tabs.Ports', {
    extend: 'Ext.Container',
    xtype: 'tab-ports',
    layout: 'vbox',

    requires: [
        'Ext.layout.HBox',
        'ZirvaPortal.store.PortsStore',
        'ZirvaPortal.view.result.domain.components.container.ResultGrid',
    ],

    items: [{
        xtype: 'container',
        layout: {
            type: 'hbox',
        },
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
                flex: 1,
                ui: 'alt',
                allowBlank: false,
                required: true,
                listeners: {
                    painted: function(s, e, eOpts) {
                        //@todo: set value to current ip address
                    }
                }
            }, {
                xtype: 'component',
                html: 'Port:',
                style: {
                    color: 'white',
                    padding: '7px 0 0 0',
                    fontWeight: 'bold',
                },
            }, {
                xtype: 'selectfield',
                itemId: 'serviceField',
                flex: 1,
                autoCapitalize: false,
                placeholder: 'Service',
                style: {
                    cursor: 'pointer',
                },
                ui: 'alt',
                value: '0',
                store: [
                    { text: 'All Common Ports', value: '0', protocol: 'tcp' },
                    { text: '7 - Echo', value: '7', protocol: 'tcp' },
                    { text: '20 - FTP', value: '20', protocol: 'tcp' },
                    { text: '21 - FTP', value: '21', protocol: 'tcp' },
                    { text: '22 - SSH', value: '22', protocol: 'tcp' },
                    { text: '23 - Telnet', value: '23', protocol: 'tcp' },
                    { text: '25 - SMTP', value: '25', protocol: 'tcp' },
                    { text: '53 - DNS', value: '53', protocol: 'udp' },
                    { text: '69 - TFTP', value: '69', protocol: 'udp' },
                    { text: '80 - HTTP', value: '80', protocol: 'tcp' },
                    { text: '88 - Kerberos', value: '88', protocol: 'tcp' },
                    { text: '102 - ISO-TSAP', value: '102', protocol: 'tcp' },
                    { text: '110 - POP3', value: '110', protocol: 'tcp' },
                    { text: '135 - EPMAP', value: '135', protocol: 'tcp' },
                    { text: '137 - NetBIOS-NS', value: '137', protocol: 'udp' },
                    { text: '139 - NetBIOS-SSN', value: '139', protocol: 'tcp' },
                    { text: '143 - IMAP', value: '143', protocol: 'tcp' },
                    { text: '381 - HP OpenView', value: '381', protocol: 'tcp' },
                    { text: '383 - HP OpenView', value: '383', protocol: 'tcp' },
                    { text: '443 - HTTPS', value: '443', protocol: 'tcp' },
                    { text: '464 - Kerberos', value: '464', protocol: 'tcp' },
                    { text: '465 - SMTPS', value: '465', protocol: 'tcp' },
                    { text: '587 - SMTP', value: '587', protocol: 'tcp' },
                    { text: '593 - DCOM', value: '593', protocol: 'tcp' },
                    { text: '636 - LDAPS', value: '636', protocol: 'tcp' },
                    { text: '691 - MS Exchange', value: '691', protocol: 'tcp' },
                    { text: '902 - VMware', value: '902', protocol: 'tcp' },
                    { text: '989 - FTPS', value: '989', protocol: 'tcp' },
                    { text: '990 - FTPS', value: '990', protocol: 'tcp' },
                    { text: '993 - IMAPS', value: '993', protocol: 'tcp' },
                    { text: '995 - POP3S', value: '995', protocol: 'tcp' },
                    { text: '1025 - MS RPC', value: '1025', protocol: 'tcp' },
                    { text: '1194 - OpenVPN', value: '1194', protocol: 'udp' },
                    { text: '1337 - Waste', value: '1337', protocol: 'tcp' },
                    { text: '1589 - Cisco VQP', value: '1589', protocol: 'udp' },
                    { text: '1725 - Steam', value: '1725', protocol: 'udp' },
                    { text: '2082 - cPanel', value: '2082', protocol: 'tcp' },
                    { text: '2083 - cPanel RadSec', value: '2083', protocol: 'tcp' },
                    { text: '2086 - WHM', value: '2086', protocol: 'tcp' },
                    { text: '2087 - WHM SSL', value: '2087', protocol: 'tcp' },
                    { text: '2484 - Oracle DB', value: '2484', protocol: 'tcp' },
                    { text: '3074 - Xbox Live', value: '3074', protocol: 'udp' },
                    { text: '3306 - MySQL', value: '3306', protocol: 'tcp' },
                    { text: '4664 - Google Desktop', value: '4664', protocol: 'tcp' },
                    { text: '5432 - PostgreSQL', value: '5432', protocol: 'tcp' },
                    { text: '8222 - VMware', value: '8222', protocol: 'tcp' },
                    { text: '12345 - NetBus', value: '12345', protocol: 'tcp' },
                ],
                listeners: {
                    change:  function(f, v) {
                        this.up().down('#portField').setValue(v);
                        this.up().down('#protocolField').setValue(f.getStore().findRecord('value', v).get('protocol'));
                    }
                }
            }, {
                xtype: 'selectfield',
                itemId: 'protocolField',
                placeholder: 'Protocol',
                ui: 'alt',
                value: 'tcp',
                width: 82,
                store: [
                    { text: 'TCP', value: 'tcp' },
                    { text: 'UDP', value: 'udp' },
                ]
            }, {
                itemId: 'portField',
                xtype: 'spinnerfield',
                autoCapitalize: false,
                placeholder: '80',
                width: 85,
                minValue: 0,
                ui: 'alt',
                allowBlank: false,
                required: true,
            }, {
                xtype: 'component',
                html: 'Timeout(s):',
                style: {
                    color: 'white',
                    padding: '7px 0 0 0',
                    fontWeight: 'bold',
                },
            }, {
                xtype: 'spinnerfield',
                itemId: 'timeoutField',
                value: 3,
                width: 80,
                minValue: 1,
                maxValue: 5,
                ui: 'alt',
            }, {
            xtype: 'button',
            text: 'Check',
        }],
    }, {
        xtype: 'result-grid',
        flex: 1,
        style: {
            minHeight: '275px',
        },
        store: {
            type: 'PortsStore',
            sorters: [{
                property: 'port',
                direction: 'ASC'
            }],
        },
        columns: [
            {
                dataIndex: 'open',
                cell: {
                    encodeHtml: false
                },
                width: 75,
                renderer: function(value, record) {
                    if (record.data.open !== false) {
                        return '<i class="fa fa-check-circle" style="color:#4974af"></i> open';
                    }
                    return '<i class="fa fa-times-circle" style="color:gray"></i> closed';
                },
            },
            { text: 'Protocol', dataIndex: 'proto', width: 75, renderer: function(v) { return v.toUpperCase(); }},
            { text: 'Port', dataIndex: 'port', width: 80 },
            { text: 'Service', dataIndex: 'service', width: 150, renderer: function(v) { return v.toUpperCase(); }},
            { text: 'Message', dataIndex: 'message', flex: 1 },
        ],
    }],

    onRender: function() {
        let store = this.down('result-grid').getStore(),
            xhr = new XMLHttpRequest(),
            token = LoginController.getUserStoreToken();

        // @todo: get ip from the url
        xhr.open('GET', `${ZirvaPortal.config.Config.baseUrl}service/ports?ip=162.55.2.145&port=0`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.LOADING) {
                if (xhr.status === 200) {
                    let responseText = xhr.responseText,
                        parts = responseText.split('\n');

                    parts.forEach(function(part) {
                        if (part.trim().length > 0) {
                            let result = JSON.parse(part),
                                existing = store.findRecord('port', result.port);

                            if (!existing) {
                                store.add(result);
                            }
                        }
                    });
                }
            }
        };

        xhr.send();
    }
});