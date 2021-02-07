import axios from "axios";

const URL = "https://designerportal.net/testreact/addToCart.php";

interface Result {
	id: string;
	img_product: string;
	name: string;
	price: number;
	quantity: number;
}

const addToCart = async (product_id: string, quantity: number) => {
	const result = await axios.post<Result>(URL, {
		data: { product_id, quantity },
	});
	console.log(result);
};

export default addToCart;
