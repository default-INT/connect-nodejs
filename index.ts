import 'reflect-metadata';
import 'dotenv/config';
import * as process from 'process';
import bodyParser from 'body-parser';
import { dataSource } from 'storage';
import { app } from 'config/app';
import { api } from 'services/api';

const port = process.env.PORT || 3001;

dataSource.initialize()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('DB initialized');
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log(error);
  });

app.use(bodyParser.json());
app.use('/api', api);

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Connect app listening on port ${port}`);
});
