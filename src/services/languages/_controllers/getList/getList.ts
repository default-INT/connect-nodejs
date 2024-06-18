import { RequestHandler } from 'express';
import { dataSource } from 'storage';
import { Language } from 'storage/entities/Language';
import { ILanguageDto } from 'shared/dto/ILanguageDto';
import { mapToLanguageDto } from 'shared/dto/mappers/mapToLanguageDto';

type TGetList = RequestHandler<{}, ILanguageDto[] | string, {}>;

/**
 * @swagger
 * /api/languages/getList:
 *   get:
 *     summary: Get all languages
 *     tags: [languages]
 *     responses:
 *       200:
 *         description: Events array.
 *         content:
 *           application/json::
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/ILanguageDto'
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Some server error
 *
 */
export const getList: TGetList = async (_, res) => {
  const langRepo = dataSource.getRepository(Language);
  const languages = await langRepo.find();
  const languagesDto = languages.map(mapToLanguageDto);

  return res.status(200).json(languagesDto);
};
