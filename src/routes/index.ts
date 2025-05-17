import {Router} from "express";
import authRoute from "./auth.route";
import adminRoute from "./admin.route";
import employeeRoute from "./employee.route";
import apiJobSeeker from "./jobseeker.route";

const router=Router();

router.use('/auth',authRoute);
router.use('/admin',adminRoute);
router.use('/employee',employeeRoute);
router.use('/jobseeker',apiJobSeeker);

export default router;