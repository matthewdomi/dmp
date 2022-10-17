import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import db from '../../../lib/dbConnect'
import User from '../../../models/user'

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) {
        token._id = user.id
      }
      if (user?.isAdmin) {
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ token, session }) {
      if (token?._id) {
        session.user._id = token._id
      }
      if (token?.isAdmin) {
        session.user.isAdmin = token.isAdmin
      }
      return session
    },
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      async authorize(credentials) {
        //connect to database
        await db.connect()

        //find user
        const user = await User.findOne({
          staffId: credentials.staffId,
        })
        //disconnect databse
        await db.disconnect()

        //check for user's password
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            staffId: user.staffId,
            email: user.email,
            isAdmin: user.isAdmin,
            image: 'image',
          }
        }

        throw new Error('Invalid email or password')
      },
    }),
  ],

  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
})
