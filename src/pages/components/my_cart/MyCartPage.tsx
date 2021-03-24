import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import fetchProducts from "../../../api/fetchProducts";
import { CartContext } from "../../../context/CartContext";
import Products from "../../../model/Products";
import styles from "./MyCartPage.module.css";

interface Props {
	isActive: boolean;
}

interface CartProduct {
	products: {
		id: string;
		quantity: number;
		isSelected: boolean;
	};
}

const MyCartPage: React.FC<Props> = ({ isActive }) => {
	const [products, setProducts] = useState<Products[]>([]);
	const [cartProduct, setCartProduct] = useState<CartProduct>();
	const [productID, setProductID] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [message, setMessage] = useState("");
	const [subtotal, setSubtotal] = useState("");
	const [, dispatch] = useContext(CartContext);

	useEffect(() => {
		const prd = localStorage.getItem("user:product:cart");
		const getCartProducts = () => {
			if (prd) {
				let { products }: CartProduct = JSON.parse(prd);
				setCartProduct({ products });
				setQuantity(products.quantity);
			}
		};
		return getCartProducts();
	}, []);

	useEffect(() => {
		fetchProducts().then((products) => {
			setProducts(products);
			products
				?.filter((product) => cartProduct?.products.id === product.id)
				.map((product) => setSubtotal((quantity * product.price).toFixed(2)));
			products
				?.filter((product) => cartProduct?.products.id === product.id)
				.map((product) => setProductID(product.id));
		});
	}, [products, cartProduct, quantity]);

	const addToCart = () => {
		dispatch({ type: "ADD_PRODUCT", productID, quantity });
	};

	const removeProduct = () => {
		localStorage.removeItem("user:product:cart");
		window.location.reload(false);
	};

	return (
		<div
			className={`${styles.container} ${isActive ? `${styles.active}` : ""}`}>
			<div className={styles.top}>
				<h1>My Cart</h1>
			</div>
			<div className={styles.products}>
				{products
					?.filter((product) => cartProduct?.products.id === product.id)
					.map((product, i) => (
						<div key={i} className={styles.product}>
							<div className={styles.productImage}>
								<img src={product.imgProduct} alt="imageproduct" />
							</div>
							<div className={styles.productDetails}>
								<div className={styles.productName}>{product.name}</div>
								{message && <p style={{ color: "red" }}>{message}</p>}
								<div className={styles.productPrice}>IDR {product.price}</div>
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
									<div className={styles.actionRemove}>
										<button onClick={removeProduct}>Remove Item</button>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
			<div className={styles.bottom}>
				<h3>Cart Subtotal</h3>
				<p>{subtotal}</p>
				<Link to="/checkout">
					<button onClick={addToCart}>Process To Checkout</button>
				</Link>
			</div>
		</div>
	);
};

export { MyCartPage };
