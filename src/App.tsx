import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import styles from "./App.module.css";
import CartContextProvider from "./context/CartContext";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import Navbar from "./pages/components/Navbar";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/product/[id]";
import ShopPage from "./pages/shop/ShopPage";

const App: React.FC = () => {
	return (
		<CartContextProvider>
			<Router>
				<Navbar />
				<ul className={styles.navbar}>
					<Link to="/">
						<li className={styles.navbarItem}>Home</li>
					</Link>
					<Link to="/shop">
						<li className={styles.navbarItem}>Shop</li>
					</Link>
				</ul>
				<Switch>
					<Route path="/product/:id" component={ProductPage} />
					<Route path="/shop" component={ShopPage}></Route>
					<Route path="/checkout" component={CheckoutPage}></Route>
					<Route path="/" component={HomePage}></Route>
				</Switch>
			</Router>
		</CartContextProvider>
	);
};

export default App;
