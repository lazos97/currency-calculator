import express, { Request, Response, Router } from 'express'
import { AuthController } from '../controllers/Auth'
import { authenticate } from '../middlewares/authenticate'
import { isNotLoggedIn } from '../middlewares/isLoggedIn'

const router: Router = express.Router()
const controller = new AuthController()

router.post('/register', isNotLoggedIn, controller.register)
router.post('/login', isNotLoggedIn, controller.login)
router.get('/logout', authenticate, controller.logout)

export default router
