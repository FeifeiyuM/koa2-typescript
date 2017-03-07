exports.up = function(next){
  this.createTable('test_table', {
    id: { type: 'serial', key: true },
    name: { type: 'text', require: true}
  }, next)
  next();
};

// exports.up = function(next) {
//   this.addColumn('test_table', {age: {type: 'number', require: true}}, next)
// }

exports.down = function(next){
  next();
};