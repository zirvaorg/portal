Ext.define('ZirvaPortal.view.main.components.popups.TermsAndConditions', {
    extend: 'Ext.window.Window',
    alias: 'terms-and-conditions',

    title: 'Terms & Conditions',
    width: 400,
    height: 400,
    layout: 'fit',
    closable: true,
    items: {
        xtype: 'panel',
        html: 'Terms & Conditions'
    }
})