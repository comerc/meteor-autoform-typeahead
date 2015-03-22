Package.describe({
  name: 'comerc:autoform-typeahead',
  summary: 'Custom "typeahead" input type for AutoForm',
  version: '1.0.2',
  git: 'https://github.com/comerc/meteor-autoform-typeahead.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'templating',
    'blaze',
    'aldeed:autoform',
    'comerc:bs-typeahead'
  ]);

  api.addFiles([
    'autoform-typeahead.html',
    'autoform-typeahead.js',
  ], 'client');
});
