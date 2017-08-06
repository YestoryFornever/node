var assert = require('assert');
var Todo = require('./todo');
var todo = new Todo();
var testsCompleted = 0;

function deleteTest(){
	todo.add('Delete Me');
	assert.equal(todo.getCount(),1,'1个项目被删除');
	todo.deleteAll();
	assert.equal(todo.getCount(),0,'没有项目存在');
	testsCompleted++;
}

function addTest(){
	todo.deleteAll();
	todo.add('Added');
	assert.notEqual(todo.getCount(),0,'1个项目应该存在');
	testsCompleted++;
}

function doAsyncTest(cb){
	todo.doAsync((value)=>{
		assert.ok(value,'true');
		testsCompleted++;
		cb();
	});
}

function throwsTest(cb){
	assert.throws(todo.add, /requires/);
	testsCompleted++
}

deleteTest();
addTest();
throwsTest(()=>{
	console.log('Completed ' + testsCompleted + 'tests');
});
