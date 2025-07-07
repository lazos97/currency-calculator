import { Router } from 'express'
import { CurrencyController } from '../controllers/Currency'
import { isCurrencyExists } from '../middlewares/isCurrencyExists'
import { authenticate } from '../middlewares/authenticate'
import { authorizedEditor } from '../middlewares/authorizedEditor'

const router = Router()
const controller = new CurrencyController()

router.post('/', authenticate, authorizedEditor, controller.create)
router.get('/', authenticate, controller.getAll)
router.get('/convert', authenticate, controller.convert)
router.get(
  '/:id',
  authenticate,
  authorizedEditor,
  isCurrencyExists,
  controller.getById
)
router.patch(
  '/:id',
  authenticate,
  authorizedEditor,
  isCurrencyExists,
  controller.update
)
router.delete(
  '/:id',
  authenticate,
  authorizedEditor,
  isCurrencyExists,
  controller.delete
)

export default router
