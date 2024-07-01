import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { loggerMiddleware } from 'shared/middlewares/loggerMiddleware';
import { cliLogger } from 'shared/utils/logger/cliLogger';
import { env } from 'shared/config/env';
import { errorHandlerMiddleware } from 'shared/middlewares/errorHandlerMiddleware';
import { notFoundErrorMiddleware } from 'shared/middlewares/notFoundMiddleware';
import { swaggerJSDocs } from 'config/swagger/swaggerJSDocs';
import { initDataSource } from 'storage/utils/initDataSource';
import { app } from 'config/app';
import { api } from 'services/api';

const port = env.PORT || 3001;

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
