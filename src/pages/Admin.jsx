import { useNavigate } from 'react-router';
import '../styles/Admin.css';
import { auth } from '../data/database';
import { signOut } from 'firebase/auth';

function Admin() {
	const navigate = useNavigate();
	return (
		<div className="admin-menu">
			<h2 className="admin-title">Adminpanel</h2>
			<button className="admin-btn" onClick={() => navigate('/admin/add')}>Lägg till produkt</button>
			<button className="admin-btn" onClick={() => navigate('/admin/edit')}>Redigera produkt</button>
			<button className="admin-btn" onClick={async () => {
				await signOut(auth);
				navigate('/');
			}}>Logga ut</button>
		</div>
	);
}

export default Admin;