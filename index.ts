import 'reflect-metadata';
import 'dotenv/config';
import * as process from 'process';
import swaggerUi from 'swagger-ui-express';
import { swaggerJSDocs } from 'config/swagger/swaggerJSDocs';
import bodyParser from 'body-parser';
import { dataSource } from 'storage';
import { app } from 'config/app';
import { api } from 'services/api';

const port = process.env.PORT || 3001;

(async () => {
  dataSource.initialize()
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('DB initialized');
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });

  const specs = await swaggerJSDocs();

  app.use(bodyParser.json());
  app.use('/api', api);
  app.use(
    '/swagger',
    swaggerUi.serve,
    swaggerUi.setup(specs),
  );

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Connect app listening on port ${port}`);
  });
})();
