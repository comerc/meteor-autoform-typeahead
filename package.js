Package.describe({
  name: 'comerc:autoform-typeahead',
  summary: 'Custom "typeahead" input type for AutoForm',
  version: '1.0.5',
  git: 'https://github.com/comerc/meteor-autoform-typeahead.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:autoform@5.0.0');
  api.addFiles([
    'autoform-typeahead.html',
    'autoform-typeahead.js'
  ], 'client');
});
