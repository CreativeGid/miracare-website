"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroSlide {
  tag: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  ctaSecondary: string;
  bg: string;
}

interface Product {
  id: number;
  name: string;
  sub: string;
  price: string;
  category: "shampoo" | "treatment" | "serum";
  badge?: string;
  badgeStyle?: React.CSSProperties;
  svgBg: string;
  svgContent: React.ReactNode;
}

interface Testimonial {
  initials: string;
  name: string;
  product: string;
  quote: string;
  stars: number;
  featured?: boolean;
}

interface Ingredient {
  num: string;
  name: string;
  description: string;
}

interface EcoStat {
  value: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const HERO_SLIDES: HeroSlide[] = [
  {
    tag: "New Collection 2025",
    titleLine1: "Nourish",
    titleLine2: "Your Roots",
    subtitle:
      "Science-backed formulas infused with ancient botanicals — for hair that feels as alive as you are.",
    ctaSecondary: "Our Story",
    bg: "url('https://plus.unsplash.com/premium_photo-1730043340445-03f79a9e9971?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center / cover no-repeat",
  },
  {
    tag: "Bestseller Collection",
    titleLine1: "Restore",
    titleLine2: "Your Shine",
    subtitle:
      "From scalp to tip — every strand deserves the ritual of pure, plant-derived care.",
    ctaSecondary: "Learn More",
    bg: "url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center / cover no-repeat",
  },
  {
    tag: "Sustainable Ritual",
    titleLine1: "Daily",
    titleLine2: "Rituals",
    subtitle:
      "Elevate your hair care with products that honour your strands and the earth beneath your feet.",
    ctaSecondary: "Get Updates",
    bg: "url('https://i.pinimg.com/736x/83/43/c2/8343c200bce0796d43f4baf4a064928e.jpg') center / cover no-repeat",
  },
];

const MARQUEE_ITEMS = [
  "Sulphate-Free Formula",
  "Cruelty-Free Certified",
  "Vegan Ingredients",
  "Eco-Friendly Packaging",
  "Dermatologist Tested",
  "Free Shipping Over $60",
];

const FEATURES = [
  { icon: "🌿", title: "Natural Formula", desc: "Plant-powered, free from harsh synthetics" },
  { icon: "🐰", title: "Cruelty-Free", desc: "Never tested on animals, ever" },
  { icon: "🔬", title: "Lab-Verified", desc: "Dermatologist tested & approved" },
  { icon: "📦", title: "Free Shipping", desc: "Worldwide on orders over $60" },
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Repair Ritual Shampoo",
    sub: "Shampoos · 300ml",
    price: "$34",
    category: "shampoo",
    badge: "Best Seller",
    svgBg: "linear-gradient(145deg,#D9C9AD,#EFE6D5)",
    svgContent: (
      <svg width="120" height="200" viewBox="0 0 120 200">
        <rect x="40" y="20" width="40" height="160" rx="8" fill="#8B6F47" opacity="0.8" />
        <rect x="44" y="10" width="32" height="18" rx="4" fill="#4A3728" />
        <rect x="46" y="70" width="28" height="2" rx="1" fill="#D9C9AD" opacity="0.6" />
        <text x="60" y="115" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="9" fill="#F9F5EE" opacity="0.9">LUMINAE</text>
        <text x="60" y="127" textAnchor="middle" fontFamily="DM Sans" fontSize="7" fill="#D9C9AD" opacity="0.7">REPAIR SHAMPOO</text>
      </svg>
    ),
  },
  {
    id: 2,
    name: "Deep Restore Mask",
    sub: "Treatments · 250ml",
    price: "$48",
    category: "treatment",
    svgBg: "linear-gradient(145deg,rgba(122,140,106,0.13),#EFE6D5)",
    svgContent: (
      <svg width="120" height="200" viewBox="0 0 120 200">
        <ellipse cx="60" cy="150" rx="30" ry="36" fill="#7A8C6A" opacity="0.75" />
        <rect x="48" y="40" width="24" height="118" rx="12" fill="#4A6A4A" opacity="0.7" />
        <rect x="52" y="28" width="16" height="18" rx="4" fill="#3D5433" />
        <text x="60" y="130" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="8" fill="#F9F5EE" opacity="0.9">LUMINAE</text>
        <text x="60" y="142" textAnchor="middle" fontFamily="DM Sans" fontSize="6" fill="#EFE6D5" opacity="0.7">DEEP MASK</text>
      </svg>
    ),
  },
  {
    id: 3,
    name: "Scalp Revival Serum",
    sub: "Serums · 50ml",
    price: "$62",
    category: "serum",
    badge: "New",
    badgeStyle: { background: "#4A3728", color: "#D9C9AD" },
    svgBg: "linear-gradient(145deg,rgba(196,162,101,0.13),#EFE6D5)",
    svgContent: (
      <svg width="120" height="200" viewBox="0 0 120 200">
        <rect x="46" y="50" width="28" height="130" rx="6" fill="#C4A265" opacity="0.75" />
        <ellipse cx="60" cy="50" rx="14" ry="8" fill="#A07A40" />
        <rect x="56" y="24" width="8" height="28" rx="4" fill="#4A3728" />
        <rect x="50" y="90" width="20" height="1.5" rx="1" fill="#F9F5EE" opacity="0.5" />
        <text x="60" y="135" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="8" fill="#1C1209" opacity="0.9">LUMINAE</text>
        <text x="60" y="147" textAnchor="middle" fontFamily="DM Sans" fontSize="6" fill="#1C1209" opacity="0.7">SCALP SERUM</text>
      </svg>
    ),
  },
  {
    id: 4,
    name: "Hydra Balance Shampoo",
    sub: "Shampoos · 300ml",
    price: "$34",
    category: "shampoo",
    svgBg: "linear-gradient(145deg,rgba(42,31,20,0.13),#EFE6D5)",
    svgContent: (
      <svg width="120" height="200" viewBox="0 0 120 200">
        <rect x="38" y="30" width="44" height="150" rx="10" fill="#4A3728" opacity="0.7" />
        <rect x="44" y="18" width="32" height="18" rx="5" fill="#2A1F14" />
        <circle cx="60" cy="80" r="16" fill="#8B6F47" opacity="0.4" />
        <text x="60" y="120" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="9" fill="#F9F5EE" opacity="0.9">LUMINAE</text>
        <text x="60" y="132" textAnchor="middle" fontFamily="DM Sans" fontSize="6" fill="#D9C9AD" opacity="0.7">HYDRA SHAMPOO</text>
      </svg>
    ),
  },
  {
    id: 5,
    name: "Argan Silk Mask",
    sub: "Treatments · 200ml",
    price: "$44",
    category: "treatment",
    badge: "Popular",
    svgBg: "linear-gradient(145deg,rgba(139,111,71,0.13),#EFE6D5)",
    svgContent: (
      <svg width="120" height="200" viewBox="0 0 120 200">
        <rect x="34" y="40" width="52" height="140" rx="8" fill="#D9C9AD" opacity="0.8" />
        <rect x="40" y="28" width="40" height="18" rx="4" fill="#8B6F47" />
        <rect x="38" y="88" width="44" height="2" rx="1" fill="#8B6F47" opacity="0.3" />
        <text x="60" y="125" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="9" fill="#4A3728" opacity="0.9">LUMINAE</text>
        <text x="60" y="137" textAnchor="middle" fontFamily="DM Sans" fontSize="6" fill="#4A3728" opacity="0.7">ARGAN OIL MASK</text>
      </svg>
    ),
  },
  {
    id: 6,
    name: "Growth Elixir Drops",
    sub: "Serums · 30ml",
    price: "$56",
    category: "serum",
    badge: "New",
    badgeStyle: { background: "#7A8C6A", color: "#fff" },
    svgBg: "linear-gradient(145deg,rgba(122,140,106,0.13),rgba(217,201,173,0.27))",
    svgContent: (
      <svg width="120" height="200" viewBox="0 0 120 200">
        <rect x="50" y="60" width="20" height="120" rx="10" fill="#3D5433" opacity="0.7" />
        <ellipse cx="60" cy="60" rx="10" ry="6" fill="#2A3D22" />
        <rect x="57" y="32" width="6" height="30" rx="3" fill="#1C2A18" />
        <circle cx="60" cy="38" r="5" fill="#7A8C6A" opacity="0.8" />
        <text x="60" y="130" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="7" fill="#F9F5EE" opacity="0.9">LUMINAE</text>
        <text x="60" y="142" textAnchor="middle" fontFamily="DM Sans" fontSize="5.5" fill="#EFE6D5" opacity="0.7">GROWTH DROPS</text>
      </svg>
    ),
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    initials: "AK",
    name: "Adaeze Kamara",
    product: "Scalp Revival Serum · Verified Buyer",
    quote:
      "I've tried countless hair care brands over the years. Luminae is the first that actually delivered on its promises — my hair feels thicker, shinier, and healthier than it has in a decade. The Scalp Revival Serum is pure magic.",
    stars: 5,
    featured: true,
  },
  {
    initials: "NB",
    name: "Nadia Boateng",
    product: "Repair Ritual Shampoo",
    quote:
      "The Repair Ritual Shampoo completely transformed my bleached hair. Soft, manageable, and no more breakage.",
    stars: 5,
  },
  {
    initials: "SO",
    name: "Sophia Okonkwo",
    product: "Argan Silk Mask",
    quote:
      "Love that every ingredient is natural and the packaging is sustainable. It's rare to find a brand that actually cares about both.",
    stars: 4,
  },
  {
    initials: "TJ",
    name: "Taiwo James",
    product: "Growth Elixir Drops",
    quote:
      "My edges have grown back fuller since using the Growth Elixir. I recommend this to every naturalista I know.",
    stars: 5,
  },
];

