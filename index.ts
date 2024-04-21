import { app } from 'config/app';
import { routes } from './config/routes';

const port = process.env.PORT || 3001;

app.use(routes.gallery, (_, res) => res.sendStatus(500));

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
