Ext.define('ZirvaPortal.helpers.TabSync', {

    singleton: true,
    alternateClassName: 'TabSync',

    detectType: function (entry) {
        const ipPattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const domainPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,6}(:[0-9]{1,5})?(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/;

        if (ipPattern.test(entry)) {
            return 'ip';
        }

        if (emailPattern.test(entry)) {
            return 'email';
        }

        if (domainPattern.test(entry)) {
            return 'domain';
        }
    },

    addTab: function (param) {
        const type = this.detectType(param);
        const tabPanel = Ext.getCmp('mainTabPanel');

        if (type === 'domain') {
            param = param.startsWith('http://') || param.startsWith('https://') ? param : 'http://' + param;
            let newTab = tabPanel.add({
                title: param,
                iconCls: 'x-fa fa-sitemap',
                items: [{
                    xtype: 'result',
                    bodyPadding: '10 150',
                    viewModel: {
                        data: {
                            param: param,
                            img_src: '/resources/img/loading.svg',
                        }
                    },
                }],
                closable: true,
            });
            tabPanel.setActiveItem(newTab);
            return;
        }

        if (type === 'email') {
            return Ext.Msg.alert('Error', 'Email search is not supported yet.');
        }

        if (type === 'ip') {
            return Ext.Msg.alert('Error', 'IP search is not supported yet.');
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