const INGREDIENTS: Ingredient[] = [
  {
    num: "01",
    name: "Argan Oil",
    description:
      "Cold-pressed from Moroccan kernels, rich in Vitamin E and fatty acids. Deeply nourishes and adds luminous shine without greasiness.",
  },
  {
    num: "02",
    name: "Baobab Protein",
    description:
      "From Africa's 'tree of life' — penetrates the hair shaft to rebuild structure, reduce breakage and restore elasticity.",
  },
  {
    num: "03",
    name: "Black Seed Oil",
    description:
      "Known for centuries in traditional medicine. Stimulates scalp circulation, promotes growth and soothes irritation.",
  },
  {
    num: "04",
    name: "Rosemary Extract",
    description:
      "Clinically shown to rival minoxidil for hair density improvement. Antioxidant-rich and scalp-invigorating.",
  },
];

const ECO_STATS: EcoStat[] = [
  { value: "98%", label: "Natural origin ingredients" },
  { value: "12K+", label: "Happy customers worldwide" },
  { value: "0%", label: "Harsh chemicals ever used" },
  { value: "4.8★", label: "Average product rating" },
];

const ECO_TAGS = ["No Sulphates", "No Parabens", "Plant-Based", "Ethically Sourced", "Recyclable Packaging"];

const FOOTER_LINKS = {
  Shop: ["All Products", "Shampoos", "Treatments", "Serums & Oils", "Gift Sets"],
  Account: ["My Account", "Wishlist", "Order History", "Track Order"],
  Support: ["Contact Us", "FAQs", "Shipping & Returns", "Hair Care Guide", "Ingredients"],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div className="luminae-section-label" style={style}>
    {children}
  </div>
);

const DisplayHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="luminae-display">{children}</h2>
);

const ProductBottleSVG: React.FC<{ bg: string; svgContent: React.ReactNode }> = ({ bg, svgContent }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: bg,
    }}
  >
    {svgContent}
  </div>
);

// ─── Section: Navbar ──────────────────────────────────────────────────────────

const Navbar: React.FC<{ cartCount?: number }> = ({ cartCount = 0 }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="luminae-nav"
      style={{ borderBottomColor: scrolled ? "rgba(139,111,71,0.2)" : "rgba(139,111,71,0.12)" }}
    >
      <a href="#" className="luminae-nav-logo">
        MiraCare
      </a>
      <ul className="luminae-nav-links">
        {["Shop", "Collections", "About", "Contact"].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`}>{item}</a>
          </li>
        ))}
      </ul>
      <div className="luminae-nav-actions">
        <button aria-label="Search">⌖</button>
        <button aria-label="Favourites">♡</button>
        <button className="luminae-cart-btn">Add to Cart ({cartCount})</button>
      </div>
    </nav>
  );
};

// ─── Section: Hero ────────────────────────────────────────────────────────────

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goSlide = useCallback((n: number) => {
    setCurrent(n);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="luminae-hero" id="hero">
      <div
        className="luminae-hero-slides"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {HERO_SLIDES.map((slide, i) => (
          <div key={i} className="luminae-hero-slide">
            <div
              className="luminae-hero-bg"
              style={{ background: slide.bg }}
            />
            <div className="luminae-hero-overlay" />
            <div className="luminae-hero-content">
              <div className="luminae-hero-tag">{slide.tag}</div>
              <h1 className="luminae-hero-title">
                {slide.titleLine1}
                <br />
                <em>{slide.titleLine2}</em>
              </h1>
              <p className="luminae-hero-subtitle">{slide.subtitle}</p>
              <div className="luminae-hero-btns">
                <a href="#shop" className="luminae-btn-primary">
                  Shop Now
                </a>
                <a href="#ingredients" className="luminae-btn-ghost">
                  {slide.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="luminae-hero-indicators">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`luminae-indicator${current === i ? " active" : ""}`}
            onClick={() => goSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      <div className="luminae-hero-scroll">Scroll</div>
    </section>
  );
};

// ─── Section: Marquee ─────────────────────────────────────────────────────────

const MarqueeStrip: React.FC = () => {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="luminae-marquee-strip">
      <div className="luminae-marquee-inner">
        {doubled.map((item, i) => (
          <div key={i} className="luminae-marquee-item">
            <span>✦</span> {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Section: Features Bar ────────────────────────────────────────────────────

const FeaturesBar: React.FC = () => (
  <div className="luminae-features-bar" id="home-features">
    {FEATURES.map((f, i) => (
      <div
        key={i}
        className="luminae-feature-item"
        style={{ borderRight: i < FEATURES.length - 1 ? "1px solid rgba(139,111,71,0.1)" : "none" }}
      >
        <div className="luminae-feature-icon">{f.icon}</div>
        <div className="luminae-feature-text">
          <h4>{f.title}</h4>
          <p>{f.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

// ─── Section: Headline ────────────────────────────────────────────────────────

const HeadlineSection: React.FC = () => (
  <div className="luminae-headline-section">
    <div className="luminae-headline-flex">
      <div className="luminae-headline-line">
        <span className="luminae-headline-word">Transform</span>
        <div className="luminae-headline-pill">🌾</div>
        <span className="luminae-headline-word">your</span>
      </div>
      <div className="luminae-headline-line">
        <span className="luminae-headline-word luminae-italic">hair,</span>
        <span style={{ marginRight: 8 }} />
        <span className="luminae-headline-word">love</span>
        <div className="luminae-headline-pill">✨</div>
      </div>
      <div className="luminae-headline-line">
        <span className="luminae-headline-word">yourself,</span>
      </div>
      <div className="luminae-headline-line">
        <span className="luminae-headline-word luminae-italic">unlock your glow.</span>
      </div>
    </div>
  </div>
);

// ─── Section: Products ────────────────────────────────────────────────────────

type Category = "all" | "shampoo" | "treatment" | "serum";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="luminae-product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="luminae-product-img-wrap">
        <ProductBottleSVG bg={product.svgBg} svgContent={product.svgContent} />
        <div
          className="luminae-product-overlay"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <button className="luminae-overlay-btn">Add to Cart</button>
        </div>
        {product.badge && (
          <div
            className="luminae-badge"
            style={product.badgeStyle ?? {}}
          >
            {product.badge}
          </div>
        )}
      </div>
      <div className="luminae-product-info">
        <div>
          <h3>{product.name}</h3>
          <p className="luminae-product-sub">{product.sub}</p>
        </div>
        <span className="luminae-product-price">{product.price}</span>
      </div>
    </div>
  );
};

const ProductsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const tabs: { key: Category; label: string }[] = [
    { key: "all", label: "All" },
    { key: "shampoo", label: "Shampoos" },
    { key: "treatment", label: "Treatments" },
    { key: "serum", label: "Serums" },
  ];

  const filtered =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section className="luminae-products-section" id="shop">
      <div className="luminae-products-header">
        <div>
          <SectionLabel>The Collection</SectionLabel>
          <DisplayHeading>
            Our <em>Bestsellers</em>
          </DisplayHeading>
        </div>
        <div className="luminae-category-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`luminae-cat-tab${activeCategory === tab.key ? " active" : ""}`}
              onClick={() => setActiveCategory(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="luminae-products-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="luminae-shop-all">
        <a href="#" className="luminae-btn-outline">
          View All Products
        </a>
      </div>
    </section>
  );
};

// ─── Section: Eco ─────────────────────────────────────────────────────────────

const EcoSection: React.FC = () => (
  <div className="luminae-eco-section" id="collections">
    <div className="luminae-eco-visual">
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}
        viewBox="0 0 400 600"
      >
        <circle cx="200" cy="300" r="200" fill="none" stroke="#C4A265" strokeWidth="1" />
        <circle cx="200" cy="300" r="150" fill="none" stroke="#C4A265" strokeWidth="0.5" />
        <circle cx="200" cy="300" r="100" fill="none" stroke="#C4A265" strokeWidth="0.5" />
        <line x1="0" y1="300" x2="400" y2="300" stroke="#C4A265" strokeWidth="0.5" />
        <line x1="200" y1="0" x2="200" y2="600" stroke="#C4A265" strokeWidth="0.5" />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="180" height="320" viewBox="0 0 180 320">
          <rect x="55" y="30" width="70" height="220" rx="14" fill="#C4A265" opacity="0.85" />
          <rect x="62" y="16" width="56" height="22" rx="7" fill="#8B6F47" />
          <rect x="68" y="6" width="44" height="14" rx="4" fill="#4A3728" />
          <rect x="60" y="90" width="60" height="2" rx="1" fill="#F9F5EE" opacity="0.4" />
          <text x="90" y="150" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="14" fill="#F9F5EE" opacity="0.95">LUMINAE</text>
          <text x="90" y="168" textAnchor="middle" fontFamily="DM Sans" fontSize="8" fill="#F9F5EE" opacity="0.7" letterSpacing="2">SIGNATURE OIL</text>
          <ellipse cx="90" cy="270" rx="50" ry="6" fill="#000" opacity="0.2" />
        </svg>
      </div>
    </div>
    <div className="luminae-eco-content">
      <SectionLabel>Our Promise</SectionLabel>
      <DisplayHeading>
        Eco-Friendly,
        <br />
        <em>Hair-Friendly</em>
      </DisplayHeading>
      <p
        style={{
          marginTop: 20,
          fontSize: 14,
          color: "#7A6A5A",
          lineHeight: 1.8,
          maxWidth: 440,
        }}
      >
        100% natural means every ingredient is thoughtfully sourced from nature to provide safe,
        effective, and gentle care for your hair — without compromising the planet.
      </p>
      <div className="luminae-eco-tags">
        {ECO_TAGS.map((tag) => (
          <span key={tag} className="luminae-eco-tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="luminae-eco-stats">
        {ECO_STATS.map((stat) => (
          <div key={stat.value} className="luminae-eco-stat">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Section: Testimonials ───────────────────────────────────────────────────

const TestimonialCard: React.FC<{ t: Testimonial }> = ({ t }) => (
  <div className={`luminae-testi-card${t.featured ? " luminae-featured-testi" : ""}`}>
    <span className="luminae-testi-stars">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</span>
    <p className="luminae-testi-quote">"{t.quote}"</p>
    <div className="luminae-testi-author">
      <div className="luminae-testi-avatar">{t.initials}</div>
      <div>
        <div className="luminae-testi-name">{t.name}</div>
        <div className="luminae-testi-product">{t.product}</div>
      </div>
    </div>
  </div>
);

const TestimonialsSection: React.FC = () => (
  <section className="luminae-testimonials">
    <div className="luminae-testimonial-header">
      <div>
        <SectionLabel>Real Results</SectionLabel>
        <DisplayHeading>
          Why Your Hair
          <br />
          <em>Deserves the Best</em>
        </DisplayHeading>
      </div>
      <div className="luminae-rating-pill">
        <span className="luminae-stars">★★★★★</span>
        <span className="luminae-rating-text">4.8 · 2,341 reviews</span>
      </div>
    </div>
    <div className="luminae-testimonials-grid">
      {TESTIMONIALS.map((t, i) => (
        <TestimonialCard key={i} t={t} />
      ))}
    </div>
  </section>
);

// ─── Section: Ingredients ─────────────────────────────────────────────────────

const IngredientsSection: React.FC = () => (
  <section className="luminae-ingredients" id="ingredients">
    <SectionLabel>What&apos;s Inside</SectionLabel>
    <DisplayHeading>
      Nature&apos;s Most
      <br />
      <em>Powerful Ingredients</em>
    </DisplayHeading>
    <div className="luminae-ingredients-grid">
      <div className="luminae-ingredient-list">
        {INGREDIENTS.map((ingr) => (
          <div key={ingr.num} className="luminae-ingredient-item">
            <span className="luminae-ingr-num">{ingr.num}</span>
            <div className="luminae-ingr-info">
              <h4>{ingr.name}</h4>
              <p>{ingr.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="luminae-ingredients-visual">
        <div className="luminae-ingr-circle">
          <div className="luminae-ingr-inner">
            <div className="luminae-ingr-label">
              <p>100%</p>
              <span>Natural Origin</span>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 32,
            padding: 28,
            background: "#EFE6D5",
            borderRadius: 4,
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20,
              fontStyle: "italic",
              color: "#4A3728",
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            &ldquo;We believe the best formulas begin with the best nature has to offer — nothing
            artificial, nothing compromised.&rdquo;
          </p>
          <p
            style={{
              fontSize: 12,
              color: "#7A6A5A",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            — Dr. Amara Osei, Chief Formulator
          </p>
        </div>
      </div>
    </div>
  </section>
);

// ─── Section: Newsletter ──────────────────────────────────────────────────────

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="luminae-newsletter" id="newsletter">
      <div className="luminae-newsletter-leaf" aria-hidden="true">
        🌿
      </div>
      <div className="luminae-newsletter-inner">
        <SectionLabel style={{ color: "#C4A265" }}>Stay Connected</SectionLabel>
        <h2 className="luminae-newsletter-heading">
          Stay Updated,
          <br />
          <em>Stay Radiant</em>
        </h2>
        <p className="luminae-newsletter-desc">
          Be the first to know about new launches, exclusive offers, and expert hair care rituals.
          Join 12,000+ hair lovers in our community.
        </p>
        <div className="luminae-newsletter-form">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button">Subscribe</button>
        </div>
        <p className="luminae-newsletter-note">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
};

// ─── Section: Footer ──────────────────────────────────────────────────────────

const Footer: React.FC = () => (
  <footer className="luminae-footer" id="footer">
    <div className="luminae-footer-top">
      <div className="luminae-footer-brand">
        <a href="#" className="luminae-nav-logo" style={{ color: "#C4A265", display: "block", marginBottom: 16 }}>
          Luminae
        </a>
        <p>
          Combining the wisdom of nature and the precision of science, we create hair care that
          nurtures every strand and respects the planet we call home.
        </p>
        <div className="luminae-footer-social">
          {["☺", "✺", "✿", "❋"].map((icon, i) => (
            <a key={i} href="#" aria-label={["Instagram", "Twitter", "Facebook", "Pinterest"][i]}>
              {icon}
            </a>
          ))}
        </div>
      </div>
      {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
        <div key={heading} className="luminae-footer-col">
          <h4>{heading}</h4>
          <ul>
            {links.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="luminae-footer-bottom">
      <p>© 2025 Luminae Hair Care. All rights reserved.</p>
      <p>Terms & Conditions · Privacy Policy · Cookie Settings</p>
    </div>
  </footer>
);

// ─── Global CSS ───────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --lum-cream: #F9F5EE;
  --lum-warm:  #EFE6D5;
  --lum-sand:  #D9C9AD;
  --lum-bark:  #8B6F47;
  --lum-earth: #4A3728;
  --lum-deep:  #1C1209;
  --lum-gold:  #C4A265;
  --lum-sage:  #7A8C6A;
  --lum-text:  #2A1F14;
  --lum-muted: #7A6A5A;
  --lum-white: #FFFEF9;
}

html { scroll-behavior: smooth; }
body { font-family: 'DM Sans', sans-serif; background: var(--lum-cream); color: var(--lum-text); overflow-x: hidden; }

/* NAV */
.luminae-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 0 48px; height: 72px;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(249,245,238,0.92); backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(139,111,71,0.12);
  transition: border-bottom-color .3s;
}
.luminae-nav-logo {
  font-family: 'Cormorant Garamond', serif; font-size: 26px;
  font-weight: 300; letter-spacing: 0.22em; color: var(--lum-earth);
  text-transform: uppercase; text-decoration: none;
}
.luminae-nav-links { display: flex; gap: 36px; list-style: none; }
.luminae-nav-links a {
  font-size: 13px; letter-spacing: 0.1em; color: var(--lum-muted);
  text-decoration: none; text-transform: uppercase; transition: color .2s;
}
.luminae-nav-links a:hover { color: var(--lum-earth); }
.luminae-nav-actions { display: flex; gap: 20px; align-items: center; }
.luminae-nav-actions button {
  background: none; border: none; cursor: pointer;
  color: var(--lum-muted); font-size: 14px; transition: color .2s; padding: 12px;
}
.luminae-nav-actions button:hover { color: var(--lum-earth); }
.luminae-cart-btn {
  background: var(--lum-earth) !important; color: var(--lum-cream) !important;
  border: none; padding: 10px 24px;
  font-family: 'DM Sans', sans-serif; font-size: 12px;
  letter-spacing: 0.02em; text-transform: uppercase;
  cursor: pointer; border-radius: 4px; transition: background .2s;
}
.luminae-cart-btn:hover { background: var(--lum-deep) !important; }

/* HERO */
.luminae-hero {
  height: 100vh; position: relative; overflow: hidden; display: flex; align-items: center;
}
.luminae-hero-slides {
  position: absolute; inset: 0; display: flex;
  transition: transform 0.9s cubic-bezier(.77,0,.175,1);
}
.luminae-hero-slide {
  min-width: 100%; height: 100%; position: relative; flex-shrink: 0;
}
.luminae-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
.luminae-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to right, rgba(2, 48, 32, 0.9) 0%, rgba(2, 48, 32, 0.6) 60%, rgba(2, 48, 32, 0.3) 100%);
}
.luminae-hero-content {
  position: relative; z-index: 2; padding: 120px 80px 0; max-width: 700px;
}
.luminae-hero-tag {
  font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase;
  color: var(--lum-gold); margin-bottom: 28px;
  display: flex; align-items: center; gap: 12px;
}
.luminae-hero-tag::before {
  content: ''; display: block; width: 40px; height: 1px; background: var(--lum-gold);
}
.luminae-hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(64px, 8vw, 108px);
  line-height: 0.9; font-weight: 300; color: #FFFEF9;
  margin-bottom: 32px; letter-spacing: -0.01em;
}
.luminae-hero-title em { font-style: italic; color: var(--lum-gold); }
.luminae-hero-subtitle {
  font-size: 15px; line-height: 1.7;
  color: rgba(255,254,249,0.72); max-width: 380px;
  margin-bottom: 48px; font-weight: 300;
}
.luminae-hero-btns { display: flex; gap: 16px; align-items: center; }
.luminae-btn-primary {
  background: var(--lum-gold); color: var(--lum-deep);
  padding: 16px 36px; font-family: 'DM Sans', sans-serif;
  font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;
  border: none; cursor: pointer; border-radius: 2px;
  transition: all .2s; text-decoration: none; display: inline-block;
}
.luminae-btn-primary:hover { background: var(--lum-cream); color: var(--lum-earth); }
.luminae-btn-ghost {
  color: rgba(255,254,249,0.8); font-size: 12px; letter-spacing: 0.12em;
  text-transform: uppercase; text-decoration: none;
  display: flex; align-items: center; gap: 8px; transition: color .2s;
}
.luminae-btn-ghost::after { content: '→'; font-size: 16px; }
.luminae-btn-ghost:hover { color: var(--lum-gold); }
.luminae-hero-indicators {
  position: absolute; bottom: 40px; left: 80px; z-index: 2; display: flex; gap: 10px;
}
.luminae-indicator {
  width: 5px; height: 5px; border-radius: 50%;
  background: rgba(255,254,249,0.3);
  cursor: pointer; transition: all .3s; border: none;
}
.luminae-indicator.active { background: var(--lum-gold); width: 10px; }
.luminae-hero-scroll {
  position: absolute; right: 48px; bottom: 40px; z-index: 2;
  writing-mode: vertical-rl; font-size: 10px; letter-spacing: 0.2em;
  text-transform: uppercase; color: rgba(255,254,249,0.4);
  display: flex; align-items: center; gap: 12px;
}
.luminae-hero-scroll::after {
  content: ''; display: block; width: 1px; height: 56px;
  background: rgba(255,254,249,0.2);
}

/* MARQUEE */
.luminae-marquee-strip {
  background: var(--lum-earth); padding: 14px 0; overflow: hidden;
}
.luminae-marquee-inner {
  display: flex; white-space: nowrap;
  animation: luminaeMarquee 30s linear infinite;
}
.luminae-marquee-item {
  font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--lum-sand); padding: 0 48px;
  display: flex; align-items: center; gap: 16px; flex-shrink: 0;
}
.luminae-marquee-item span { color: var(--lum-gold); font-size: 16px; }
@keyframes luminaeMarquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* FEATURES BAR */
.luminae-features-bar {
  background: var(--lum-white);
  border-bottom: 1px solid rgba(139,111,71,0.1);
  padding: 32px 80px;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
}
.luminae-feature-item {
  display: flex; align-items: center; gap: 16px; padding: 0 16px;
}
.luminae-feature-icon {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--lum-warm);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; flex-shrink: 0;
}
.luminae-feature-text h4 {
  font-size: 13px; font-weight: 500; letter-spacing: 0.05em;
  color: var(--lum-earth); margin-bottom: 3px;
}
.luminae-feature-text p { font-size: 12px; color: var(--lum-muted); line-height: 1.4; }

/* SECTION UTILS */
.luminae-section-label {
  font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--lum-bark); margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
}
.luminae-section-label::before {
  content: ''; display: block; width: 28px; height: 1px; background: currentColor;
}
.luminae-display {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(48px, 5vw, 72px);
  font-weight: 300; line-height: 1.05; color: var(--lum-deep);
  letter-spacing: -0.01em;
}
.luminae-display em { font-style: italic; color: var(--lum-bark); }

/* HEADLINE */
.luminae-headline-section {
  padding: 100px 80px 60px; background: var(--lum-cream);
}
.luminae-headline-flex { display: flex; flex-direction: column; gap: 4px; }
.luminae-headline-line { display: flex; align-items: center; gap: 24px; }
.luminae-headline-word {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(56px, 7vw, 96px);
  font-weight: 300; color: var(--lum-deep); line-height: 1;
}
.luminae-headline-word.luminae-italic { font-style: italic; color: var(--lum-bark); }
.luminae-headline-pill {
  height: 64px; width: 110px; border-radius: 40px;
  overflow: hidden; display: inline-flex;
  align-items: center; justify-content: center;
  background: var(--lum-warm); flex-shrink: 0; font-size: 32px;
}

/* PRODUCTS */
.luminae-products-section {
  padding: 80px 80px 120px; background: var(--lum-white);
}
.luminae-products-header {
  display: flex; align-items: flex-end;
  justify-content: space-between; margin-bottom: 56px;
}
.luminae-category-tabs {
  display: flex; gap: 4px;
  background: var(--lum-warm); padding: 4px; border-radius: 4px;
}
.luminae-cat-tab {
  padding: 10px 24px; font-size: 12px; letter-spacing: 0.1em;
  text-transform: uppercase; border: none; background: none;
  cursor: pointer; color: var(--lum-muted); border-radius: 2px;
  transition: all .2s; font-family: 'DM Sans', sans-serif;
}
.luminae-cat-tab.active {
  background: var(--lum-white); color: var(--lum-earth);
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
.luminae-products-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
}
.luminae-product-card {
  background: var(--lum-cream); position: relative;
  overflow: hidden; cursor: pointer;
}
.luminae-product-img-wrap {
  aspect-ratio: 3/4; overflow: hidden;
  position: relative; background: var(--lum-warm);
}
.luminae-product-overlay {
  position: absolute; inset: 0;
  background: rgba(28,18,9,0.45);
  display: flex; align-items: center; justify-content: center;
  transition: opacity .3s;
}
.luminae-overlay-btn {
  background: var(--lum-gold); color: var(--lum-deep);
  padding: 14px 28px; font-family: 'DM Sans', sans-serif;
  font-size: 13px; letter-spacing: 0.15em; text-transform: lowercase;
  border: none; cursor: pointer; border-radius: 2px;
}
.luminae-product-info {
  padding: 20px 24px;
  display: flex; justify-content: space-between; align-items: flex-end;
}
.luminae-product-info h3 {
  font-size: 15px; font-weight: 400; color: var(--lum-earth); margin-bottom: 4px;
}
.luminae-product-sub { font-size: 12px; color: var(--lum-muted); }
.luminae-product-price {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-weight: 500; color: var(--lum-earth);
}
.luminae-badge {
  position: absolute; top: 16px; left: 16px;
  background: var(--lum-gold); color: var(--lum-deep);
  font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
  padding: 5px 10px; border-radius: 2px;
}
.luminae-shop-all { display: flex; justify-content: center; margin-top: 48px; }
.luminae-btn-outline {
  border: 1px solid var(--lum-earth); color: var(--lum-earth);
  padding: 16px 48px; font-family: 'DM Sans', sans-serif;
  font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;
  background: none; cursor: pointer; border-radius: 2px;
  transition: all .2s; text-decoration: none; display: inline-block;
}
.luminae-btn-outline:hover { background: var(--lum-earth); color: var(--lum-cream); }

/* ECO */
.luminae-eco-section {
  padding: 0; background: var(--lum-warm);
  display: grid; grid-template-columns: 1fr 1fr; min-height: 600px;
}
.luminae-eco-visual {
  position: relative; overflow: hidden;
  background: linear-gradient(160deg, #0D3B2D, #1A5F4A);
}
.luminae-eco-content {
  padding: 80px 72px;
  display: flex; flex-direction: column; justify-content: center;
}
.luminae-eco-tags { display: flex; flex-wrap: wrap; gap: 10px; margin: 32px 0 40px; }
.luminae-eco-tag {
  border: 1px solid rgba(139,111,71,0.3); color: var(--lum-bark);
  font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 8px 16px; border-radius: 2px;
}
.luminae-eco-stats {
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 40px;
}
.luminae-eco-stat h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 48px; font-weight: 300; color: var(--lum-earth); line-height: 1;
}
.luminae-eco-stat p { font-size: 12px; color: var(--lum-muted); line-height: 1.5; margin-top: 6px; }

/* TESTIMONIALS */
.luminae-testimonials { padding: 120px 80px; background: var(--lum-cream); }
.luminae-testimonial-header {
  display: flex; align-items: flex-end;
  justify-content: space-between; margin-bottom: 64px;
}
.luminae-rating-pill {
  display: flex; align-items: center; gap: 10px;
  background: var(--lum-white);
  border: 1px solid rgba(139,111,71,0.15);
  padding: 10px 20px; border-radius: 40px;
}
.luminae-stars { color: var(--lum-gold); font-size: 14px; letter-spacing: 2px; }
.luminae-rating-text { font-size: 13px; color: var(--lum-muted); }
.luminae-testimonials-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
}
.luminae-testi-card {
  background: var(--lum-white);
  border: 1px solid rgba(139,111,71,0.1);
  padding: 36px; border-radius: 4px; position: relative;
}
.luminae-featured-testi {
  grid-column: span 2;
  background: var(--lum-earth); color: var(--lum-cream);
}
.luminae-testi-quote {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px; font-weight: 400; line-height: 1.65;
  color: var(--lum-earth); margin-bottom: 28px; font-style: italic;
}
.luminae-featured-testi .luminae-testi-quote {
  color: var(--lum-sand); font-size: 22px;
}
.luminae-testi-author { display: flex; align-items: center; gap: 14px; }
.luminae-testi-avatar {
  width: 42px; height: 42px; border-radius: 50%;
  background: var(--lum-warm);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 500; color: var(--lum-earth); flex-shrink: 0;
}
.luminae-featured-testi .luminae-testi-avatar {
  background: rgba(196,162,101,0.2); color: var(--lum-gold);
}
.luminae-testi-name { font-size: 14px; font-weight: 500; color: var(--lum-earth); }
.luminae-featured-testi .luminae-testi-name { color: var(--lum-cream); }
.luminae-testi-product { font-size: 12px; color: var(--lum-muted); }
.luminae-featured-testi .luminae-testi-product { color: rgba(217,201,173,0.6); }
.luminae-testi-stars {
  color: var(--lum-gold); font-size: 12px; letter-spacing: 1px;
  position: absolute; top: 36px; right: 36px;
}

/* INGREDIENTS */
.luminae-ingredients { padding: 120px 80px; background: var(--lum-white); }
.luminae-ingredients-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 80px; align-items: center; margin-top: 64px;
}
.luminae-ingredient-list { display: flex; flex-direction: column; gap: 0; }
.luminae-ingredient-item {
  display: grid; grid-template-columns: 64px 1fr;
  gap: 24px; padding: 28px 0;
  border-bottom: 1px solid rgba(139,111,71,0.1);
  align-items: start;
}
.luminae-ingredient-item:first-child { border-top: 1px solid rgba(139,111,71,0.1); }
.luminae-ingr-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 38px; font-weight: 300; color: var(--lum-sand); line-height: 1;
}
.luminae-ingr-info h4 {
  font-size: 15px; font-weight: 500; color: var(--lum-earth);
  margin-bottom: 6px; letter-spacing: 0.02em;
}
.luminae-ingr-info p { font-size: 13px; color: var(--lum-muted); line-height: 1.6; }
.luminae-ingr-circle {
  width: 100%; aspect-ratio: 1; border-radius: 50%;
  background: var(--lum-warm);
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.luminae-ingr-inner {
  width: 70%; aspect-ratio: 1; border-radius: 50%;
  background: linear-gradient(145deg, var(--lum-bark), var(--lum-earth));
  display: flex; align-items: center; justify-content: center;
}
.luminae-ingr-label { text-align: center; color: var(--lum-cream); }
.luminae-ingr-label p {
  font-family: 'Cormorant Garamond', serif;
  font-size: 42px; font-weight: 300; line-height: 1;
}
.luminae-ingr-label span {
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.7;
}

/* NEWSLETTER */
.luminae-newsletter {
  background: var(--lum-earth);
  padding: 100px 80px; position: relative; overflow: hidden;
}
.luminae-newsletter-leaf {
  position: absolute; right: 80px; top: 50%;
  transform: translateY(-50%);
  opacity: 0.12; font-size: 280px; line-height: 1; pointer-events: none;
}
.luminae-newsletter-inner { position: relative; z-index: 1; max-width: 600px; }
.luminae-newsletter-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(40px, 4vw, 58px);
  font-weight: 300; color: var(--lum-cream); line-height: 1.1; margin-bottom: 16px;
}
.luminae-newsletter-heading em { font-style: italic; color: var(--lum-gold); }
.luminae-newsletter-desc {
  color: rgba(239,230,213,0.65);
  font-size: 14px; line-height: 1.7; margin-bottom: 36px;
}
.luminae-newsletter-form { display: flex; gap: 0; max-width: 480px; }
.luminae-newsletter-form input {
  flex: 1; padding: 16px 24px;
  background: rgba(255,254,249,0.08);
  border: 1px solid rgba(255,254,249,0.15); border-right: none;
  color: var(--lum-cream); font-family: 'DM Sans', sans-serif;
  font-size: 14px; border-radius: 2px 0 0 2px; outline: none;
}
.luminae-newsletter-form input::placeholder { color: rgba(255,254,249,0.4); }
.luminae-newsletter-form button {
  padding: 16px 28px; background: var(--lum-gold); color: var(--lum-deep);
  border: none; font-family: 'DM Sans', sans-serif;
  font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
  cursor: pointer; border-radius: 0 2px 2px 0;
  transition: background .2s; white-space: nowrap;
}
.luminae-newsletter-form button:hover { background: var(--lum-cream); }
.luminae-newsletter-note {
  font-size: 11px; color: rgba(239,230,213,0.35); margin-top: 14px;
}

/* FOOTER */
.luminae-footer { background: var(--lum-deep); padding: 80px 80px 40px; color: var(--lum-sand); }
.luminae-footer-top {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 64px; margin-bottom: 64px;
}
.luminae-footer-brand p {
  font-size: 13px; color: rgba(217,201,173,0.55);
  line-height: 1.7; max-width: 260px;
}
.luminae-footer-social { display: flex; gap: 16px; margin-top: 24px; }
.luminae-footer-social a {
  width: 36px; height: 36px;
  border: 1px solid rgba(196,162,101,0.2); border-radius: 2px;
  display: flex; align-items: center; justify-content: center;
  color: var(--lum-sand); font-size: 14px; text-decoration: none;
  transition: all .2s;
}
.luminae-footer-social a:hover { border-color: var(--lum-gold); color: var(--lum-gold); }
.luminae-footer-col h4 {
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--lum-gold); margin-bottom: 20px; font-weight: 500;
}
.luminae-footer-col ul {
  list-style: none; display: flex; flex-direction: column; gap: 10px;
}
.luminae-footer-col a {
  font-size: 13px; color: rgba(217,201,173,0.55);
  text-decoration: none; transition: color .2s;
}
.luminae-footer-col a:hover { color: var(--lum-sand); }
.luminae-footer-bottom {
  border-top: 1px solid rgba(196,162,101,0.1);
  padding-top: 32px;
  display: flex; justify-content: space-between; align-items: center;
}
.luminae-footer-bottom p { font-size: 12px; color: rgba(217,201,173,0.35); }

/* RESPONSIVE */
@media (max-width: 900px) {
  .luminae-nav { padding: 0 24px; }
  .luminae-nav-links { display: none; }
  .luminae-hero-content { padding: 0 24px; }
  .luminae-hero-indicators { left: 24px; }
  .luminae-features-bar { grid-template-columns: 1fr 1fr; padding: 24px; }
  .luminae-headline-section { padding: 80px 24px 40px; }
  .luminae-products-section { padding: 60px 24px 80px; }
  .luminae-products-header { flex-direction: column; align-items: flex-start; gap: 24px; }
  .luminae-products-grid { grid-template-columns: 1fr 1fr; }
  .luminae-eco-section { grid-template-columns: 1fr; }
  .luminae-eco-visual { display: none; }
  .luminae-eco-content { padding: 60px 24px; }
  .luminae-testimonials { padding: 80px 24px; }
  .luminae-testimonials-grid { grid-template-columns: 1fr; }
  .luminae-featured-testi { grid-column: span 1; }
  .luminae-testimonial-header { flex-direction: column; align-items: flex-start; gap: 24px; }
  .luminae-ingredients { padding: 80px 24px; }
  .luminae-ingredients-grid { grid-template-columns: 1fr; }
  .luminae-newsletter { padding: 80px 24px; }
  .luminae-newsletter-leaf { display: none; }
  .luminae-footer { padding: 60px 24px 32px; }
  .luminae-footer-top { grid-template-columns: 1fr 1fr; gap: 40px; }
  .luminae-footer-bottom { flex-direction: column; gap: 16px; }
}
`;

// ─── Root Component ───────────────────────────────────────────────────────────

const LuminaeHomePage: React.FC = () => {
  useEffect(() => {
    const styleId = "luminae-global-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
    return () => {
      const existing = document.getElementById(styleId);
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div>
      <Navbar cartCount={0} />
      <Hero />
      <MarqueeStrip />
      <FeaturesBar />
      <HeadlineSection />
      <ProductsSection />
      <EcoSection />
      <TestimonialsSection />
      <IngredientsSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default LuminaeHomePage;