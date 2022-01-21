const User = require('./User');
const Movie = require('./Movie');
// const PostComment = require('./PostComment')


// A user can have many posts
// User.hasMany(Post, {
//   foreignKey: 'owner',
//   onDelete: 'CASCADE'
// });

// // A post belongs to a single user
// Post.belongsTo(User, {
//   foreignKey: 'owner'
// });

// // A post can have many comments
// Post.hasMany(PostComment,{
//   foreignKey:'related_post',
//   as: 'comments',
//   onDelete: 'CASCADE'
// })

// // A comment belongs to a signle post
// PostComment.belongsTo(Post, {
//   foreignKey: 'related_post',
//   as: 'post'
// })

module.exports = { User, Movie };