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
    async session({ session, token }) {
      (session as CustomSession).user = token.user as CustomUser;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { data } = await axios.post(CHECK_CREDENTIALS_URL, credentials);
        const user = data?.data;

        if (user) {
          // Only values returned here are persisted in the NextAuth JWT.
          // Keep the API token as part of the user so the session callback can
          // expose it at `session.user.token`.
          return {
            id: String(user.id ?? user.email),
            name: user.name,
            email: user.email,
            token: user.token,
          };
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
