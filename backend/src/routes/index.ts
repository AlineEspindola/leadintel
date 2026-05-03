import { Router } from 'express'
import { CompanyController } from '../controllers/CompanyController'
import { CompanyService } from '../services/CompanyService'
import { BrasilAPIRepository } from '../repositories/BrasilAPIRepository'

const router = Router()
const repo = new BrasilAPIRepository()
const service = new CompanyService(repo)
const controller = new CompanyController(service)

router.post('/company/enrich', controller.enrich)

export default router
