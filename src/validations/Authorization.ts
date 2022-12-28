import { validate } from './Common'

import { IAuthorizationParams } from '../interfaces/Authorization'

import Joi from 'joi'

export const validateAuthorization = (data: unknown) =>
    validate({
        data,
        schema: Joi.object<IAuthorizationParams>()
            .keys({
                authToken: Joi.string().min(0).required()
            })
            .required()
    })