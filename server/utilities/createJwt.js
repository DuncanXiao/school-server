import jwt from 'jsonwebtoken';
import { SECREAT } from 'Constant/config';

export const signToken = (playload) => {
	return jwt.sign(playload, SECREAT);
};

export const verifyToken = (token) => {
	return jwt.verify(token, SECREAT);
};