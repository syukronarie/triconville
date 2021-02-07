import { Helmet } from "react-helmet";
import { useState } from "react";
import Slider, { Settings } from "react-slick";
import styles from "./HomeCarousel.module.css";

interface Banner {
	id: number;
	image: string;
}

const HomeCarousel: React.FC = () => {
	const [activeSlide, setActiveSlide] = useState(0);
	const banners = [
		{ id: 1, image: "/banner-2.jpg" },
		{ id: 2, image: "/banner-3.jpg" },
		{ id: 3, image: "/banner-4.jpg" },
		{ id: 4, image: "/banner-5.jpg" },
	];

	const BannerListItem: React.FC<{ banner: Banner }> = ({ banner }) => {
		return (
			<img
				src={banner.image}
				className={styles.bannerImage}
				loading="eager"
				alt="banner"
			/>
		);
	};

	const settings: Settings = {
		autoplay: true,
		dots: true,
		infinite: true,
		speed: 500,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		slidesToScroll: 1,
		swipeToSlide: true,
		arrows: false,
		pauseOnHover: true,
		pauseOnDotsHover: true,
		dotsClass: `slick-dots slick-thumbs ${styles.dots}`,
		className: styles.carouselContainer,
		customPaging: (i: number) => (
			<div className={i === activeSlide ? styles.dotActive : styles.dot}></div>
		),
		afterChange: (currentSlide: number) => setActiveSlide(currentSlide),
	};

	return (
		<div className={styles.container}>
			<Helmet>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
				/>
			</Helmet>
			<Slider {...settings}>
				{banners.map((banner) => (
					<BannerListItem key={banner.id} banner={banner} />
				))}
			</Slider>
		</div>
	);
};

export default HomeCarousel;
