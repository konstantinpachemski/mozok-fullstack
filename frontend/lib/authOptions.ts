import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) return null;
          const { username, password } = credentials;
          const res = await axios.post(
            "http://localhost:8000/auth/login",
            {
              username: username,
              password: password,
            },
            { headers: { "Content-Type": "application/json" } }
          );

          if (res.data) {
            return {
              id: res.data.user.id,
              email: res.data.user.email,
              accessToken: res.data.backendTokens.accessToken,
              refreshToken: res.data.backendTokens.refreshToken,
              accessTokenExpires: res.data.backendTokens.expiresIn,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
};

async function refreshAccessToken(token: JWT) {
  try {
    const response = await axios.post("http://localhost:8000/auth/refresh", {
      refreshToken: token.refreshToken,
    });

    if (response.data) {
      return {
        ...token,
        accessToken: response.data.accessToken,
        accessTokenExpires: response.data.expiresIn,
      };
    }

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
