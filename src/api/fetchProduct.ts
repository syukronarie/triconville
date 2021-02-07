import axios from "axios";
import Products from "../model/Products";

const URL = "https://designerportal.net/testreact/getProduct.php?product_id";

interface Result {
	id: string;
	img_product: string;
	name: string;
	price: number;
	quantity: number;
}

const fetchProduct = async (id: string): Promise<Products[]> => {
	const result = await axios.get<Result>(`${URL}=${id}`);
	const product = result.data;
	return [
		{
			id: product.id,
			imgProduct: product.img_product,
			name: product.name,
			price: product.price,
			quantity: Number(product.quantity),
		},
	];
};

export default fetchProduct;
