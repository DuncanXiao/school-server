import jwt from 'jsonwebtoken';
require('dotenvjs').string();

const SECREAT =process.env.SECREAT;

export const signToken = (playload) => {
	return jwt.sign(playload, SECREAT, { expiresIn: '2h' });
};

export const verifyToken = (token) => {
	return jwt.verify(token, SECREAT);
};