import * as Joi from 'joi';

export const loginBodySchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    idHotel: Joi.number().required(),
});

export const refreshTokenRequestSchema = Joi.object({
    accessToken: Joi.string().required(),
});
