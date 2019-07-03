const routes = [];

routes.push({
  creatorId: 10760795,
  stravaId: 12507027,
  gpxName: 'test',
});

const comments = [];

comments.push({
  commentId: 0,
  authorId: 10760795,
  parentId: null,
  contents: 'this is fine'
});

comments.push({
  commentId: 1,
  authorId: 10760795,
  parentId: 0,
  contents: 'no.'
});

comments.push({
  commentId: 2,
  authorId: 10760795,
  parentId: null,
  contents: 'another branch.'
});


module.exports = {
  routes,
  comments
}