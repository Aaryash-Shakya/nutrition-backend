import config from '../../config/config';

import logger from '../logger';
import projectEnum from '../enum/project.enum';

const jwt = require('jsonwebtoken');

export async function checkAuthHeader(req: any, res: any, next: any) {
	const tokenPrefix = 'Bearer ';
	const { authorization } = req.headers;
	if (authorization) {
		const token = authorization.replace(tokenPrefix, '');
		await jwt.verify(token, config.jwtSecret, (err: any, decoded: any) => {
			if (err) {
				let jwtError = {};
				switch (err.message) {
					case 'jwt expired':
						jwtError = {
							success: false,
							status: 401,
							error: 'JWT_EXPIRED',
							stack: {
								message: 'JWT EXPIRED',
							},
						};
						return res.status(401).send(jwtError);
					case 'invalid signature':
						jwtError = {
							success: false,
							status: 401,
							error: 'INVALID_SIGNATURE',
							stack: {
								message: 'INVALID SIGNATURE',
							},
						};
						return res.status(401).send(JSON.stringify(jwtError));
					default:
						return res.status(401).send(JSON.stringify(err));
				}
			}
			if (decoded) {
				req.userId = decoded.iss;
				req.email = decoded.email;
				req.name = decoded.name;
				req.role = decoded.role;
				return next();
			}
			const jwtError = {
				success: false,
				status: 401,
				error: 'INVALID_PAYLOAD',
				stack: {
					message: 'INVALID PAYLOAD',
				},
			};
			return res.status(401).send(JSON.stringify(jwtError));
		});
	} else {
		return res.status(401).send('invalid header');
	}
	return null;
}

async function isUserSuperAdmin(req: any, res: any, next: any) {
	const role = req.role;
	try {
		if (role && role === projectEnum.userRole.ADMIN) {
			return next();
		}
		const errorMsg = {
			success: false,
			status: 401,
			error: 'NOT AUTHORIZED',
			stack: {
				message: 'Not authorized to access this resource',
			},
		};
		return res.status(401).send(errorMsg);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default {
	checkAuthHeader,
	isUserSuperAdmin,
};
