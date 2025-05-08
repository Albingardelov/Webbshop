import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import '../../styles/DropdownMenu.css';

const DropdownMenu = ({ isOpen, onClose, onItemClick }) => {
	const menuRef = useRef();

	useEffect(() => {
		function handleClickOutside(e) {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				onClose();
			}
		}

		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<nav className="dropdown-menu" ref={menuRef}>
			<ul>
				<li>
					<NavLink to="/category/hörlurar" onClick={onItemClick}>Hörlurar</NavLink>
				</li>
				<li>
					<NavLink to="/category/in-ear" onClick={onItemClick}>In-ear</NavLink>
				</li>
				<li>
					<NavLink to="/category/gaming" onClick={onItemClick}>Gaming</NavLink>
				</li>
				<li>
					<NavLink to="/category/tillbehör" onClick={onItemClick}>Tillbehör</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default DropdownMenu;
