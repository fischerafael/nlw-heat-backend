import { Request, Response } from "express";
import { AuthenticateService } from "../../services/Authentication";

class AuthenticateController {
  async handle(req: Request, res: Response) {
    const { code } = req.body;

    const service = new AuthenticateService();

    const result = await service.create(code);

    return res.json(result);
  }
}

export { AuthenticateController };
