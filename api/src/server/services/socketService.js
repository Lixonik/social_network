import { Server } from "socket.io";
import { createServer } from 'http'
import config from '../config.json' assert {type: 'json'}
import jwt from 'jsonwebtoken'
import MDB from "../../messages.json" assert {type: 'json'};
import UDB from "../../users.json" assert {type: 'json'};
import path from "path";
import fs from "fs";


const __dirname = path.resolve();
let messagesData = MDB['messages'];
let users = UDB['users']

let getCookie = (cookie,name)=>{
    const value = `; ${cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) { // @ts-ignore
        return parts.pop().split(';').shift();
    }
    return null
}

function socketAuth(socket,next) {
    // console.log("mmmm")
    const token = getCookie( socket.request.headers.cookie,"token")
    // console.log(token)
    if (!token) return next(new Error("Socket Auth failed"))
    jwt.verify(token, config['secret'], (err, user) => {
        // console.log(user)
        //console.log(err)
        if (err) return next(new Error("Socket Auth failed"))
        socket.user = UDB['users'].find(x => x['id'] === user.id)

        next()
    })
}

export default  class SocketService {
    postSubscribers=[]

    constructor() {
        let server = createServer()
        this.io = new Server(server, {
                cors: {
                    origin: "http://localhost:4200",
                    methods: ["GET", "POST"],
                    transports: ['websocket', 'polling'],
                    credentials: true,
                    allowedHeaders: 'Authorization,X-Requested-With,X-HTTPMethod-Override,Content-Type,Cache-Control,Accept'
                },
                allowEIO3: true
            }
        )

        this.io.use(socketAuth)
        console.log("mmmm")

        /*
                this.io.use((socket, next) => {

                    const value = `; ${socket.request.headers.cookie}`;
                    const parts = value.split(`; token=`);

                    const token = parts.length === 2 ? parts.pop().split(';').shift() : null
                    // console.log(token)
                    if (!token) return next(new Error("Socket Auth failed"))
                    let user = jwt.verify(token, config['secret'])
                    console.log(user)
                        //console.log(err)
                        // if (err) return next(new Error("Socket Auth failed"))
                    socket.user = database['users'].find(x => x['id'] === user.id)
                    console.log(socket.user)
                        next()
                    })
        */
        /*
        authUsersData.push(user)
                    database['authUsersData'] = authUsersData
                    console.log(database)
                    // console.log(typeof authUsersData, authUsersData)

                    fs.writeFile(path.join(__dirname, 'src','users.json'), JSON.stringify(database), 'utf-8', (err) => { if (err) console.log(err.message) })

         */


        this.io.on('connection', (socket) => {

            socket.on('user_message', (message) => {
                message.timestamp = Date.now()
                message.from = socket.user.id
                console.log(typeof messagesData)
                message.id = messagesData.length + 1
                messagesData.push(message)
                MDB['messages'] = messagesData
                fs.writeFile(path.join(__dirname, 'src', 'messages.json'), JSON.stringify(MDB), 'utf-8', (err) => {
                    if (err) console.log(err.message)
                })
                let clients = Array.from(this.io.sockets.sockets.values())

                clients.forEach(client => client.emit("user_message", message))
                console.log(message)
                    // clien.emit("user_message", message)
                    // console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")

                socket.emit("user_message", message)
            });


            socket.on('user_news', (post) => {
                post.timestamp = Date.now()

                let userIndex = users.findIndex(user => user.id === socket.user.id)
                post.id = UDB["lastPostId"] + 1
                UDB["lastPostId"] = post.id
                users[userIndex]['news'].push(post)
                UDB['users'] = users
                fs.writeFile(path.join(__dirname, 'src', 'users.json'), JSON.stringify(UDB), 'utf-8', (err) => {
                    if (err) console.log(err.message)
                })
                let clients = Array.from(this.io.sockets.sockets.values())

                for (let client of clients) {
                    if (users[userIndex]['friends'].includes(client.user.id)) {
                        client.emit("user_news", post);
                    }
                }
                socket.emit("user_news", post)
            });

            /*
                        socket.on('post_receive', (message) => {
                            if(message) {
                                let temp = storage.select((row) => row.user1===socket.user.id || row.user2===socket.user.id, storage.friends)
                                socket.listen=temp.map(row=>row.user1===socket.user.id?row.user2:row.user1)
                                socket.listen.push(socket.user.id)
                                this.postSubscribers.push(socket)
                                console.log("subscribed")
                            }
                            else {
                                this.postSubscribers=this.postSubscribers.filter(sub=>sub.user.id!==socket.user.id)
                                console.log("unsubscribed")
                            }
                        });
            */

        });

        server.listen(3100, () => {
            console.log('listening on port 3100');
        });
    }
/*
    sendPost(post) {
        let subs = this.postSubscribers.filter(x=>x.listen.find(x=>x===post.authorid))
        for (let sub of subs) {
            sub.emit('post_receive',post)
        }
    }
*/

}
