import { Language } from 'storage/entities/Language';
import { ILanguageDto } from 'shared/dto/ILanguageDto';

export const mapToLanguageDto = (language: Language): ILanguageDto => ({
  id: language.id,
  name: language.name,
  nativeName: language.nativeName,
  code: language.code,
});
