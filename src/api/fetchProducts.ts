import axios from "axios";
import Products from "../model/Products";

const URL = "https://designerportal.net/testreact/listProducts.php";

interface Result {
	id: string;
	img_product: string;
	name: string;
	price: number;
	quantity: number;
}

const fetchProducts = async (): Promise<Products[]> => {
	const result = await axios.get<Result[]>(URL);
	const products = result.data.map((product) => ({
		id: product.id,
		imgProduct: product.img_product,
		name: product.name,
		price: product.price,
		quantity: Number(product.quantity),
	}));
	return products;
};

export default fetchProducts;
