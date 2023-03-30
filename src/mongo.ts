import mongoose from 'mongoose'
export function connectionDB (): void {
  const { MONGO_DB_URI_TEST, MONGO_DB_URI, NODE_ENV } = process.env
  if (MONGO_DB_URI_TEST != null && MONGO_DB_URI != null) {
    const connectionString = NODE_ENV === 'test'
      ? MONGO_DB_URI_TEST
      : MONGO_DB_URI
    mongoose.connect(connectionString).then(() => {
      console.log('connected')
    }).catch(err => console.log(err))
  } else {
    console.error('Environment variables MONGO_DB_URI and/or MONGO-DB-URI-TEST not defined')
  }
}
