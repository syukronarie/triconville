import axios from "axios";

const URL = "https://designerportal.net/testreact/addToCart.php";

interface Result {
	id: string;
	img_product: string;
	name: string;
	price: number;
	quantity: number;
}

export interface Orderlines {
	product_id: number;
	qty_order: number;
	subtotal: number;
}

const buyNow = async (
	email: string,
	firstname: string,
	lastname: string,
	orderlines: Orderlines[]
) => {
	const result = await axios.post<Result>(URL, {
		data: { email, firstname, lastname, orderlines },
	});
	console.log(result);
};

export default buyNow;
