import express from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", authMiddleware, authController.me);
router.post("/auth/activation", authController.activation);

router.get("/test-acl", authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]), (req, res) => {
  res.json({
    message: "OK",
    data: "Success",
  });
});

export default router;
