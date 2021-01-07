import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT, MONGO_NAME } = process.env

mongoose.connect(
  `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log('[MONGO] Connected!')
}).catch(e => {
  const msg = 'ERROR! Could not connect with MongoDB!'
  console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
})

export default mongoose
