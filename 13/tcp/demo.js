var b = new Buffer(4);
b.writeInt32LE(121234869,0);

console.log(b.length);
console.log(b);
