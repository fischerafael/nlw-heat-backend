import { Router } from "express";
import { AuthenticateController } from "./controllers/Authentication";

const router = Router();

router.post("/authenticate", new AuthenticateController().handle);

export { router };
