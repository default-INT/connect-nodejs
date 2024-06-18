import { dataSource } from 'storage';
import { seedLanguages } from 'storage/migration/seedLanguages';
import { cliLogger } from 'shared/utils/logger/cliLogger';

export const initDataSource = async () => {
  try {
    const connection = await dataSource.initialize();
    await seedLanguages(connection);

    cliLogger.info('DB initialized');
  } catch (error) {
    cliLogger.error(error);
  }
};
