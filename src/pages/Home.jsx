import '../styles/Home.css';
import { NavLink } from 'react-router';
import featuredImg from '../assets/auralisLogo.svg';
import headsetLogo from '../assets/headsetLogo.svg';
import inEarsLogo from '../assets/in-earsLogo.svg';
import gamingLogo from '../assets/gamingLogo.svg';
import tillbehorLogo from '../assets/tillbehörLogo.svg';

function Home() {
	return (
		<div className="home">
			{/* Featured product */}
			<section className="featured-product">
				<div className="featured-left">
					<div className="featured-title">Headset för dig<br />som hör skillnaden.</div>
					<div className="featured-brand-img">
						<div className="featured-brand">Auralis</div>
						<img src={featuredImg} alt="Auralis headset" className="featured-img" />
					</div>
					<button className="featured-btn">
						Läs mer <span className="arrow">→</span>
					</button>
				</div>
			</section>

			{/* Category grid */}
			<section className="category-grid">
				<div className="category-card">
					<NavLink to="/category/hörlurar">
						<img src={headsetLogo} alt="Hörlurar" />
						<span>Hörlurar</span>
					</NavLink>
				</div>
				<div className="category-card">
					<NavLink to="/category/in-ear">
						<img src={inEarsLogo} alt="In-Ear" />
						<span>In-Ear</span>
					</NavLink>
				</div>
				<div className="category-card">
					<NavLink to="/category/gaming">
						<img src={gamingLogo} alt="Gaming" />
						<span>Gaming</span>
					</NavLink>
				</div>
				<div className="category-card">
					<NavLink to="/category/accessories">
						<img src={tillbehorLogo} alt="Tillbehör" />
						<span>Tillbehör</span>
					</NavLink>
				</div>
			</section>
		</div>
	);
}

export default Home;