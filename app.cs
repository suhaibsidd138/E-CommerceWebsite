/* App.css */
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
  @media (max-width: 768px) {
    .header {
      flex-direction: column;
    }
    .product-card {
      width: 100%;
    }
  }
