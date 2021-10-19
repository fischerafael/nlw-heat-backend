import axios from "axios";
import { sign } from "jsonwebtoken";
import { prismaClient } from "../../../prisma/config";

interface IAccessTokenResponse {
  access_token: string;
}
interface IGithubInfoResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateService {
  async create(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    try {
      const { data: accesTokenRes } = await axios.post<IAccessTokenResponse>(
        url,
        null,
        {
          params: {
            client_id: process.env.GITHUB_ID,
            client_secret: process.env.GITHUB_SECRET,
            code,
          },
          headers: {
            Accept: "application/json",
          },
        }
      );

      const { data: userRes } = await axios.get<IGithubInfoResponse>(
        `https://api.github.com/user`,
        {
          headers: {
            Authorization: `Bearer ${accesTokenRes.access_token}`,
          },
        }
      );

      const { login, id, avatar_url, name } = userRes;

      let user = await prismaClient.user.findFirst({
        where: { github_id: id },
      });

      if (!user) {
        user = await prismaClient.user.create({
          data: {
            github_id: id,
            login,
            avatar_url,
            name,
          },
        });
      }

      const token = sign({ user }, process.env.JWT_SECRET, {
        subject: user.id,
        expiresIn: "1d",
      });

      return { token, user };
    } catch (e) {
      return e;
    }
  }
}

export { AuthenticateService };
