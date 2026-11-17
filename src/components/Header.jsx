
import { useState } from "react";

import {
  Search,
  ShoppingBag,
  Menu,
  X
} from "lucide-react";

export default function Header({
  cartCount,
  search,
  setSearch,
  onCart
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">

      <div className="topline">
        A little something good, delivered to you ✨
      </div>

      <div className="header-inner">

        <button
          className="mobile-menu icon-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <a className="brand" href="#">
          <span className="brand-mark">a.</span>
          <span>
            Aline's
            <span className="brand-light">Market</span>
          </span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#shop" onClick={() => setMenuOpen(false)}>
            Shop
          </a>

          <a href="#why-us" onClick={() => setMenuOpen(false)}>
            Why us
          </a>

          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>

        <label className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <button className="cart-button" onClick={onCart}>
          <ShoppingBag size={19} />
          <span className="cart-label">Cart</span>
          <span className="cart-count">{cartCount}</span>
        </button>

      </div>
    </header>
  );
}
