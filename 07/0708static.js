var connect = require('connect');
// var createStatic = require('connect-static');
var serveStatic = require('serve-static');
 
// These are all defaults. If you leave any options out, this is what they 
// will be. 
/*var options = {
  dir: "public",
  aliases: [
    ['/', '/index.html'],
  ],
  ignoreFile: function(fullPath) {
    var basename = path.basename(fullPath);
    return /^\./.test(basename) || /~$/.test(basename);
  },
  followSymlinks: true,
  cacheControlHeader: "max-age=0, must-revalidate",
};*/
let option = {
	// index:false
};
connect()
.use(require('connect-logger')())
.use(serveStatic('public',option))
.listen(9999);
console.log(9999);

// localhost:9999/index.html
