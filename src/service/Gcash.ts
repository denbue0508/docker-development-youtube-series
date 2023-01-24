import { set } from '../helpers/GCashHeaders'
import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios'
class Gcash {
		public static pay = async (payload: any) => {
			const headers = set(
				process.env.REFERENCE_CLIENT_ID,
				`${process.env.GCASH_PAYMENT_URL}`,
				process.env.GCASH_PRIVATE_KEY,
				payload
			);
	
			return axios({
				method: "POST",
				url: `${process.env.GCASH_BASE_URL}${process.env.GCASH_PAYMENT_URL}`,
				headers,
				data: payload,
			});
		};
	
		public static inquiry = async (payload: any) => {
			console.log('gcashPayInquiry: ', payload)
			const headers = set(
				process.env.REFERENCE_CLIENT_ID,
				`${process.env.GCASH_PAYMENT_INQUIRY_URL}`,
				process.env.GCASH_PRIVATE_KEY,
				payload
			);
	
			console.log('gcashPayInquiry: ', {
				method: "POST",
				url: `${process.env.GCASH_BASE_URL}${process.env.GCASH_PAYMENT_INQUIRY_URL}`,
				headers,
				data: payload,
			})
			return axios({
				method: "POST",
				url: `${process.env.GCASH_BASE_URL}${process.env.GCASH_PAYMENT_INQUIRY_URL}`,
				headers,
				data: payload,
			});
		};
}

export default Gcash
