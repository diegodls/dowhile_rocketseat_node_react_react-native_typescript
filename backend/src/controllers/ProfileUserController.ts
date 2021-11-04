import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

interface IRequest extends Request {
  user_id: string;
  ///Workaround devido ao typeRoots não funcionar (ou ter erros)
}

class ProfileUserController {
  async handle(request: IRequest, response: Response) {
    const { user_id } = request;

    const service = new ProfileUserService();

    const result = await service.execute(user_id);

    return response.json(result);
  }
}

export { ProfileUserController };
