import { Request, Response } from 'express';
import GCashImpl from '../impl/Authorization';
import { validateAuthorization } from '../validations/Authorization';

class Authorization {
    public async applyToken(req: Request, res: Response): Promise<void> {
        try {
            const { error: schemaErr } = validateAuthorization(req.body)
            if (schemaErr) {
                console.log(
                    'AuthCode Request Failed',
                    JSON.stringify(
                        {
                            message: 'Invalid Request Field',
                            err: schemaErr.details
                        },
                        null,
                        2
                    )
                )

                res.status(422).json({
                    sucess: false,
                    message: 'Invalid Request Field',
                    errors: schemaErr.details
                });
            }
            const { authCode } = req.body;
            const result = await GCashImpl.applyToken(authCode);
            // gawa helpers for condition 
            res.status(200);
            res.json({
                success: true,
                result
            });
        } catch (error) {
            const message = error?.response?.data?.message || error.message;
            console.log('GCash Authorization Failed', {
                message,
                err: error?.response?.data || error
            });
            res.status(400).json({
                sucess: false,
                message
            });
        }
    }
}

export default Authorization;
