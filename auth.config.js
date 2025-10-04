import GitHub from "next-auth/providers/github"
import connectDb from "./db/connectDb"
import User from "./models/User"

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        await connectDb();
        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
      }
      return true;
    },
    async session({ session, user, token }) {
      if (session.user) {
        await connectDb();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.username = dbUser.username;
        }
      }
      return session;
    },
  },
}