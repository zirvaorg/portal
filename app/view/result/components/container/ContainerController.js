Ext.define('ZirvaPortal.view.result.components.container.ContainerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.container',

    onButtonClick: function(button) {
        const cardContainer = button.up('dashboard').down('#cardContainer');
        cardContainer.getLayout().setActiveItem(button.actionType);
    }
});
