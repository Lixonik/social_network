import Router from "express"
import controller from '../controllers/authController.js'
import clientController from '../controllers/clientController.js'
import { check } from 'express-validator'
import authMiddleware from '../middleware/authMiddleware.js'


const router = new Router()

router.post('/registration', [
    check('email', 'email should\'t be empty').notEmpty(),
    check('password', 'min password length 4').isLength({min: 4}),
    check('surname', 'surname should\'t be empty').notEmpty(),
    check('name', 'name should\'t be empty').notEmpty(),
],controller.registration)
router.post('/login', controller.login)
router.get('/users', authMiddleware,clientController.getAllUsers)
router.get('/users/:id', (req, res) => {
    res.json(clientController.getUserById(req.params.id))
})

router.get('/dialog', authMiddleware , clientController.getDialogById)

router.get('/news', authMiddleware, clientController.getNews)

router.get('/friends', authMiddleware, clientController.getFriends)

router.get('/notFriends', authMiddleware, clientController.getNotFriends)

router.post('/addFriend/:id', authMiddleware, (req, res) => {
    console.log('proof')
    clientController.addFriend(req, res)
})
router.post('/deleteFriend/:id', authMiddleware, clientController.deleteFriend)


export default router
