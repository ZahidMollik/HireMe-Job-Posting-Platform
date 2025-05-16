import {Router} from "express";
import {authenticate,authorize} from "../middlewares/auth.middleware"
import { createCompany,getAllCompanies,getCompanyById,updateCompanyById,deleteCompanyById } from "../controllers/admin.controller";
const router=Router();

router.use(authenticate,authorize("admin"));

router.post('/companies',createCompany);
router.get('/companies',getAllCompanies);
router.get('/companies/:id',getCompanyById);
router.put('/companies/:id',updateCompanyById);
router.delete('/companies/:id',deleteCompanyById);

export default router;