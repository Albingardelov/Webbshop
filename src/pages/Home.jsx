import '../styles/Home.css';
import { NavLink } from 'react-router';
import headsetLogo from '../assets/headsetLogo.svg';
import inEarsLogo from '../assets/in-earsLogo.svg';
import gamingLogo from '../assets/gamingLogo.svg';
import tillbehorLogo from '../assets/tillbehörLogo.svg';

function Home() {
	return (
		<div className="home">
			<section className="featured-product">
				<div className="featured-left">
					<div className="home-description">
						<h1>Välkommen till Ljudzon</h1>
						<p className="home-desc-desktop">
							Ljudzon är din expert på ljudupplevelser. Vi brinner för att leverera högkvalitativa hörlurar, tillbehör och ljudprodukter till både entusiaster och vardagsanvändare. Hos oss hittar du noggrant utvalda produkter, personlig service och en passion för ljud i världsklass. Oavsett om du söker det senaste inom teknik eller tidlösa klassiker, är vårt mål att du alltid ska få den bästa ljudupplevelsen – varje dag.
						</p>
						<p className="home-desc-mobile">
							Ljudzon – din butik för hörlurar och ljudtillbehör med kvalitet och service i fokus.
						</p>
					</div>
				</div>
			</section>
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