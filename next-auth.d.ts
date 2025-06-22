import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {

    
  interface Session {
    user: {

      id: string // using jwt token but i dont why they are using address and what it is 
    } & DefaultSession["user"]
  }
}



/*********************************** FLOW OF NEXT JS ********************************/

/*
1. Design DB Models (e.g., User, Video) using Mongoose
2. Setup a shared MongoDB connection logic using global cache
3. Implement authentication:
   a. Create registration endpoint manually (NextAuth doesn’t provide it)
   b. Setup NextAuth for login (Google/Credentials)
   c. Secure pages based on sessions (JWT or database)

   */
