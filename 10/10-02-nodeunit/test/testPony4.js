exports.testPony = (test)=>{
	test.expect(2);
	if(false){
		test.ok(false,'This should not have passed.');
	}
	test.ok(true,'This should have passed');
	test.done();
}
