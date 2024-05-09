import { RequestHandler } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { clients } from 'shared/config/clients';
import { dataSource } from 'storage';
import { User } from 'storage/entities/User';
import { tokenUtils } from 'shared/utils/tokenUtils';
import { ITokensDto } from 'services/auth/dto.types';

const oauth2Client = new OAuth2Client();

export interface IGoogleSignIn {
  idToken?: string | null;
}

type TGoogleSignInMethod = RequestHandler<{}, ITokensDto | string, IGoogleSignIn>;

export const googleSignIn: TGoogleSignInMethod = async (req, res) => {
  const { idToken } = req.body || {};

  if (!idToken) return res.status(400).send('Invalid id');

  const ticket = await oauth2Client.verifyIdToken({
    idToken,
    audience: clients,
  });

  const payload = ticket.getPayload();
  const googleId = payload?.sub;
  if (!googleId) return res.status(400).send('Unable to get google id');
  const userRepository = dataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    googleId,
  });

  if (!user) {
    const { email, id } = await userRepository.save({
      email: payload?.email,
      avatar: payload?.picture,
      friendlyName: payload?.name,
      firstName: payload?.given_name,
      lastName: payload?.family_name,
      googleId,
    });

    const tokenRes = tokenUtils.signIn({ email, id });

    return res.status(200).send(tokenRes);
  }

  const tokenRes = tokenUtils.signIn({
    id: user.id,
    email: user.email,
  });

  return res.status(200).send(tokenRes);
};