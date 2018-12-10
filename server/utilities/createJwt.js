import jwt from 'jsonwebtoken';
const SECREAT = 'school';

export const signToken = (playload) => {
	return jwt.sign(playload, SECREAT);
};

export const verifyToken = (token) => {
	return jwt.verify(token, SECREAT);
};