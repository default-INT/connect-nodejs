import 'reflect-metadata';
import 'dotenv/config';
import * as process from 'process';
import swaggerUi from 'swagger-ui-express';
import { swaggerJSDocs } from 'config/swagger/swaggerJSDocs';
import bodyParser from 'body-parser';
import { dataSource } from 'storage';
import { app } from 'config/app';
import { api } from 'services/api';
import { loggerMiddleware } from 'shared/middlewares/loggerMiddleware';
import { cliLogger } from 'shared/utils/logger/cliLogger';

const port = process.env.PORT || 3001;

(async () => {
  dataSource.initialize()
    .then(() => {
      cliLogger.info('DB initialized');
    })
    .catch(error => {
      cliLogger.error(error);
    });

  const specs = swaggerJSDocs();

  app.use(bodyParser.json());
  app.use(loggerMiddleware);
  app.use('/api', api);
  app.use(
    '/swagger',
    swaggerUi.serve,
    swaggerUi.setup(specs),
  );

  app.listen(port, () => {
    cliLogger.info(`Connect app listening on port ${port}`);
  });
})();
