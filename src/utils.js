/**
 * Checks if an item is present in the given array
 * @param  {Array}   array
 * @param  {Object}  item
 * @return {Boolean}
 */
export function includes(array, item) {
  return array.indexOf(item) >= 0;
}

/**
 * Returns a negated version of a function
 * @param  {Function} f Function to be negated
 * @return {Function}   Negated function
 */
export function negate(f) {
  return function(){
    return !f.apply(this, arguments);
  }
}

/**
 * Filter an object entries using the predicate
 * {predicate} and the keys {keys} as arguments
 * @param  {Object} obj
 * @param  {Array} keys
 * @param  {Function} predicate
 * @return {Object}
 */
export function filterObject(obj, keys, predicate) {
  let result = {};
  let ks = Object.keys(obj);

  for (let i = 0, l = ks.length; i < l; i++) {
    let key = ks[i];
    let value = obj[key];
    if(predicate(keys, key)) result[key] = value;
  };
  return result;
}

/**
 * Returns the object {obj} only with the
 * keys {keys}
 * @param  {Object} obj  Original object
 * @param  {Array} keys  An array of keys to be picked
 * @return {Object}      Result object
 */
export function pick(obj, keys) {
  return filterObject(obj, keys, includes);
}

/**
 * Returns the object {obj} without the
 * keys {keys}
 * @param  {Object} obj  Original object
 * @param  {Array} keys  An array of keys to be removed
 * @return {Object}      Result object
 */
export function without(obj, keys) {
  return filterObject(obj, keys, negate(includes));
}

/**
 * Check if an object is a plain object. In other words
 * if it's an instance of Object.
 * @param  {Any}  obj    Any object to be checked
 * @return {Boolean}
 */
export function isPlainObject(obj){
  if (typeof obj == 'object' && obj !== null) {
    if (typeof Object.getPrototypeOf == 'function') {
      var proto = Object.getPrototypeOf(obj);
      return proto === Object.prototype || proto === null;
    }
    return Object.prototype.toString.call(obj) == '[object Object]';
  }
  return false;
}

/**
 * It replace all the {type:'function', name: 'nameOffunction'}
 * ocurrences in a give object by the functions stored
 * in the {context} with the name {name}
 * @param  {Object} o         The original object to be patched
 * @param  {Object} context  A dictionary with name:function
 * @return {Object}           A patched version of the object
 */
export function bindFunctions(o, context) {
  var out, v, key;
  out = Array.isArray(o) ? [] : {};
  for (key in o) {
    v = o[key];
    if(v == null) {
      continue;
    } else if(typeof v === 'object' && v !== null && v.type !== 'function') {
      out[key] = bindFunctions(v, context);
    } else if(v.type === 'function'){
      out[key] = context[v.name];
    } else {
      out[key] = v;
    }
  }
  return out;
}

/**
 * Allow to use either a value or a function to
 * @param  {[type]} v        Either a getter or a function name
 * @param  {String} _default A default string used as getter
 * @return {Function}        Returns a function to use as getter
 */
export function getValueFunction(v, _default) {
  if(typeof v === 'function') return v;
  return (d) => { return typeof d[v] !== 'undefined' ? d[v] : d[_default]; }
}

/**
 * Get properties using a prefix
 * @param  {String} prefix
 * @return {[type]} Return an object with wanted keys
 * DEPRECATED: This was created only for margins and
 * since we changed the api we don't need this anymore.
 */
export function propsByPrefix(prefix, props) {
  console.warn('Set margin with prefixes is deprecated use an object instead');
  prefix = prefix + '-';
  return Object.keys(props).reduce((memo, prop) => {
    if (prop.substr(0, prefix.length) === prefix) memo[prop.replace(prefix, '')] = props[prop];
    return memo;
  }, {});
}

export function isCallable(value) {
  return value && typeof value === 'function';
}