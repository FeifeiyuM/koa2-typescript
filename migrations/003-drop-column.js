exports.up = function(next) {
  this.dropColumn('test_table', 'age', next)
}
exports.down = function(next) {
	this.addColumn('test_table', {age: {type: 'integer', require: true}})
}