import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchProduct from "../../api/fetchProduct";
import { CartContext } from "../../context/CartContext";
import Products from "../../model/Products";
// import { Link } from "react-router-dom";
import styles from "./components/Product.module.css";

export interface ProductId {
	id: string;
}

const ProductPage: React.FC = () => {
	const { id } = useParams<ProductId>();
	const [product, setProduct] = useState<Products[]>([]);
	const [, dispatch] = useContext(CartContext);
	const [quantity, setQuantity] = useState(1);
	const [productID, setProductID] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		const getProduct = () =>
			fetchProduct(id).then((prd) => {
				setProduct(prd);
				setProductID(prd[0].id);
			});
		getProduct();
	}, [id]);

	const addToCart = () => {
		dispatch({ type: "ADD_PRODUCT", productID, quantity });
		window.location.reload(false);
	};

	return (
		<div className={styles.container}>
			<h1>Product</h1>
			{product.map((product) => (
				<div className={styles.content} key={product.id}>
					<div className={styles.productImage}>
						<img src={product.imgProduct} alt="product_image" />
					</div>
					<div className={styles.productDetails}>
						<div className={styles.productName}>{product.name}</div>
						<div className={styles.productPrice}>IDR {product.price}</div>
						<div className={styles.productQuantity}>
							Stock {product.quantity}
						</div>
						{message && <p style={{ color: "red" }}>{message}</p>}
						<div className={styles.actions}>
							<div className={styles.actionQuantity}>
								<button
									onClick={() => {
										if (quantity === 1) {
											setMessage(`Your quantity product minimum 1`);
										} else setQuantity(quantity - 1);
									}}>
									-
								</button>
								<input readOnly type="number" value={quantity} />
								<button
									onClick={() => {
										if (quantity === product.quantity) {
											setQuantity(product.quantity);
											setMessage(
												`Your quantity product can't up limit of ${product.quantity} `
											);
										} else setQuantity(quantity + 1);
									}}>
									+
								</button>
							</div>
							<div className={styles.actionCart}>
								<button onClick={addToCart}>Add To Cart</button>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProductPage;
