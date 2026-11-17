
import { useMemo, useState } from "react";

const products = [
  {
    id: 1,
    name: "Elegant Summer Dress",
    category: "Dresses",
    gender: "Women",
    price: 45000,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700",
  },
  {
    id: 2,
    name: "Women's Fashion Outfit",
    category: "Dresses",
    gender: "Women",
    price: 55000,
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700",
  },
  {
    id: 3,
    name: "Men's Smart Suit",
    category: "Suits",
    gender: "Men",
    price: 120000,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=700",
  },
  {
    id: 4,
    name: "Women's Stylish Blazer",
    category: "Jackets",
    gender: "Women",
    price: 65000,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=700",
  },
  {
    id: 5,
    name: "Men's Casual Shirt",
    category: "Shirts",
    gender: "Men",
    price: 30000,
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=700",
  },
  {
    id: 6,
    name: "Women's Summer Outfit",
    category: "Dresses",
    gender: "Women",
    price: 50000,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700",
  },
  {
    id: 7,
    name: "Men's Casual Jacket",
    category: "Jackets",
    gender: "Men",
    price: 75000,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700",
  },
  {
    id: 8,
    name: "Women's Fashion Collection",
    category: "Dresses",
    gender: "Women",
    price: 60000,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700",
  },
  {
    id: 9,
    name: "Men's White Shirt",
    category: "Shirts",
    gender: "Men",
    price: 32000,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=700",
  },
  {
    id: 10,
    name: "Women's Elegant Outfit",
    category: "Dresses",
    gender: "Women",
    price: 58000,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=700",
  },
  {
    id: 11,
    name: "Men's Denim Jeans",
    category: "Trousers",
    gender: "Men",
    price: 42000,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=700",
  },
  {
    id: 12,
    name: "Women's Sweater",
    category: "Sweaters",
    gender: "Women",
    price: 40000,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=700",
  },
];

const categories = [
  {
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
  },
  {
    name: "Shirts",
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=600",
  },
  {
    name: "Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
  },
  {
    name: "Trousers",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
  },
];

