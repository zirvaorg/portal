Ext.define('ZirvaPortal.view.result.domain.Result', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.result',

    requires: [
        'Ext.layout.Fit',
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'ZirvaPortal.view.result.domain.components.container.Container',
        'ZirvaPortal.view.result.domain.components.title.Title'
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
            xtype: 'container',
            layout: 'vbox',
            items: [{
                xtype: 'image',
                width: 177,
                height: '90%',
                alt: 'Image',
                style: 'border:1px solid #4974af;cursor:pointer;',
                bind: {
                    src: '{img_src}'
                },
                onRender: function() {
                    let img = this;
                    ZirvaPortal.service.SnapshotService.generateSnapshot(this.up('result').getViewModel().get('param'), function (url, status) {
                        img.setSrc(url);
                        img.setStyle('background-size:cover;');
                        img.up('result').getViewModel().set('img_src', url);
                        img.up('result').down('#img-alt').setHtml(status ? Ext.Date.format(new Date(status), 'm/d/Y H:i') : 'cannot get snapshot');
                    });
                },
                listeners: {
                    tap: function() {
                        var resultViewModel = this.up('result').getViewModel();
                        let win = new Ext.window.Window({
                            title: 'Snapshot: ' + resultViewModel.get('param'),
                            width: 800,
                            height: 568,
                            closable: true,
                            tools: [{
                                type: 'print',
                                tooltip: 'Download',
                                handler: function() {
                                    let downloadLink = document.createElement('a');
                                    downloadLink.href = resultViewModel.get('img_src');
                                    downloadLink.download = 'zirva-snapshot.png';
                                    document.body.appendChild(downloadLink);
                                    downloadLink.click();
                                    document.body.removeChild(downloadLink);
                                }
                            }],
                            maximizable: true,
                            items: [{
                                xtype: 'image',
                                width: '100%',
                                height: '100%',
                                style: 'background-size:contain;',
                                src: resultViewModel.get('img_src'),
                            }]
                        });

                        win.show();
                    }
                },
            },{
                xtype: 'component',
                itemId: 'img-alt',
                style: {
                    'text-align': 'center',
                    'font-size': '11px',
                },
                html: '(loading)',
            }]
        },{
            xtype: 'result-title'
        }]
    }, {
        flex: 1,
        layout: 'fit',
        xtype: 'dashboard',
        margin: '10 0 0 0',
        style: {
            minHeight: '342px',
        }
    }]
});