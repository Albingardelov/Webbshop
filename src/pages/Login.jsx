import { useState } from 'react';
import { auth } from '../data/database';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/Login.css';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute.jsx';
import Admin from './Admin.jsx';
import { useNavigate } from 'react-router';
import { loginSchema } from '../validation/loginSchema';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firebaseError, setFirebaseError] = useState('');
	const [formErrors, setFormErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setFirebaseError('');
		setFormErrors({});

		const { error: validationError } = loginSchema.validate(
			{ email, password },
			{ abortEarly: false }
		);

		if (validationError) {
			const fieldErrors = {};
			validationError.details.forEach(err => {
				fieldErrors[err.path[0]] = err.message;
			});
			setFormErrors(fieldErrors);
			setLoading(false);
			return;
		}

		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/admin');
		} catch (err) {
			setFirebaseError('Fel e-postadress eller lösenord. Kontrollera dina uppgifter.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-bg">
			<div className="login-title">Logga in som admin för att redigera produkter.</div>
			<form className="login-form" onSubmit={handleLogin} noValidate>
				<div>
					<input
						type="email"
						placeholder="E-postadress"
						value={email}
						onChange={e => setEmail(e.target.value)}
						className="login-input"
						aria-invalid={!!formErrors.email}
					/>
					{formErrors.email && <div className="login-error input-error">{formErrors.email}</div>}
				</div>

				<div>
					<input
						type="password"
						placeholder="Lösenord"
						value={password}
						onChange={e => setPassword(e.target.value)}
						className="login-input"
						aria-invalid={!!formErrors.password}
					/>
					{formErrors.password && <div className="login-error input-error">{formErrors.password}</div>}
				</div>
				
				<button type="submit" className="login-btn" disabled={loading}>
					{loading ? 'Loggar in...' : 'Logga in'}
				</button>
				{firebaseError && <div className="login-error general-error">{firebaseError}</div>}
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