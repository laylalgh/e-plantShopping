import { useEffect, useState } from 'react';
import AboutUs from './AboutUs';
import CartItem from './CartItem';
import ProductList, { ShopNav } from './ProductList';
import './App.css';

function getPage() {
  const page = window.location.hash.slice(1);
  return ['plants', 'cart'].includes(page) ? page : 'home';
}

export default function App() {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    function onPageChange() {
      setPage(getPage());
      window.scrollTo(0, 0);
    }
    window.addEventListener('hashchange', onPageChange);
    return () => window.removeEventListener('hashchange', onPageChange);
  }, []);

  if (page === 'home') {
    return (
      <main className="landing-page" id="home">
        <div className="landing-content">
          <h1>Paradise Nursery</h1>
          <AboutUs />
          <button type="button" className="primary-link" onClick={() => { window.location.hash = "plants"; }}>Get Started</button>
        </div>
      </main>
    );
  }

  return (
    <>
      <ShopNav />
      {page === 'plants' ? <ProductList /> : <CartItem />}
    </>
  );
}
