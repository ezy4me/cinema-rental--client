import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      role: string;
    };
    accesToken: string;
    refreshToken: {
      token: number;
      exp: string;
      userAgent: string;
      userId: string;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      role: string;
    };
    accesToken: string;
    refreshToken: {
      token: number;
      exp: string;
      userAgent: string;
      userId: string;
    };
  }
}
