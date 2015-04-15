/**
 * Reactive options for orion
 */
Options = {
  _values: {},
  _deps: {},
  _listeners: {},
}

/**
 * Initialize a option variable.
 * You can set a unique string o a array of string
 */
Options.init = function(key, initialValue) {
  check(key, String);
  this._deps[key] = new Tracker.Dependency;
  this._values[key] = initialValue;
  this._listeners[key] = [];
}

/**
 * Method for setting options
 */
Options.set = function(key, value) {
  if (!_.has(this._deps, key)) throw 'Option "' + key + '" is not initalized';
  this._values[key] = value;
  this._deps[key].changed();
  _.each(this._listeners[key], function(func){
    func(value)
  });
}

/**
 * Push values to options
 */
Options.arrayPush = function(key, value) {
  if (!_.has(this._deps, key)) throw 'Option "' + key + '" is not initalized';
  if (!_.isArray(this._values[key])) throw 'Option "' + key + '" is not an array';
  this._values[key].push(value);
  this._deps[key].changed();
  _.each(this._listeners[key], function(func){
    func(value)
  });
}

/**
 * Adds listeners to a option. The difference between this and tracker is that tracker
 * waits till the app is idle to run the callback, this is instantly. I'm not saying
 * it's better, but sometimes tracker is not compatible.
 */
Options.listen = function(key, value) {
  check(key, String);
  check(value, Function);
  if (!_.has(this._deps, key)) throw 'Option "' + key + '" is not initalized';
  this._listeners[key].push(value);
}

/**
 * Returns the value of the definition.
 * If the definition doesn't exists it 
 * returns the defaultValue
 */
Options.get = function(key, defaultValue) {
  if (!_.has(this._deps, key)) throw 'Option "' + key + '" is not initalized';
  this._deps[key].depend();
  return this._values[key] || defaultValue;
};