import mongoose from "mongoose";
import { ApiError } from "next/dist/server/api-utils";

const MONGODB_URI = process.env.MONGODB_URI!;


if(!MONGODB_URI) {
    throw new Error("MONGODB_URI are not defined in .env please check at .env file")
}

let cached  = global.mongoose;

if(!cached) {
    cached = global.mongoose = {conn:null , promise:null}
}

export async function connectToDB() {

    // if connection is stablished; 
    if(cached.conn) return cached.conn

    // if connection is going to stablished asynchronous
    if (!cached.promise) {
        const opts = {
            bufferCommands:true ,
            maxPoolSize:10,
        };

        cached.promise = mongoose.connect(MONGODB_URI,opts)
        .then(()=>mongoose.connection)  
    }


try {
    cached.conn =await cached.promise
} catch (error) {
    cached.promise = null
    console.error("Error:: types.s.ts = ",error)
    throw new Error("Error while resolving Promise at Database connection ")
}
return cached.conn


}
/**************** DATABASE CONNECTION ARCHITECTURE & WHY WE CACHE IN NEXT.JS *****************

1. Next.js doesn't use a single persistent backend server like traditional MERN apps. 
   It deploys functions globally as serverless endpoints (e.g., AWS Lambda).

2. Each time a request hits a new region or cold serverless instance, a new runtime is initialized.

3. Without caching, every request would create a new MongoDB connection — which can exhaust MongoDB Atlas limits.

4. That's why we use a global variable (global.mongoose) to cache:
    - The connection object (`conn`)
    - The in-progress connection (`promise`) to prevent duplicate parallel connections

5. This leads to a 3-state model:
    - `conn = null`, `promise = null`: → No connection yet
    - `conn = null`, `promise = Promise`: → Connecting
    - `conn = Connection`: → Ready to use

This pattern ensures efficient DB usage in serverless environments like Next.js.

**************************************************************************************/
