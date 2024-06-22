Ext.define('ZirvaPortal.view.result.domain.components.tabs.Ports', {
    extend: 'Ext.Container',
    xtype: 'tab-ports',
    layout: 'vbox',

    requires: [
        'Ext.layout.HBox',
        'Ext.Progress',
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
                flex: 1,
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
                maxValue: 3,
                ui: 'alt',
            }, {
                xtype: 'component',
                html: 'Port:',
                style: {
                    color: 'white',
                    padding: '7px 0 0 0',
                    fontWeight: 'bold',
                },
            }, {
                itemId: 'portField',
                xtype: 'spinnerfield',
                autoCapitalize: false,
                placeholder: '80',
                width: 80,
                minValue: 0,
                ui: 'alt',
                allowBlank: false,
                required: true,
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
                    { text: 'All Common', value: '0' },
                    { text: '21 - FTP', value: '21' },
                    { text: '22 - SSH', value: '22' },
                ],
                listeners: {
                    change:  function(f, v) {
                        this.up().down('#portField').setValue(v);
                    }
                }
            }, {
            xtype: 'button',
            text: 'Check',
        }],
    }, {
        xtype: 'progress',
        itemId: 'progressBar',
        flex: 1,
        hidden: true,
        text: 'checking...',
    }, {
        xtype: 'container',
        itemId: 'portOutput',
        scrollable: true,
        height: 250,
        style: {
            padding: '0 5px',
            backgroundColor: '#f0f0f0',
            fontFamily: 'monospace',
            color: '#213547',
            borderWidth: '1px',
            borderColor: '#4974af',
            borderStyle: 'solid',
            fontSize: '14px',
        },
    }],

    onRender: function() {
        // @todo: refactor all this to a listener

        //let param = this.up('result').getViewModel().get('param');
        let portContainer = this.down('#portOutput');
        portContainer.setHtml('');

        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${ZirvaPortal.config.Config.baseUrl}service/ports?ip=162.55.2.145`, true);

        let progressBar = this.down('#progressBar');
        progressBar.show();

        xhr.onprogress = function() {
            let progressIncrement = Math.random() * 0.2 + 0.4;
            let currentProgress = progressBar.getValue();
            let newProgress = currentProgress + progressIncrement;
            if (newProgress > 1) newProgress = 1;
            progressBar.setValue(newProgress);
        };

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                progressBar.setValue(1);
                progressBar.setText('done');
                setTimeout(() => {
                    progressBar.hide();
                }, 500);
            }

            if (xhr.readyState === XMLHttpRequest.LOADING) {
                if (xhr.status === 200) {
                    let responseText = xhr.responseText;
                    let parts = responseText.split('\n');
                    parts.forEach(function(part) {
                        if (part.trim().length > 0) {
                            let result = JSON.parse(part);
                            let existing = portContainer.getHtml();

                            let serviceAndPortLength = `${result.service} ${result.port}`.length;
                            let fixedLength = 25;
                            let numberOfDots = fixedLength - serviceAndPortLength;

                            if (result.open) {
                                result.message = `<span style="color:green">${result.message}</span>`;
                            } else {
                                result.message = `<span style="color:red">${result.message}</span>`;
                            }

                            let newContent = `${result.port} - ${result.service} ${'.'.repeat(numberOfDots)} ${result.message}`;
                            portContainer.setHtml(newContent + '<br>' + existing);
                        }
                    });
                } else {
                    portContainer.setHtml('Error: ' + xhr.status);
                }
            }
        };

        xhr.onerror = function() {
            portContainer.setHtml('Error: Unable to perform the request.');
        };

        xhr.send();
    }
});