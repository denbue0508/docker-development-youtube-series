import { Request, Response } from 'express';
import GCashSvc from '../service/Gcash';
import { validateAuthorization } from '../validations/Authorization';

class Authorization {
    public async getUserInfo(req: Request, res: Response): Promise<void> {
        try {
            const { error: schemaErr } = validateAuthorization(req.body)
            if (schemaErr) {
                res.status(422).json({
                    sucess: false,
                    message: 'Invalid Request Field',
                    errors: schemaErr.details
                });
            }
            const { authCode } = req.body;
            const result = await GCashSvc.inquiryUserInfo(authCode);
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
