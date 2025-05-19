import "next-auth";
import { User as UserType } from "./auth";

declare module "next-auth" {
  interface User extends UserType {
    accessToken: string;
  }

  interface Session {
    user: User;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    user: User;
    accessToken: string;
  }
}
