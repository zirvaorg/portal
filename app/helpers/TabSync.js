Ext.define('ZirvaPortal.helpers.TabSync', {
    singleton: true,
    alternateClassName: 'TabSync',

    addTab: function (title) {
        const urlPattern = /^([http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))$/;

        let domain = title;
        if (urlPattern.test(title)) {
            domain = title.startsWith('http://') || title.startsWith('https://') ? title : 'http://' + title;
            console.log("Valid URL ", domain);
        } else {
            console.log("Invalid URL");
        }

        let tabPanel = Ext.getCmp('mainTabPanel');

        let newTab = tabPanel.add({
            title: domain,
            iconCls: 'x-fa fa-sitemap',
            items: [{
                xtype: 'result',
                bodyPadding: '10 150',
                viewModel: {
                    data: {
                        param: domain,
                        img_src: '/resources/img/loading.svg',
                        ipAddress: '127.0.0.1',
                        organization: 'natro',
                        country: 'turkey',
                        http: 'OK',
                        tcp: 'OK',
                        hostname: '127.0.0.1',
                        isp: 'natro hostinger',
                        ipRange: '1127.0.0.1 - 127.0.0.0',
                        https: 'OK',
                        dns: 'OK'
                    }
                },
            }],
            closable: true,
        });
        tabPanel.setActiveItem(newTab);

        if (urlPattern.test(domain)) {
            ZirvaPortal.service.SnapshotService.generateSnapshot(domain, function (url, status) {
                newTab.down('result').getViewModel().set('img_src', url);
                newTab.down('result').down('image').setStyle('background-size:cover;');
                newTab.down('result').down('#img-alt').setHtml(status ? Ext.Date.format(new Date(status), 'm/d/Y H:i') : 'cannot get snapshot');
            });
        } 
    },

    addCustomTab: function (id, title, pageXType, iconCls) {
        let tabPanel = Ext.getCmp('mainTabPanel');
        let tab = tabPanel.getComponent(id);

        if (tab) {
            tabPanel.setActiveItem(tab);
            return;
        }

        let newTab = tabPanel.add({
            id: id,
            title: title,
            iconCls: iconCls,
            items: [{
                xtype: pageXType,
                bodyPadding: '10 150',
            }],
            closable: true,
        });
        tabPanel.setActiveItem(newTab);
    },

    removeTab: function (tabPanel, tab) {
        tabPanel.remove(tab);
    },

    removeAllTabs: function (tabPanel) {
        tabPanel.removeAll();
    },

});