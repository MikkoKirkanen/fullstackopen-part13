import Blog from './blog.js'
import User from './user.js'
import ReadingList from './reading_list.js'
import Session from './session.js'

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'readinglist' })

User.hasOne(Session)

export { Blog, User, ReadingList, Session }
