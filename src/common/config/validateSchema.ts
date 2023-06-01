import * as Joi from 'joi';
export default {
    validationSchema: Joi.object({
        WHITE_LIST_ORIGIN: Joi.string(),
        PORT: Joi.number().default(3000),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_PASSWORD: Joi.string().required(),
    }),
};
