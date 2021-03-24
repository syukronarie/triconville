import { Link } from "react-router-dom";

import HomeCarousel from "./components/HomeCarousel";
import styles from "./components/HomePage.module.css";

const HomePage: React.FC = () => {
	return (
		<>
			<HomeCarousel />
			<div className={styles.container}>
				<h1>Welcome to Dezign Distict</h1>
				<p>
					You can buy best furniture, to go shopping now,{" "}
					<Link to="/shop"> click here </Link>
				</p>
			</div>
		</>
	);
};

export default HomePage;
