import database from "../../users.json" assert {type: 'json'};
import messagesDB from "../../messages.json" assert {type: 'json'};
import path from "path";
import fs from "fs";


const __dirname = path.resolve();

let users = database['users']

class ClientController {
    async getAllUsers(req, res) {
        res.json(database['users'])
    }

    async getUserById(id) {
        return database['users'].find(user => user.id === id)
    }

    async getNews(req, res) {
        let userId = req.user.id.toString()

        let list = []

        for (let i = 0; i < database['users'].length; i++) {
            let friendIds = database['users'][i].friends;


            if (friendIds.includes(userId) || database['users'][i].id === userId) {

                for (let post of database['users'][i].news) list.push(post);
                // database['users'][i].news.forEach(post => list.push(post))
            }
        }

        list = list.sort((a, b) => b.timestamp - a.timestamp)

        // console.log(list)

        res.json({news: list})
    }

    async getDialogById(req, res) {
        // console.log(req.query)
        let id1 = req.query.id.toString()
        let id2 = req.user.id.toString()
        // console.log(id1,id2)

        // let list = []
        // for (let message of messagesDB['messages'])
        //     if (message.from === id1 && message.to === id2 || message.from===id2 && message.to===id1)
        //         list.push(message)
        //     else
        //         console.log(message.from, message.to)

        let list = messagesDB['messages'].filter(message => message.from === id1 && message.to === id2 || message.from === id2 && message.to === id1)

        // console.log(messagesDB['messages'])
        // console.log(list)
        res.json({messages: list})
    }

    async getFriends(req, res) {
        let userId = req.user.id

        let userIndex = users.findIndex(user => user.id === userId)

        let friendIds = users[userIndex].friends

        let friends = users.filter(user => friendIds.includes(user.id))

        console.log(friends)

        res.json(friends)
    }

    async getNotFriends(req, res) {
        let userId = req.user.id

        let userIndex = users.findIndex(user => user.id === userId)

        let friendIds = users[userIndex].friends

        let friends = users.filter(user => !friendIds.includes(user.id) && user.id !== userId)

        console.log(friends)

        res.json(friends)
    }

    // addFriend(userId: string) {
    //     return this.http.post(`${apiUrl}/addFriend/${userId}`, {})
    // }
    //
    // deleteFriend(friendId: string) {
    //     return this.http.post(`${apiUrl}/deleteFriend${friendId}`, {})
    // }

    async addFriend(req, res) {
        console.log("req")
        let userId = req.user.id
        let userIndex = users.findIndex(user => user.id === userId)
        let newFriendId = req.params.id
        users[userIndex].friends.push(newFriendId)

        database['users'] = users

        fs.writeFile(path.join(__dirname, 'src', 'users.json'), JSON.stringify(database), 'utf-8', (err) => {
            if (err) console.log(err.message)
        })
        console.log("add")

        res.send()
    }

    async deleteFriend(req, res) {
        console.log('dele')
        let userId = req.user.id
        let userIndex = users.findIndex(user => user.id === userId)
        let deleteFriendId = req.params.id
        try {
            users[userIndex].friends = users[userIndex].friends.filter(id => id !== deleteFriendId)
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)


            database['users'] = users

            fs.writeFile(path.join(__dirname, 'src', 'users.json'), JSON.stringify(database), 'utf-8', (err) => {
                if (err) console.log(err.message)
            })
            console.log("add")
        }
        res.send()
    }


}

export default new ClientController()
