import { Router } from 'express'
import { CurrencyController } from '../controllers/Currency'
import { isCurrencyExists } from '../middlewares/isCurrencyExists'

const router = Router()
const controller = new CurrencyController()

router.post('/', controller.create)
router.get('/', controller.getAll)
router.get('/convert', controller.convert)
router.get('/:id', isCurrencyExists, controller.getById)
router.patch('/:id', isCurrencyExists, controller.update)
router.delete('/:id', isCurrencyExists, controller.delete)

export default router
