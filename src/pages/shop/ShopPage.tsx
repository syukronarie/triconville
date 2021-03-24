import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import fetchProducts from "../../api/fetchProducts";
import Products from "../../model/Products";
import styles from "./components/ShopPage.module.css";

const ShopPage: React.FC = () => {
	const [products, setProducts] = useState<Products[]>([]);

	useEffect(() => {
		fetchProducts().then((products) => {
			setProducts(products);
		});
	}, [products]);

	return (
		<div>
			<h1 style={{ textAlign: "center", margin: "7rem 0 1rem" }}>
				Our Best Products
			</h1>
			<div className={styles.products}>
				{products.map((product) => (
					<Link to={`product/${product.id}`} key={product.id}>
						<div className={styles.product}>
							<img
								className={styles.productImage}
								src={product.imgProduct}
								alt="product_image"
							/>
							<div className={styles.productName}>{product.name}</div>
							<div className={styles.productPrice}>IDR {product.price}</div>
							{/* <div className={styles.productQuantity}>{product.quantity}</div> */}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ShopPage;
