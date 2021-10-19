import { prismaClient } from "../../../prisma/config";

class MessageService {
  async create(text: string, user_id: string) {
    const message = await prismaClient;
  }
}

export { MessageService };
