import '../../styles/Footer.css';
import mastercard from '../../assets/mastercardLogo.svg';
import visa from '../../assets/visaLogo.svg';
import ups from '../../assets/upsLogo.svg';
import facebook from '../../assets/facebookLogo.svg';
import youtube from '../../assets/youtubeLogo.svg';
import instagram from '../../assets/instagramLogo.svg';
import { NavLink } from 'react-router';
// You can add your own SVGs for social icons in the assets folder

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-payment-title">Payment options:</div>
          <div className="footer-payments">
            <img src={mastercard} alt="Mastercard" className="footer-icon" />
            <img src={visa} alt="Visa" className="footer-icon" />
          </div>
          <div className="footer-shipping-title">Fraktalternativ:</div>
          <div className="footer-shipping">
            <img src={ups} alt="UPS" className="footer-icon" />
          </div>
        </div>
        <div className="footer-admin">
          <NavLink to="/login">Admin inlogg</NavLink>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-company-info">
          © 2025 [Ljudzon AB]. Samtliga rättigheter förbehållna.<br />
          Organisationsnummer: 123456-7890 | E-post: kundservice@ljudzon.se<br />
          <a href="/integritetspolicy">Integritetspolicy</a> | <a href="/kopvillkor">Köpvillkor</a>
        </div>
        <div className="footer-socials">
          <a href="#" aria-label="Facebook"><img src={facebook} alt="Facebook" className="footer-icon" /></a>
          <a href="#" aria-label="YouTube"><img src={youtube} alt="YouTube" className="footer-icon" /></a>
          <a href="#" aria-label="Instagram"><img src={instagram} alt="Instagram" className="footer-icon" /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 