Package.describe({
  name: 'nicolaslopezj:options',
  summary: 'Set app options reactively',
  version: '1.0.0',
  git: 'https://github.com/nicolaslopezj/options'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use('meteor-platform');

  api.addFiles('options.js');
  api.addFiles('options_client.js', 'client');

  api.export('Options');
});

Package.onTest(function(api) {
  api.use('tinytest');
});
