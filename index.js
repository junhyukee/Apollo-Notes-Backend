const app = require('./server/server');

let port = process.env.PORT || 4000

app.listen(port, () => {
  console.log('Listening');
});