function App() {
  const [category, setCategory] = useState("All");
  const [gender, setGender] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-RW").format(price) + " RWF";

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesGender =
        gender === "All" || product.gender === gender;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesGender && matchesSearch;
    });
  }, [category, gender, search]);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setCartOpen(true);
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function orderWhatsApp() {
    if (cart.length === 0) return;

    const order = cart
      .map(
        (item) =>
          `${item.name} x ${item.quantity} - ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("\n");

    const message =
      `Hello AINE FASHION!\n\nI want to order:\n${order}\n\nTotal: ${formatPrice(total)}\n\nPlease help me complete my order.`;

    window.open(
      `https://wa.me/250792955154?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  function showCategory(name) {
    setCategory(name);
    setGender("All");
    document.getElementById("shop")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <div className="store">
      <div className="announcement">
        NEW COLLECTION AVAILABLE NOW — DISCOVER YOUR STYLE
      </div>

      <header className="navbar">
        <a href="#home" className="logo">
          AINE<span>FASHION.</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#collections">Collections</a>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <button
          className="cart-icon"
          onClick={() => setCartOpen(true)}
        >
          Bag ({itemCount})
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-text">
            <span className="eyebrow">THE NEW SEASON COLLECTION</span>

            <h1>
              Fashion that
              <br />
              speaks <i>your style.</i>
            </h1>

            <p>
              Discover timeless fashion and beautiful outfits
              designed to make every moment special.
            </p>

            <a href="#shop" className="dark-button">
              SHOP COLLECTION →
            </a>
          </div>

          <div className="hero-photo">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200"
              alt="Men and women wearing fashionable clothes"
            />

            <div className="photo-caption">
              <span>STYLE YOUR WAY</span>
              <strong>NEW ARRIVALS</strong>
            </div>
          </div>
        </section>

        <section className="intro-strip">
          <span>TIMELESS STYLE</span>
          <span>QUALITY FASHION</span>
          <span>MEN & WOMEN</span>
          <span>MADE FOR YOU</span>
        </section>

        <section className="collections" id="collections">
          <div className="section-title">
            <span className="eyebrow">FIND YOUR FAVORITE</span>
            <h2>Shop by collection</h2>
            <p>Explore clothing for every style and occasion.</p>
          </div>

          <div className="category-grid">
            {categories.map((item) => (
              <button
                className="category-card"
                key={item.name}
                onClick={() => showCategory(item.name)}
              >
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
                <b>EXPLORE →</b>
              </button>
            ))}
          </div>
        </section>

        <section className="shop" id="shop">
          <div className="section-title">
            <span className="eyebrow">CURATED FOR YOU</span>
            <h2>Our Clothing Collection</h2>
            <p>Discover your next favorite outfit.</p>
          </div>

          <input
            className="search"
            type="search"
            placeholder="Search for dresses, shirts, jackets..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="filter-row">
            <div className="gender-filter">
              {["All", "Women", "Men"].map((value) => (
                <button
                  key={value}
                  className={gender === value ? "active" : ""}
                  onClick={() => setGender(value)}
                >
                  {value}
                </button>
              ))}
            </div>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {[
                "All",
                "Dresses",
                "Shirts",
                "Jackets",
                "Suits",
                "Trousers",
                "Sweaters",
              ].map((value) => (
                <option key={value} value={value}>
                  {value === "All" ? "All categories" : value}
                </option>
              ))}
            </select>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span>{product.gender}</span>
                </div>

                <div className="product-details">
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>

                  <div className="product-bottom">
                    <strong>{formatPrice(product.price)}</strong>

                    <button onClick={() => addToCart(product)}>
                      + Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="empty">
              No clothes found. Try another search.
            </p>
          )}
        </section>

        <section className="fashion-banner">
          <div>
            <span className="eyebrow">AINE FASHION</span>

            <h2>
              Simple pieces.
              <br />
              Beautiful <i>looks.</i>
            </h2>

            <p>Build a wardrobe that represents you.</p>

            <a href="#shop" className="light-button">
              DISCOVER MORE →
            </a>
          </div>
        </section>

        <section className="about" id="about">
          <span className="eyebrow">OUR STORY</span>
          <h2>Welcome to AINE FASHION</h2>

          <p>
            We believe fashion is more than what you wear.
            It is a way to express your personality, confidence
            and individuality. Discover stylish clothing for
            men and women at AINE FASHION.
          </p>
        </section>
      </main>

      {cartOpen && (
        <div className="cart-panel">
          <div className="cart-heading">
            <h2>Your Shopping Bag</h2>
            <button onClick={() => setCartOpen(false)}>✕</button>
          </div>

          {cart.length === 0 ? (
            <p>Your shopping bag is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div>
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <strong>
                      {formatPrice(item.price * item.quantity)}
                    </strong>
                  </div>

                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}

              <h3 className="total">
                Total: {formatPrice(total)}
              </h3>

              <button className="checkout" onClick={orderWhatsApp}>
                ORDER ON WHATSAPP
              </button>
            </>
          )}
        </div>
      )}

      <footer id="contact">
        <div className="footer-grid">
          <div>
            <a href="#home" className="logo footer-logo">
              AINE<span>FASHION.</span>
            </a>
            <p>Fashion made beautiful. Style made personal.</p>
          </div>

          <div>
            <h3>Explore</h3>
            <a href="#home">Home</a>
            <a href="#collections">Collections</a>
            <a href="#shop">Shop</a>
          </div>

          <div>
            <h3>Contact</h3>
            <p>Gisozi, Gasabo, Kigali, Rwanda</p>
            <p>+250 792 955 154</p>
            <p>ainemutuyeyezu@gmail.com</p>
            <a href="https://wa.me/250792955154">
              WhatsApp us →
            </a>
          </div>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} AINE FASHION. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
