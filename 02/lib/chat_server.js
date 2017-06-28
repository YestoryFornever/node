let socketio = require('socket.io'),
	io,
	guestNumber = 1,
	nickNames = {},
	namesUsed = [],
	currentRoom = {};

exports.listen = (server)=>{
	// 启动socket.IO服务器，允许它搭载在已有的HTTP服务器上
	io = socketio.listen(server);
	io.set('log level', 1);
	// 定义用户连接的处理逻辑
	io.sockets.on('connection',(socket)=>{
		// 当用户连接时赋予其一个用户名
    	guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
		// 当用户连接上来时把它先放入大厅
		joinRoom(socket, '大厅');
		// 处理用户的消息
		handleMessageBroadcasting(socket, nickNames);
		// 更换昵称
		handleNameChangeAttempts(socket, nickNames, namesUsed);
		// 聊天室的创建和变更
		handleRoomJoining(socket);

		// 用户发出请求时，向其提供已经被占用的聊天室列表
		socket.on('rooms',()=>{
			socket.emit('rooms', io.sockets.manager.rooms);
		});

		// 用户断开连接时的清除逻辑
		handleClientDisconnection(socket, nickNames, namesUsed);
	});
}

let assignGuestName = (socket, guestNumber, nickNames, namesUsed)=>{
	let name = 'Guest' + guestNumber;
	nickNames[socket.id] = name;
	socket.emit('nameResult',{
		success:true,
		name:name
	});
	namesUsed.push(name);
	return guestNumber + 1;
}

let joinRoom = (socket, room)=>{
	socket.join(room);
	currentRoom[socket.id] = room;
	socket.emit('joinResult',{room:room});
	socket.broadcast.to(room).emit('message',{
		text:nickNames[socket.id] + '已加入 ' + room + '.'
	});
	let usersInRoom = io.sockets.clients(room);
	if(usersInRoom.length > 1){
		let usersInRoomSummary = '当前聊天室成员 ' + room + ':';
		for(let index in usersInRoom){
			let userSocketId = usersInRoom[index].id;
			if(userSocketId != socket.id){
				if(index>0){
					usersInRoomSummary += '，';
				}
				usersInRoomSummary += nickNames[userSocketId];
			}
		}
		usersInRoomSummary += '。';
		socket.emit('message',{text:usersInRoomSummary})
	}
}

let handleNameChangeAttempts = (socket, nickNames, namesUsed)=>{
	socket.on('nameAttempt',(name)=>{
		if(name.indexOf('Guest')==0){
			socket.emit('nameResult',{
				success:false,
				message:'名称不能以 "Guest"开头.'
			});
		}else{
			if(namesUsed.indexOf(name)==-1){
				let previousName = nickNames[socket.id];
				let previousNameIndex = namesUsed.indexOf(previousName);
				namesUsed.push(name);
				nickNames[socket.id] = name;
				delete namesUsed[previousNameIndex];
				socket.emit('nameResult',{
					success:true,
					name:name
				});
				socket.broadcast.to(currentRoom[socket.id]).emit('message',{
					text:previousName + '更名为 ' + name + '.'
				});
			}else{
				socket.emit('nameResult',{
					success:false,
					message:'该昵称已被注册.'
				});
			}
		}
	});
}

let handleMessageBroadcasting = (socket) => {
	socket.on('message',(message) => {
		socket.broadcast.to(message.room).emit('message',{
			text:nickNames[socket.id] + ':' + message.text
		});
	});
}

let handleRoomJoining = (socket) => {
	socket.on('join',(room)=>{
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket, room.newRoom);
	});
};

let handleClientDisconnection = (socket) => {
	socket.on('disconnect',()=>{
		let nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	});
}
