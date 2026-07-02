import { CHECK_CREDENTIALS_URL } from "@/lib/api-endpoints";
import axios from "axios";
import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  token?: string | null;
};

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({
      session,
      user,
      token,
    }: {
      session: CustomSession;
      user: CustomUser;
      token: JWT;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: CustomUser | null }) {
      if (user) token.user = user;
      return token;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        const { data } = await axios.post(CHECK_CREDENTIALS_URL, credentials);
        const user = data?.data;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
