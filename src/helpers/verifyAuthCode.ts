import { getAuthCode } from "../dao/Firebase";

const verifyAuthCode = async (req, res, next): Promise<any> => {
    try {
        const { authCode } = req.body;

        if (authCode) {
            let isValidToken = false;
            const authCodeArr = []
            const value = await getAuthCode()
            for (const property in value) {
                authCodeArr.push(value[property]['authCode']);
            }
            switch (req.method) {
                case "POST":
                    isValidToken = authCodeArr.includes(authCode);
                    break;
            }

            return isValidToken ? next() : res.status(403).send({ success: false, message: 'Not authorized' });
        }
    } catch (err) {
        res.status(500).send({ auth: false, message: err.message });
    }
};

export default verifyAuthCode;
