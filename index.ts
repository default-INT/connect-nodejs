import 'reflect-metadata';
import 'dotenv/config';
import * as process from 'process';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { loggerMiddleware } from 'shared/middlewares/loggerMiddleware';
import { cliLogger } from 'shared/utils/logger/cliLogger';
import { errorHandlerMiddleware } from 'shared/middlewares/errorHandlerMiddleware';
import { notFoundErrorMiddleware } from 'shared/middlewares/notFoundMiddleware';
import { swaggerJSDocs } from 'config/swagger/swaggerJSDocs';
import { app } from 'config/app';
import { api } from 'services/api';
import { initDataSource } from 'storage/utils/initDataSource';

const port = process.env.PORT || 3001;

(async () => {
  await initDataSource();

  const specs = swaggerJSDocs();

  app.use(bodyParser.json());
  app.use(loggerMiddleware);
  app.use('/api', api);
  app.use(
    '/swagger',
    swaggerUi.serve,
    swaggerUi.setup(specs),
  );

  app.use(
    notFoundErrorMiddleware,
    errorHandlerMiddleware,
  );

  app.listen(port, () => {
    cliLogger.info(`Connect app listening on port ${port}`);
  });
})();
