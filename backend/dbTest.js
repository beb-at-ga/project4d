const db = require('./models');

// db.user.create({
//   firstname: 'Bryan',
//   lastname: 'Brinson',
//   email: 'bryan@beb.com',
//   password: '1234567890'
// })
// .then((comment) => {
//   console.log(comment.get());
// })

db.user.findOne({
  where: { id: 1 },
}).then((test) => {
  // by using eager loading, the article model should have a comments key
  console.log(test.dataValues);
})
