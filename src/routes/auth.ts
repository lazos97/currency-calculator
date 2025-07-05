import express, { Request, Response, Router } from 'express'
import { AuthController } from '../controllers/Auth'

const router: Router = express.Router()
const controller = new AuthController()

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/logout', controller.logout)

export default router
