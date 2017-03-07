exports.up = function(next) {
  this.addColumn('test_table', {age: {type: 'number', require: true}}, next)
}