import { Outlet } from 'react-router';
import Header from './components/Header/Header';

function App() {
	return (
		<div className="app">
			<Header
				logoSrc="/logo.svg"
				onMenuClick={() => console.log('Meny öppnas')}
				onCartClick={() => console.log('Kundvagn öppnas')}
			/>

			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default App;
