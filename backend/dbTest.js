const db = require('./models');


db.testTable.create({
  name: 'Bryan'
})
.then((comment) => {
  console.log(comment.get());
})

// db.testTable.findOne({
//   where: { id: 1 },
// }).then((test) => {
//   // by using eager loading, the article model should have a comments key
//   console.log(test.name);
// })
