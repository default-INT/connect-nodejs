import 'reflect-metadata';
import 'dotenv/config';
import * as process from 'process';
import { dataSource } from 'storage';
import { app } from 'config/app';
import { routes } from './config/routes';

const port = process.env.PORT || 3001;

dataSource.initialize()
  .then(() => {
    console.log('DB initialized');
  })
  .catch(error => console.log(error));

app.use(routes.gallery, (_, res) => res.sendStatus(500));

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
