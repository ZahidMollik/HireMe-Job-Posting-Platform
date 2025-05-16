import {Router} from "express";
import authRoute from "./auth.route";
import adminRoute from "./admin.route";
import employeeRoute from "./employee.route";
const router=Router();

router.use('/auth',authRoute);
router.use('/admin',adminRoute);
router.use('/employee',employeeRoute);

export default router;