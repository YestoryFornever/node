exports.testPony2 = (test)=>{
	if(false){
		test.ok(false,'This should not have passed.');
	}
	test.ok(true,'This should have passed.');
	test.done();
}
