import React, { useRef, useState, useEffect } from "react";
import "./App.css"; // Make sure to move your CSS file to src folder
import bannerImg from './assets/images/bgBanner.jpg';
import Navbar from "./components/navbar"

// --- DATA ARRAYS (Isse code clean rahega) ---

const destinations = [
  { name: "Goa", img: "https://cdn-icons-png.flaticon.com/128/4336/4336883.png" },
  { name: "Maldives", img: "https://cdn-icons-png.flaticon.com/128/2240/2240692.png" },
  { name: "Thailand", img: "https://cdn-icons-png.flaticon.com/128/3389/3389805.png" },
  { name: "Dubai", img: "https://cdn-icons-png.flaticon.com/128/2151/2151596.png" },
  { name: "Kashmir", img: "https://cdn-icons-png.flaticon.com/128/2913/2913488.png" },
  { name: "Ladakh", img: "https://cdn-icons-png.flaticon.com/128/3106/3106260.png" },
  { name: "Singapore", img: "https://cdn-icons-png.flaticon.com/128/197/197479.png" },
  { name: "Kerala", img: "https://cdn-icons-png.flaticon.com/128/3028/3028588.png" },
  { name: "Europe", img: "https://cdn-icons-png.flaticon.com/128/921/921490.png" },
  { name: "Turkey", img: "https://cdn-icons-png.flaticon.com/128/963/963861.png" },
  { name: "Bali", img: "https://cdn-icons-png.flaticon.com/128/3284/3284643.png" },
  { name: "Paris", img: "https://cdn-icons-png.flaticon.com/128/3210/3210168.png" },
  { name: "London", img: "https://cdn-icons-png.flaticon.com/128/5826/5826685.png" },
];

const europePackages = [
  { title: "Romantic Paris", route: "Eiffel Tower • Disneyland", price: "₹1,40,000", img: "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?w=600&q=80" },
  { title: "Swiss Alps", route: "Zurich • Lucerne • Interlaken", price: "₹1,80,000", img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80" },
  { title: "London Calling", route: "London Eye • Big Ben", price: "₹1,50,000", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" },
  { title: "Italian Dream", route: "Rome • Venice • Florence", price: "₹2,10,000", img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80" },
  { title: "Scenic Iceland", route: "Northern Lights Special", price: "₹2,30,000", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80" },
];

const indiaPackages = [
  { title: "Heavenly Kashmir", route: "Srinagar • Gulmarg", price: "₹28,500", img: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=600&q=80" },
  { title: "Kerala Backwaters", route: "Munnar • Alleppey", price: "₹22,000", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80" },
  { title: "Goa Party Hub", route: "North Goa • Beaches", price: "₹15,000", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80" },
  { title: "Ladakh Bike Trip", route: "Leh • Nubra Valley", price: "₹35,000", img: "https://images.unsplash.com/photo-1566837945700-30057528ade0?w=600&q=80" },
];

const honeymoonPackages = [
    { title: "Maldives Luxury", route: "Private Water Villa", price: "₹1,10,000", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80" },
    { title: "Bali Vibes", route: "Romantic Dinner • Ubud", price: "₹60,000", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
    { title: "Paris Honeymoon", route: "City of Love", price: "₹1,50,000", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80" },
];

// --- REUSABLE COMPONENTS ---


// 2. Hero/Banner Component
const HeroBanner = () => (
  <div className="banner-container">
   <img src={bannerImg} alt="Travel Banner" className="banner-image" />
    <div className="banner-overlay">
      
      <div className="banner-content">
        
        <h1 className="banner-title">
          <span className="theam">Discover Your</span>
          <br />
          <span className="highlight-text">Next Adventure</span>
        </h1>
        <p className="banner-subtitle">
          <i className="fa-solid fa-check-circle"></i> Best Price Guarantee
          <span className="divider">•</span>
          <i className="fa-solid fa-check-circle"></i> 24/7 Support
          <span className="divider">•</span>
          <i className="fa-solid fa-check-circle"></i> Easy Refunds
        </p>
        <div className="quick-links">
          <span className="link-item"><i className="fa-solid fa-bolt"></i> Trending: Goa</span>
          <span className="link-item"><i className="fa-solid fa-fire"></i> Hot Deals: Maldives</span>
          <span className="link-item"><i className="fa-solid fa-percent"></i> Up to 40% Off</span>
        </div>
      </div>
    </div>
  </div>
);

// 3. Destination Strip Component (With Scroll Logic)
const DestinationStrip = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
        const scrollAmount = 350;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    }
  };

  return (
    <section className="destination-section">
      <button className="scroll-btn left-btn" onClick={() => scroll("left")}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      <div className="destination-scroll" id="destinationStrip" ref={scrollRef}>
        {destinations.map((dest, index) => (
          <div className="dest-card" key={index}>
            <img src={dest.img} alt={dest.name} />
            <span>{dest.name}</span>
          </div>
        ))}
      </div>

      <button className="scroll-btn right-btn" onClick={() => scroll("right")}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </section>
  );
};

// 4. Reusable Package Section Component (With Scroll Logic)
const PackageSection = ({ title, subtitle, packages }) => {
  const listRef = useRef(null);

  const scroll = (direction) => {
    if (listRef.current) {
        const scrollAmount = 325 * 2; // Card width approx + gap * 2
        listRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    }
  };

  return (
    <section className="package-section">
      <div className="section-header">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <a href="#" className="view-all">View All <i className="fa-solid fa-angle-right"></i></a>
      </div>
      <div className="slider-wrap">
        <button className="scroll-btn prev-btn" onClick={() => scroll("left")}>
            <i className="fa-solid fa-angle-left"></i>
        </button>
        
        <div className="card-list" ref={listRef}>
          {packages.map((pkg, index) => (
            <div className="travel-card" key={index}>
              <div className="card-img"><img src={pkg.img} alt={pkg.title} /></div>
              <div className="card-body">
                <h3>{pkg.title}</h3>
                <p className="card-route">{pkg.route}</p>
                <div className="card-price"><span className="new-rate">{pkg.price}</span></div>
              </div>
            </div>
          ))}
        </div>

        <button className="scroll-btn next-btn" onClick={() => scroll("right")}>
            <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </section>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <HeroBanner />
      
      {/* Destination Scroll */}
      <DestinationStrip />

      {/* Package Sections - Reusing component */}
      <PackageSection 
        title="Explore Europe" 
        subtitle="Paris, Swiss, London & More" 
        packages={europePackages} 
      />

      <PackageSection 
        title="Incredible India" 
        subtitle="Kashmir to Kanyakumari" 
        packages={indiaPackages} 
      />

      <PackageSection 
        title="Honeymoon Specials" 
        subtitle="Most romantic getaways for couples" 
        packages={honeymoonPackages} 
      />

      {/* Example for how easily you can add more sections */}
      {/* You can add Spiritual Journeys and Adventure here following the same pattern */}

      <div style={{ textAlign: "center", marginTop: "50px", color: "#888", marginBottom: "50px" }}>
        <h2>Ready to Explore?</h2>
        <p>Select a destination above to start your journey.</p>
      </div>
    </div>
  );
};

export default App;