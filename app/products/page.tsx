"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <main className="page-shell">
      <div className="top-bar">
        🚚 Free shipping on orders over ₦50,000 · Subscribe & Save 15%
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand-link">
            <span>MiraCare</span>
            <span className="brand-dot" />
          </Link>

          <nav className="nav-links desktop-nav">
            {[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/products" },
              { label: "Hair Care", href: "#" },
              { label: "Ingredients", href: "#ingredients" },
              { label: "About", href: "#" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button className="icon-button" aria-label="Search">⌖</button>
            <button className="icon-button" aria-label="Favorites">♡</button>
            <button className="icon-button cart-button" aria-label="Cart">
              🛒
              <span className="cart-count">2</span>
            </button>
          </div>
        </div>
      </header>

      <section className="container" style={{ padding: "80px 0 40px" }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Collection</p>
            <h2>Shop All Products</h2>
            <p>Explore natural haircare essentials designed to nourish, restore, and protect.</p>
          </div>
          <Link href="/" className="button button-secondary">
            Back to homepage
          </Link>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-media">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                {product.badge ? <span className="product-badge">{product.badge}</span> : null}
              </div>
              <div className="product-content">
                <h3>{product.name}</h3>
                <p>{product.subtitle}</p>
                <div className="product-meta">
                  <span className="product-price">{product.price}</span>
                  <button className="button button-secondary">Add to cart</button>
                </div>
                <div className="product-tags">
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
