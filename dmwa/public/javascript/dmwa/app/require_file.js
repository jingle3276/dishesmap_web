// this file is need for browser to load javascript resources in dev and prod modes
// it is also the input to closurebuilder to build the combined javascript file for prod.
goog.provide('wz.dmwa.require_file');
goog.require('wz.dmwa.lib.templates.index'); //global compileTemplates
goog.require('wz.dmwa.core.templates.index');
goog.require('wz.dmwa.app.templates.index');
goog.require('wz.dmwa.app.routers.AppRouter'); //load all dependency files
