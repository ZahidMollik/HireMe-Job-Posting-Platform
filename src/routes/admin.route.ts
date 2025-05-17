import {Router} from "express";
import {authenticate,authorize} from "../middlewares/auth.middleware"
import { 
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  getAllUsers,
  updateUserInfo,
  deleteUser,
  getAllJob,
  updateJobById,
  deleteJob,
  getAllApplicationsForAdmin,
  getAdminAnalytics
 } from "../controllers/admin.controller";
const router=Router();

router.use(authenticate,authorize("admin"));

router.post('/companies',createCompany);
router.get('/companies',getAllCompanies);
router.get('/companies/:id',getCompanyById);
router.put('/companies/:id',updateCompanyById);
router.delete('/companies/:id',deleteCompanyById);

router.get('/users',getAllUsers)
router.put('/users/:id',updateUserInfo)
router.delete('/users/:id',deleteUser)

router.get('/jobs',getAllJob)
router.put('/jobs/:id',updateJobById)
router.delete('/jobs/:id',deleteJob)

router.get('/application',getAllApplicationsForAdmin)

router.get('/analytics',getAdminAnalytics)

export default router;