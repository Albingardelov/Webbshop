import { useState, useRef, useEffect } from 'react';
import '../../styles/Header.css';
import menuIcon from '../../assets/menuIcon.svg';
import searchIcon from '../../assets/searchIcon.svg';
import logo from '../../assets/Logo.svg';
import { NavLink } from 'react-router';
import ProductSearchLogic from '../SearchLogic/ProductSearchLogic';
import CartCounterBadge from '../CartCounterBadge/CartCounterBadge';

function Header({ onCartClick }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchActive, setSearchActive] = useState(false);
	const headerRef = useRef();
	const searchRef = useRef();

	useEffect(() => {
		function handleClickOutside(e) {
			if (headerRef.current && !headerRef.current.contains(e.target)) {
				setIsMenuOpen(false);
				setSearchActive(false);
			}
		}

		if (isMenuOpen || searchActive) {
			document.addEventListener('click', handleClickOutside);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isMenuOpen, searchActive]);

	return (
		<header className="site-header" ref={headerRef}>
			<div className="top-bar">
				<div className="menu-wrapper">
					<button
						className="menu-btn"
						aria-label="Meny"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<img src={menuIcon} alt="Menyikon" />
					</button>
				</div>

				<div className="logo">
					<NavLink to="/">
						<img src={logo} alt="Ljudzon logotyp" />
					</NavLink>
				</div>

				<NavLink to="/cart" className="cart-btn" aria-label="Kundvagn">
					<CartCounterBadge />
				</NavLink>
			</div>

			<div style={{ position: 'relative' }}>
				<form className="search-bar" onSubmit={e => e.preventDefault()} ref={searchRef} autoComplete="off">
					<input
						type="text"
						placeholder="Vad söker du?"
						aria-label="Sök"
						value={searchQuery}
						onChange={e => {
							setSearchQuery(e.target.value);
							setSearchActive(!!e.target.value);
						}}
						onFocus={() => setSearchActive(!!searchQuery)}
					/>
					<button type="submit" aria-label="Sök">
						<img src={searchIcon} alt="Sök" />
					</button>
				</form>
				{searchActive && searchQuery && (
					<div className="search-dropdown">
						<ProductSearchLogic query={searchQuery}>
							{({ results, loading }) => (
								<div>
									{loading && <div className="search-loading">Söker...</div>}
									{!loading && results.length === 0 && <div className="search-no-results">Inga träffar</div>}
									<ul className="search-results-list">
										{results.map(result => (
											<li key={result.id} className="search-result-item">
												{result.isCategory ? (
													<NavLink to={result.link} style={{ fontWeight: 'bold' }} onClick={() => setSearchActive(false)}>
														{/* Du kan lägga till en ikon här om du vill, t.ex. 📂 */}
														{result.name}
													</NavLink>
												) : (
													<NavLink to={`/product/${result.id}`}>{result.name}</NavLink>
												)}
											</li>
										))}
									</ul>
								</div>
							)}
						</ProductSearchLogic>
					</div>
				)}
			</div>

			<nav className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
				<ul>
					<li>
						<NavLink to="/category/hörlurar" onClick={() => setIsMenuOpen(false)}>Hörlurar</NavLink>
					</li>
					<li>
						<NavLink to="/category/in-ear" onClick={() => setIsMenuOpen(false)}>In-ear</NavLink>
					</li>
					<li>
						<NavLink to="/category/gaming" onClick={() => setIsMenuOpen(false)}>Gaming</NavLink>
					</li>
					<li>
						<NavLink to="/category/accessories" onClick={() => setIsMenuOpen(false)}>Tillbehör</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
