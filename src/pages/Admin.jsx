import { useNavigate } from 'react-router';
import '../styles/Admin.css';

function Admin() {
	const navigate = useNavigate();
	return (
		<div className="admin-menu">
			<h2>Adminpanel</h2>
			<button className="admin-btn" onClick={() => navigate('/admin/add')}>Lägg till produkt</button>
			<button className="admin-btn" onClick={() => navigate('/admin/edit')}>Redigera produkt</button>
		</div>
	);
}

export default Admin;