import Blog from './blog.js'
import User from './user.js'
import ReadingLists from './reading_list.js'

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'readinglists' })

export { Blog, User, ReadingLists }
