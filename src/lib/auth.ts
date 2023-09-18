import db from "@/db";
import {
  AuthOptions,
  DefaultSession,
  DefaultUser,
  getServerSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthorProfile, Role, authorProfiles, users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      profile: AuthorProfile | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: Role;
    profile: AuthorProfile | null;
  }
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  // @ts-ignore
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, user: _user }) {
      if (session.user) {
        // hacky work around since _user doesnt seem to contain
        // any columns that are extended from the base users schema
        const [{ user, profile }] = await db
          .select()
          .from(users)
          .where(eq(users.id, _user.id))
          .leftJoin(authorProfiles, eq(authorProfiles.userId, users.id));

        session.user.role = user.role;
        session.user.id = user.id;
        session.user.profile = profile;
      }
      return session;
    },
  },
};

export async function getCurrentUser() {
  return (await getServerSession(authOptions))?.user;
}
