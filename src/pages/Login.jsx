import { useState } from 'react';
import { auth } from '../data/database';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/Login.css';
import PrivateRoute from '../components/PrivateRoute.jsx';
import Admin from './Admin.jsx';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			// Navigera till admin-sidan, t.ex. window.location.hash = '#/admin';
			window.location.hash = '#/admin';
		} catch (err) {
			setError('Fel e-post eller lösenord');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-bg">
			<div className="login-title">Logga in som admin för att redigera produkter.</div>
			<form className="login-form" onSubmit={handleLogin}>
				<input
					type="email"
					placeholder="Användarnamn"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Lösenord"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
				<button type="submit" className="login-btn" disabled={loading}>
					{loading ? 'Loggar in...' : 'Logga in'}
				</button>
				{error && <div className="login-error">{error}</div>}
			</form>
		</div>
	);
}

function AdminProtected() {
	return (
		<PrivateRoute>
			<Admin />
		</PrivateRoute>
	);
}

export default Login;
export { AdminProtected };