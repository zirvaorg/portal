/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'ZirvaPortal.Application',

    name: 'ZirvaPortal',

    requires: [
        // This will automatically load all classes in the ZirvaPortal namespace
        // so that application classes do not need to require each other.
        'ZirvaPortal.*'
    ],

    // The name of the initial view to create.
    mainView: 'ZirvaPortal.view.main.Main'
});
