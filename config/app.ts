import { corsOptions } from 'config/corsOptions';
import express from 'express';

export const app = express();


app.use(corsOptions);
