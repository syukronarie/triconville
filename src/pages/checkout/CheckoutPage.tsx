import { useEffect, useState } from "react";

import buyNow, { Orderlines } from "../../api/buyNow";
import fetchProduct from "../../api/fetchProduct";
import Products from "../../model/Products";
import styles from "./components/Checkout.module.css";

export interface ProductId {
	id: string;
}

const CheckoutPage: React.FC = () => {
	const [product, setProduct] = useState<Products[]>([]);
	const [quantity, setQuantity] = useState(1);
	const [productID, setProductID] = useState(0);
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [message, setMessage] = useState("");
	const [subtotal, setSubtotal] = useState(0);
	const [orderlines, setOrderlines] = useState<Orderlines[]>([
		{
			product_id: 0,
			qty_order: 0,
			subtotal: 0,
		},
	]);

	useEffect(() => {
		const prd = localStorage.getItem("user:product:cart");
		const getCartProducts = () => {
			if (prd) {
				let result = JSON.parse(prd);
				setQuantity(result.products.quantity);
				fetchProduct(result.products.id).then((prd) => {
					setProduct(prd);
					setProductID(Number(prd[0].id));
					setSubtotal(prd[0].price * result.products.quantity);
				});
			}
		};
		getCartProducts();
	}, []);

	useEffect(() => {
		let Ol: Orderlines = {
			product_id: productID,
			qty_order: quantity,
			subtotal: subtotal,
		};
		setOrderlines([Ol]);
	}, [productID, quantity, subtotal]);

	const buyProduct = () => {
		if (email.length === 0) {
			setMessage("Please fill your email");
		} else if (firstName.length === 0) {
			setMessage("Please fill your first name");
		} else if (lastName.length === 0) {
			setMessage("Please fill your last name");
		} else if (orderlines) buyNow(email, firstName, lastName, orderlines);
		window.alert("Success Buying Your Order.. Thank You");
		localStorage.removeItem("user:product:cart");
		window.location.reload(false);
		window.location.replace("/");
	};

	return (
		<div className={styles.container}>
			<h1>Checkout</h1>
			{message && <p style={{ color: "red" }}>{message}</p>}
			<div className={styles.content}>
				<div className={styles.leftSide}>
					<div className={styles.form}>
						<div>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								id="email"
								onChange={(e) => setEmail(e.target.value)}
								className={styles.input}
								required
							/>
						</div>
						<div>
							<label htmlFor="firstName">First Name</label>
							<input
								type="text"
								name="firstName"
								id="firstName"
								onChange={(e) => setFirstName(e.target.value)}
								className={styles.input}
								required
							/>
						</div>
						<div>
							<label htmlFor="lastName">Last Name</label>
							<input
								type="text"
								name="lastName"
								id="lastName"
								onChange={(e) => setLastName(e.target.value)}
								className={styles.input}
								required
							/>
						</div>
						<div>
							<button onClick={buyProduct} className={styles.button}>
								Buy Now
							</button>
						</div>
					</div>
				</div>
				{product.map((product, i) => (
					<div className={styles.rightSide} key={i}>
						<h3>Summary</h3>
						<div className={styles.rightSideContent}>
							<div className={styles.productImage}>
								<img src={product.imgProduct} alt="product_image" />
							</div>
							<div className={styles.productDetails}>
								<div className={styles.productName}>{product.name}</div>
								<div className={styles.productPrice}>
									IDR {(product.price * quantity).toFixed(2)}
								</div>
								<div className={styles.productQuantity}>Qty {quantity}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CheckoutPage;
