import Router from "express"
import fs from "fs";
import content from "../../users.json" assert {type: 'json'};

const router = Router();
let users = content['users'];

router.get("/", (req, res) => {
    res.redirect("/users");
});

router.get("/users", (req, res) => {
    res.render("users.pug", {
        users: users
    });
})

router.get("/users/:userid/news", (req, res) => {
    let friendList = users.find(user => user.id === req.params.userid)['friends']

    res.render("news.pug", {
        users: users.filter(user => friendList.indexOf(user.id) !== -1 && user['news'])
    });
})

router.get("/users/:userid/friends", (req, res) => {
    let friendList = users.find(user => user.id === req.params.userid)['friends']

    res.render("friends.pug", {
        users: users.filter(user => friendList.indexOf(user.id) !== -1)
    });
})

router.put("/users", (req, res) => {
    let reUser = req.body
    let index = users.findIndex(user => user.id == reUser.id);
    users[index].surname = reUser.surname;
    users[index].name = reUser.name;
    users[index].patronymic = reUser.patronymic;
    users[index].birthday = reUser.birthday;
    users[index].email = reUser.email;
    users[index].role = reUser.role;
    users[index].status = reUser.status;
    content['users'] = users;

    fs.writeFile("src/users.json", JSON.stringify(content), 'utf-8', () =>{});
    res.end();
})

// router.post(`/api/login`, (req, res) => {
//     let userLogin = req.body
//     console.log("ddddd")
//     console.log(req.body)
//     let user = users.filter(user => user.email === userLogin.email)

//     let fn = user.name
//     let ln = user.surname

//     let go = {
//         firstName: fn,
//         lastName: ln
//     }

//     res.send(
//         users[0]
//       );
// })

// router.post('/api/login', (req, res) => {
//     for (let user of users) {
//       if (
//         req.body.email === user.email &&
//         req.body.password === user.password
//       ) {
//         res.send(user)
//       }
//     }


  // })


// router.post('/api/signup', (req, res) => { // сохранить в бд
//     console.log(req.body)
//     res.end();
// })

export default router;
