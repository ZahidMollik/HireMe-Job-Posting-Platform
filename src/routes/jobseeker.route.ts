import {Router} from "express";
import { applyJob,paymentSuccess,paymentFail,getAllJob,getAllApplication } from "../controllers/jobseeker.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/fileUpload.middleware";

const router=Router();
router.use(authenticate);

router.post('/apply/:jobId',upload.single('cv'),applyJob);
router.post('/payments/ssl-success',paymentSuccess);
router.post('/payments/ssl-fail',paymentFail);
router.get('/application',getAllApplication);
router.get('/jobs',getAllJob);

export default router;