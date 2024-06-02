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
                    }
                },
            }],
            closable: true,
        });
        tabPanel.setActiveItem(newTab);
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