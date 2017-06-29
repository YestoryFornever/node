var qs = require('querystring');

exports.sendHtml = (res,html)=>{
	res.setHeader('Content-Type','text/html');
	res.setHeader('Content-Length',Buffer.byteLength(html));
	res.end(html);
};

exports.parseReceviedData = (req,cb)=>{
	var body = '';
	req.setEncoding('utf8');
	req.on('data',(chunk)=>{
		body+=chunk;
	});
	req.on('end',()=>{
		var data = qs.parse(body);
		cb(data);
	});
};

exports.actionForm = (id,path,label)=>{
	var html = `<form method="POST" action="${path}">
		<input type="hidden" name="id" value="${id}"/>
		<input type="submit" value="${label}"/>
	`;
	return html;
};

exports.add = (db,req,res)=>{
	exports.parseReceviedData(req,(work)=>{
		db.query("DELETE FROM work WHERE id=?"),
		[work.id],
		(err)=>{
			if(err) throw err;
			exports.show(db,res);
		}
	});
};

exports.archive = (db,req,res)=>{
	exports.parseReceviedData(req,(word)=>{
		db.query("UPDATE work SET archived=1 WHERE id=?"),
		[work.id],
		(err)=>{
			if(err) throw err;
			exports.show(db,res);
		}
	});
};

exports.show = (db,res,showArchived)=>{
	var query = `SELECT * FROM work 
		WHERE archived=?
		ORDER BY date DESC`;
	var archiveValue = (showArchived)?1:0;
	db.query(query,[archivedValue],(err,rows)=>{
		if(err) throw err;
		html = (showArchived)?'':'<a href="/archived">Archived Work</a><br/>';
		html += exports.workHitlistHtml();
		html += exports.workFormHtml();
		exports.sendHtml(res,html);
	});
};

exports.showArchived = (db,res)=>{
	exports.show(db,res,true);
};

exports.workHitlistHtml = (rows)=>{
	var html = '<table>';
	for(var i in rows){
		html += '<tr>';
		html += '<td>' + rows[i].date + '</td>';
	}
};