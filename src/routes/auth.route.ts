import {Router} from "express";
import { register,login } from "../controllers/auth.controller";
import {registerUserSchema,loginUserSchema} from "../validators/auth.validator"
import { validate } from "../middlewares/validate.middleware";
const router=Router();

router.post('/register',validate(registerUserSchema),register);
router.post('/login',validate(loginUserSchema),login);

export default router;