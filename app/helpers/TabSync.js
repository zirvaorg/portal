Ext.define('ZirvaPortal.helpers.TabSync', {
    singleton: true,
    alternateClassName: 'TabSync',

    addTab: function (title) {

        const urlPattern = /^([http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))$/;

        let tabPanel = Ext.getCmp('mainTabPanel');

        let newTab = tabPanel.add({
            title: title,
            iconCls: 'x-fa fa-sitemap',
            items: [{
                xtype: 'result',
                bodyPadding: '10 150',
                viewModel: {
                    data: {
                        title: title,
                        img_src: '/resources/img/placeholder.jpg',
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


        if (urlPattern.test(title)) {
            // Add http:// to the title if it doesn't already have a protocol
            let domain = title.startsWith('http://') || title.startsWith('https://') ? title : 'http://' + title + '/';

             // Add "www." if it's not already in the domain
            if (!domain.startsWith('www.')) {
                domain = domain.replace('http://', 'http://www.');
            }

            console.log("Valid URL ", domain)
            ZirvaPortal.service.SnapshotService.generateSnapshot(domain, function (url) {
                newTab.down('result').getViewModel().set('img_src', url);
            });
        } else {
            console.log("Invalid URL")
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