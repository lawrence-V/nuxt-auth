const mongoose = require('mongoose')
const { success, error } = require('consola')

mongoose.connect(
  'mongodb://localhost:27017/NUXTBLOGAPP',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      success({ message: 'Database connected', badge: true })
    } else {
      console.log('Error' + err)
    }
  }
)
