
export function includes(array, item) {
  return array.indexOf(item) >= 0;
}

export function negate(f) {
  return function(){
    return !f.apply(this, arguments);
  }
}

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

export function pick(obj, keys) {
  return filterObject(obj, keys, includes);
}

export function without(obj, keys) {
  return filterObject(obj, keys, negate(includes));
}