import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
        id: number;
        email: string;
        role: string;
    };
    accessToken: string;
    refreshToken: {
      token: string;
      exp: string;
      userAgent: string;
      userId: number;
    };
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      role: string;
    };
    accessToken: string;
    refreshToken: {
      token: string;
      exp: string;
      userAgent: string;
      userId: number;
    };
  }
}
