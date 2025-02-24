import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import ProductCard from './components/ProductCard/ProductCard';
import ProductModal from './components/ProductModal/ProductModal';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch initial data
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // Handle category search
  const handleCategorySearch = async (category) => {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await res.json();
    setProducts(data);
  };

  return (
    <div className="App">
      <Header 
        categories={categories} 
        cartCount={cartCount} 
        onSearch={handleCategorySearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => setCartCount(prev => prev + 1)}
        />
      )}
    </div>
  );
}

export default App;
const Header = ({ categories, cartCount, onSearch, searchTerm, setSearchTerm }) => {
    return (
      <header className="header">
        <h1>My Store</h1>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="category-dropdown">
            {categories
              .filter(cat => cat.includes(searchTerm.toLowerCase()))
              .map(cat => (
                <button key={cat} onClick={() => onSearch(cat)}>
                  {cat}
                </button>
              ))}
          </div>
        </div>
  
        <div className="cart">
          🛒 <span className="count">{cartCount}</span>
        </div>
      </header>
    );
  };
  const ProductCard = ({ product, onClick }) => {
    return (
      <div className="product-card" onClick={onClick}>
        <img src={product.image} alt={product.title} />
        <h3>{product.title.slice(0, 50)}...</h3>
        <p>${product.price}</p>
      </div>
    );
  };
  import { useState, useEffect } from 'react';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [fullProduct, setFullProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${product.id}`)
      .then(res => res.json())
      .then(data => setFullProduct(data));
  }, [product.id]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        {fullProduct && (
          <>
            <img src={fullProduct.image} alt={fullProduct.title} />
            <h2>{fullProduct.title}</h2>
            <p>{fullProduct.description}</p>
            <p>${fullProduct.price}</p>
            <button 
              className="add-to-cart"
              onClick={() => {
                onAddToCart();
                onClose();
              }}
            >
              Add to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};
// Add error boundaries or try/catch in production
useEffect(() => {
    fetch(...).catch(error => console.error('API Error:', error));
  }, []);
