import { NavLink } from 'react-router';
import ProductSearchLogic from '../SearchLogic/ProductSearchLogic';
import '../../styles/Header.css'; 

function ProductSearchResults({ query, onResultClick }) {
  return (
    <ProductSearchLogic query={query}>
      {({ results, loading }) => (
        <div className="search-dropdown-results"> {/* Consider a more specific class name */}
          {loading && <div className="search-loading">Söker...</div>}
          {!loading && results.length === 0 && <div className="search-no-results">Inga träffar</div>}
          <ul className="search-results-list">
            {results.map(result => (
              <li key={result.id} className="search-result-item">
                {result.isCategory ? (
                  <NavLink 
                    to={result.link} 
                    style={{ fontWeight: 'bold' }} 
                    onClick={onResultClick}
                  >
                    {result.name}
                  </NavLink>
                ) : (
                  <NavLink 
                    to={`/product/${result.id}`}
                    onClick={onResultClick}
                  >
                    {result.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </ProductSearchLogic>
  );
}

export default ProductSearchResults; 