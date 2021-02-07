import { Link } from "react-router-dom";
import styles from "./components/HomePage.module.css";
import HomeCarousel from "./components/HomeCarousel";

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
