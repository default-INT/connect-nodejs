import { RequestHandler } from 'express';
import { ITokensDto } from 'shared/dto/ITokensDto';
import { tokenUtils } from 'shared/utils/tokenUtils';
import { IUserJwt } from 'shared/types/user';
import { UnauthorizedError } from 'shared/errors/401/UnauthorizedError';

type TRefreshHandler = RequestHandler<{}, ITokensDto, ITokensDto>;

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh token
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ITokensDto'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ITokensDto'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized error
 *       500:
 *         description: Some server error
 */
export const refresh: TRefreshHandler = (req, res) => {
  const { refreshToken } = req.body;
  const decode = tokenUtils.verifyRefresh(refreshToken) as IUserJwt;

  if (!decode) throw new UnauthorizedError('Refresh token incorrect');

  const tokenRes = tokenUtils.signIn(decode);

  return res.status(200).send(tokenRes);
};
