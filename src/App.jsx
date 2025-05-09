import { Outlet } from 'react-router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
	return (
		<div className="app">
			<Header
				logoSrc="/logo.svg"
			/>

			<main>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}

export default App;
