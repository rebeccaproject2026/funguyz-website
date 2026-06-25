import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/backend/config/db';
import Customer from '@/backend/models/Customer';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        await connectDB();

        const user = await Customer.findOne({ email: credentials.email.toLowerCase(), deleted: false });

        if (!user) {
          throw new Error('No user found with this email');
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          isDummyPassword: user.isDummyPassword || false,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isDummyPassword = (user as any).isDummyPassword;
      } else if (token.id) {
        // Subsequent checks: ensure user hasn't been deleted
        await connectDB();
        const existingUser = await Customer.findOne({ _id: token.id, deleted: false });
        if (!existingUser) {
          return {} as any; // Invalidate token if user is deleted
        }
      }
      
      // Handle manual session updates
      if (trigger === 'update' && session) {
        if (session.role) token.role = session.role;
        if (session.isDummyPassword !== undefined) token.isDummyPassword = session.isDummyPassword;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token && token.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        (session.user as any).isDummyPassword = token.isDummyPassword;
      } else {
        // Clear session if token was invalidated
        (session as any).user = null;
      }
      return session;
    },
  },
  pages: {
    signIn: '/my-account', // Custom sign in page
    error: '/my-account',  // Error code passed in query string as ?error=
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
