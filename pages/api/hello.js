import db from '../../lib/dbConnect'
import User from '../../models/user'
import data from '../../utils/data'

const handler = async (req, res) => {
  await db.connect()
  await User.deleteMany()
  await User.insertMany(data.users)
  await db.disconnect()
  res.send({ message: 'data sent successfully' })
}

export default handler
