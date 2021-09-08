import mongoose from 'mongoose'

const MONGODB_URI : string | undefined = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore
let cached = global.mongoose

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    }


    // @ts-ignore
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    }).catch((e)=>{
      throw e;
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect