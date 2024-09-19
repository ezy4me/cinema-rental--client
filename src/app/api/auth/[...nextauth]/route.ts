import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/refresh", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.refreshToken.token}`,
      },
      credentials: "include",
    });

    const refreshedTokens = await res.json();

    if (!res.ok) {
      throw new Error("Ошибка при обновлении токенов");
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken || token.refreshToken,
    };
  } catch (error) {
    console.error("Ошибка при обновлении токена:", error);

    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/auth/login",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status == 401) {
          console.log(res.statusText);
          return null;
        }

        const user = await res.json();

        console.log(user);

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }): Promise<any> {
      if (user) {
        return {
          ...token,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          ...user
        };
      }

      if (token.refreshToken && new Date() > new Date(token.refreshToken.exp)) {
        return await refreshToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      session.user = { ...token.user };
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
