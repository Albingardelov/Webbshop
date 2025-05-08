import { useState, useRef, useEffect } from 'react';
import '../../styles/Header.css';
import menuIcon from '../../assets/menuIcon.svg';
import cartIcon from '../../assets/cartIcon.svg';
import searchIcon from '../../assets/searchIcon.svg';
import logo from '../../assets/Logo.svg';
import { NavLink } from 'react-router';

function Header({ onCartClick }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const headerRef = useRef();

	useEffect(() => {
		function handleClickOutside(e) {
			if (headerRef.current && !headerRef.current.contains(e.target)) {
				setIsMenuOpen(false);
			}
		}

		if (isMenuOpen) {
			document.addEventListener('click', handleClickOutside);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isMenuOpen]);

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
					<img src={logo} alt="Ljudzon logotyp" />
				</div>

				<button
					className="cart-btn"
					aria-label="Kundvagn"
					onClick={onCartClick}
				>
					<img src={cartIcon} alt="Kundvagnsikon" />
				</button>
			</div>

			<form className="search-bar">
				<input type="text" placeholder="Vad söker du?" aria-label="Sök" />
				<button type="submit" aria-label="Sök">
					<img src={searchIcon} alt="Sök" />
				</button>
			</form>

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
						<NavLink to="/category/tillbehör" onClick={() => setIsMenuOpen(false)}>Tillbehör</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
