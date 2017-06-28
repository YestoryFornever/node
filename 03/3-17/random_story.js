var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';

function checkForRSSFile() {
	console.log(4);
	fs.exists(configFilename,function(exists){
		if(!exists)
			return next(new Error('Missging RSS File:'+configFilename));
		next(null,configFilename)
	});
}

function readRSSFile(configFilename) {
	console.log(3);
	fs.readFile(configFilename,function(err,feedList){
		feedList = feedList
					.toString()
					.replace(/^\s+|\s+$/g,'')
					.split("\n");
		var random = Math.floor(Math.random()*feedList.length);
		next(null,feedList[random]);
	});
}

function downloadRSSFeed(feedUrl) {
	console.log(2);
	request({uri:feedUrl},function(err,res,body){
		if(err)return next(err);
		if(res.statusCode != 200)
			return next(new Error('Abnormal response status code'))
		next(null,body);
	});
}

function parseRSSFeed(rss) {
	console.log(1);
	var handler = new htmlparser.RssHandler();
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(rss);

	if(!handler.dom.items.length)
		return next(new Error('No RSS items found'));
	var item = handler.dom.items.shift();
	console.log(item.title);
	console.log(item.link);
}

var tasks = [
	checkForRSSFile,
	readRSSFile,
	downloadRSSFeed,
	parseRSSFeed
];

function next(err,result) {
	if(err) throw err;
	var currentTask = tasks.shift();
	if(currentTask){
		currentTask(result);
	}
}

next();