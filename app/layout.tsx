import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MiraCare | Natural Haircare Essentials",
  description: "Shop premium natural haircare products, nourishing routines, and botanical formulas crafted for healthy hair.",
};

const FOOTER_LINKS = {
  Shop: ["All Products", "Shampoos", "Treatments", "Serums & Oils", "Gift Sets"],
  Account: ["My Account", "Wishlist", "Order History", "Track Order"],
  Support: ["Contact Us", "FAQs", "Shipping & Returns", "Hair Care Guide", "Ingredients"],
};

function Navbar() {
  return (
    <nav className="luminae-nav">
      <a href="/" className="luminae-nav-logo">MiraCare</a>
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
        <button className="luminae-cart-btn">Add to Cart (0)</button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="luminae-footer" id="footer">
      <div className="luminae-footer-top">
        <div className="luminae-footer-brand">
          <a href="/" className="luminae-nav-logo" style={{ color: "#C4A265", display: "block", marginBottom: 16 }}>
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="top-bar">
          🚚 Free shipping on orders over ₦50,000 · Subscribe & Save 15%
        </div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
