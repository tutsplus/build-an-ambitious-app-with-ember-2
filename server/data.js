var data = {};
var id = 1;

module.exports = function (type, options = {}) {
  var hasMany = options.hasMany;

  data[type] = [];

  const all = () => data[type];
  const get = id => data[type].filter(item => item.id === parseInt(id, 10))[0];

  const insert = (obj, par) => {
    obj.id = id++;
    if (hasMany) obj[hasMany] = [];
    if (par) par[type].push(obj.id);
    data[type].push(obj);
    return obj;
  };

  const update = (id, attrs) => Object.assign(get(id), attrs);

  const remove = id =>
    data[type] = data[type].filter(item => item.id !== parseInt(id, 10));

  const res = item => {
    var obj = {
      type,
      id: item.id,
      attributes: item,
      relationships: {}
    };

    if (hasMany) {
      obj.relationships[hasMany + 's'] = {
        data: item[hasMany].map(id => ({ id, type: hasMany }))
      };
    }

    return obj;
  };

  return {
    get,
    all,
    insert,
    update,
    remove,
    res
  };
};
