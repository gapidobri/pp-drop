import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('upload');
});

app.get('/:uuid', (req, res) => {
  res.render('download', { uuid: req.params.uuid });
});

server.listen(port, () => console.log(`Listening on port ${port}!`));
