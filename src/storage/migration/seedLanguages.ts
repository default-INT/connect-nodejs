import { DataSource } from 'typeorm';
import { Language } from 'storage/entities/Language';
import { languages } from './data/languages';

export const seedLanguages = async (connection: DataSource) => {
  const langRepo = connection.getRepository(Language);
  const langCount = await langRepo.count();

  if (langCount) return;

  await langRepo.save(languages);
};
