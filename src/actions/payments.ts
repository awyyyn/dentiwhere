import { Payment, PaymentPartialInfo } from "@/types/types";
import { fromUnixTime } from "date-fns";
import { isEmpty } from "lodash";

const options = {
	method: "POST",
	headers: {
		accept: "application/json",
		"content-type": "application/json",
		authorization: "Basic c2tfdGVzdF9aWEFWdnk5bndoMzduUWpob3hSeWVUOXE6",
	},
};

const url = "https://api.paymongo.com/v1/checkout_sessions";

interface CreateLinkProps {
	biller: {
		name: string;
		email: string;
		phone: string;
	};
	description: string;
	amount: number;
	name: string;
}

export const createLink = async (
	val: CreateLinkProps,
	subId: number,
	subName: string
) => {
	const data = await fetch(url, {
		...options,
		body: JSON.stringify({
			data: {
				attributes: {
					billing: {
						name: val.biller.name,
						email: val.biller.email,
						phone: val.biller.phone,
					},
					// send_email_receipt: true,
					show_description: true,
					show_line_items: true,
					amount: val.amount,
					line_items: [
						{
							currency: "PHP",
							amount: val.amount,
							quantity: 1,
							name: val.name,
							description: isEmpty(val.description)
								? "Subscribe to a plan"
								: val.description,
						},
					],
					cancel_url: import.meta.env.DEV
						? "http://localhost:5173/subscribe?status=cancelled"
						: "https://dentiwhere.vercel.app/subscribe?status=cancelled",
					success_url: `${
						import.meta.env.DEV
							? "http://localhost:5173/"
							: "https://dentiwhere.vercel.app"
					}subscribe?status=success&id=${subId}`,
					payment_method_types: ["gcash"],
					description: subName,
				},
			},
		}),
	});

	return data.json();
};

export const listOfPayments = async (): Promise<PaymentPartialInfo[]> => {
	const url = "https://api.paymongo.com/v1/payments?limit=999999999999";

	const res = await fetch(url, {
		headers: options.headers,
		method: "GET",
	});

	const data: { data: Payment[] } = await res.json();

	return data.data
		.flatMap((d) => ({
			id: d.id,
			status: d.attributes.status,
			paid_at: fromUnixTime(parseInt(d.attributes.paid_at as string)),
			amount: d.attributes.amount,
			description: d.attributes.description,
			name: d.attributes.billing.name,
			email: d.attributes.billing.email,
		}))
		.filter((payment) => payment.email !== "alwin.puche16@gmail.com");
};

/* 
	const axios = require('axios');

	const options = {
	method: 'POST',
	url: 'https://api.paymongo.com/v1/checkout_sessions',
	headers: {
		accept: 'application/json',
		'Content-Type': 'application/json',
		authorization: 'Basic c2tfdGVzdF9aWEFWdnk5bndoMzduUWpob3hSeWVUOXE6'
	},
	data: {
		data: {
		attributes: {
			send_email_receipt: false,
			show_description: true,
			show_line_items: true,
			description: '123',
			line_items: [
			{
				currency: 'PHP',
				amount: 400000,
				description: 'adsas',
				name: 'asdasd',
				quantity: 1
			}
			],
			payment_method_types: ['gcash']
		}
		}
	}
	};

	axios
	.request(options)
	.then(function (response) {
		console.log(response.data);
	})
	.catch(function (error) {
		console.error(error);
	});
*/

/* 

import paymongo from '@api/paymongo';

paymongo.auth('sk_test_ZXAVvy9nwh37nQjhoxRyeT9q');
paymongo.createACheckout({
  data: {
    attributes: {
      billing: {name: 'Test', email: 'new@asd.ca', phone: '23132'},
      send_email_receipt: false,
      show_description: true,
      show_line_items: true,
      cancel_url: 'http://localhost:5173',
      line_items: [{currency: 'PHP', amount: 2222, name: 'asdasd', quantity: 1, description: '1'}],
      payment_method_types: ['gcash'],
      success_url: 'http://localhost:5173/dental-settings',
      description: 'test'
    }
  }
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));

*/
