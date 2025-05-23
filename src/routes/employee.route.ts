import {Router} from "express";
import {authenticate,authorize} from "../middlewares/auth.middleware"
import { 
  createJob,
  getAllJob,
  getJobById,
  updateJobById,
  deleteJob,
  getAllApplicationByEmployee,
  updateApplicationStatusById
 } from "../controllers/employee.controller";
import { validate } from "../middlewares/validate.middleware";
import { createJobSchema } from "../validators/job.validator";

const router=Router();

router.use(authenticate,authorize("employee"));

router.post('/jobs',validate(createJobSchema),createJob);
router.get('/jobs',getAllJob);
router.get('/jobs/:id',getJobById);
router.put('/jobs/:id',updateJobById);
router.delete('/jobs/:id',deleteJob);


router.get('/application',getAllApplicationByEmployee);
router.put('/application/status/:id',updateApplicationStatusById);


export default router;