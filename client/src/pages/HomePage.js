import React from 'react';
import { Link } from 'react-router-dom';
import heroBackground from '../assets/hero-background.png'; // Assuming this is your image path

const HomePage = () => {
  return (
    <div className="min-h-screen bg-neutral-light font-sans text-neutral-dark">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-24 md:py-40 text-center text-text-light overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60 md:opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[calc(80vh)]">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-down text-shadow-lg leading-tight text-text-light">Fresh from Farm to Your Table</h1>
          <p className="text-xl md:text-3xl mb-10 animate-fade-in-up font-light max-w-2xl text-text-light">Connecting you directly with local organic farmers for healthier living and a sustainable future.</p>
          <Link to="/products" className="bg-gradient-to-r from-secondary-brand to-primary-brand hover:from-primary-brand hover:to-secondary-brand text-white font-bold py-4 px-10 rounded-full text-lg md:text-xl transition duration-500 transform hover:scale-110 shadow-xl border-2 border-text-light hover:border-accent-warm animate-scale-in">
            Shop Organic Now
          </Link>
        </div>
      </section>

      {/* About Section - Brief Intro */}
      <section className="py-20 bg-neutral-light shadow-inner" id="home-about-brief">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-primary-brand mb-8">About FarmNest</h2> {/* Changed from AgriShop */}
          <p className="text-lg text-neutral-dark max-w-4xl mx-auto leading-relaxed mb-6">
            FarmNest is dedicated to bridging the gap between conscious consumers and passionate organic farmers.
            We believe in fostering transparency, sustainability, and fair trade practices in the food supply chain.
            By cutting out middlemen, we ensure farmers receive a fair price for their hard work, and you get premium organic products with transparency.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section - Cards */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-accent-warm mb-16 text-center">Why Choose FarmNest?</h2> {/* Changed from AgriShop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-xl text-center border-b-4 border-primary-brand transform hover:scale-105 transition duration-500 hover:shadow-2xl">
              <div className="text-6xl text-primary-brand mb-5">🌿</div>
              <h3 className="text-2xl font-bold text-neutral-dark mb-4">Direct from Farm</h3>
              <p className="text-neutral-dark leading-relaxed">Get your produce straight from local organic farmers, ensuring ultimate freshness, traceability, and quality like no other.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-xl text-center border-b-4 border-secondary-brand transform hover:scale-105 transition duration-500 hover:shadow-2xl">
              <div className="text-6xl text-secondary-brand mb-5">💰</div>
              <h3 className="text-2xl font-bold text-neutral-dark mb-4">Fair Prices</h3>
              <p className="text-neutral-dark leading-relaxed">Support fair trade practices. Farmers receive better compensation for their hard work, and you get exceptional value.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-xl text-center border-b-4 border-accent-warm transform hover:scale-105 transition duration-500 hover:shadow-2xl">
              <div className="text-6xl text-accent-warm mb-5">✨</div>
              <h3 className="text-2xl font-bold text-neutral-dark mb-4">Guaranteed Organic</h3>
              <p className="text-neutral-dark leading-relaxed">Only certified organic products from our network of trusted farms, with full transparency on sourcing and methods.</p>
            </div>
          </div>
          <div className="text-center mt-16">
            <Link to="/products" className="inline-block bg-gradient-to-r from-accent-warm to-secondary-brand hover:from-secondary-brand hover:to-accent-warm text-white font-bold py-4 px-10 rounded-full text-lg md:text-xl transition duration-500 transform hover:scale-110 shadow-xl border-2 border-text-light hover:border-gray-300">
              Explore Our Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Detailed */}
      <section className="py-20 bg-neutral-light" id="about-section">
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold text-primary-brand mb-8 text-center">More About FarmNest</h1> {/* Changed from Organic Harvest (AgriShop) */}

          <div className="bg-white p-8 rounded-xl shadow-xl mb-8 border-l-4 border-primary-brand">
            <h2 className="text-3xl font-semibold text-secondary-brand mb-4">Our Mission</h2>
            <p className="text-lg text-neutral-dark leading-relaxed mb-4">
              At FarmNest, our mission is to create a thriving ecosystem that connects consumers directly with local organic farmers. We believe in fostering transparency, sustainability, and fair trade practices in the food supply chain. By cutting out intermediaries, we empower farmers to receive equitable compensation for their hard work and dedication, while providing consumers with direct access to the freshest, healthiest, and truly organic produce.
            </p>
            <p className="text-lg text-neutral-dark leading-relaxed">
              We are committed to promoting sustainable agriculture, supporting local economies, and ensuring that every bite you take is not only delicious but also contributes to a healthier planet.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xl mb-8 border-l-4 border-secondary-brand">
            <h2 className="text-3xl font-semibold text-primary-brand mb-4">Our Story</h2>
            <p className="text-lg text-neutral-dark leading-relaxed mb-4">
              Born from a passion for healthy living and a desire to support local communities, FarmNest began as a simple idea: what if getting fresh, organic food was as easy as ordering online, directly from the farm? We realized the challenges faced by small organic farmers in reaching a wider market and the difficulty for consumers to find trustworthy organic sources.
            </p>
            <p className="text-lg text-neutral-dark leading-relaxed">
              Thus, FarmNest was cultivated. We've built this platform from the ground up to be a bridge – a direct link between the fertile lands cultivated by dedicated farmers and the tables of health-conscious families. Every feature is designed to ensure freshness, traceability, and a seamless experience for both our farming partners and our cherished customers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xl border-l-4 border-accent-warm">
            <h2 className="text-3xl font-semibold text-secondary-brand mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-lg text-neutral-dark space-y-2">
              <li>**Transparency:** Know your farmer, know your food. We believe in clear sourcing information.</li>
              <li>**Sustainability:** Supporting eco-friendly farming methods that nourish the earth.</li>
              <li>**Fairness:** Ensuring farmers receive just compensation for their organic produce.</li>
              <li>**Quality:** Delivering only the freshest, highest-quality organic products to your door.</li>
              <li>**Community:** Building a stronger connection between local farmers and their consumers.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-neutral-light" id="contact-section">
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold text-primary-brand mb-8 text-center">Contact Us</h1>

          <div className="bg-white p-8 rounded-xl shadow-xl mb-8 border-b-4 border-primary-brand">
            <h2 className="text-3xl font-semibold text-secondary-brand mb-4">Get in Touch with FarmNest</h2> {/* Changed from AgriShop */}
            <p className="text-lg text-neutral-dark leading-relaxed mb-4">
              We're here to help! Whether you're a farmer looking to partner with us or a customer with questions about your order or our organic products, feel free to reach out.
            </p>
            <p className="text-lg text-neutral-dark leading-relaxed">
              Our team is dedicated to providing you with the best possible experience.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xl mb-8 border-b-4 border-secondary-brand">
            <h3 className="text-2xl font-semibold text-primary-brand mb-4">Our Contact Information</h3>
            <div className="space-y-3 text-lg text-neutral-dark">
              <p>
                <strong>Email:</strong> <a href="mailto:support@farmnest.com" className="text-blue-600 hover:underline">support@farmnest.com</a> {/* Changed email domain */}
              </p>
              <p>
                <strong>Phone:</strong> <a href="tel:+919876543210" className="text-blue-600 hover:underline">+91 98765 43210</a>
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-neutral-dark" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                FarmNest Headquarters, Green Acres Building, Farm Road 10, Bhimavaram, Andhra Pradesh, India. {/* Changed name in address */}
              </p>
              <p>
                <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xl border-b-4 border-accent-warm">
            <h3 className="text-2xl font-semibold text-secondary-brand mb-4">Send Us a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="contactName" className="block text-neutral-dark text-sm font-bold mb-2">Your Name</label>
                <input type="text" id="contactName" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-neutral-dark text-sm font-bold mb-2">Your Email</label>
                <input type="email" id="contactEmail" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label htmlFor="contactSubject" className="block text-neutral-dark text-sm font-bold mb-2">Subject</label>
                <input type="text" id="contactSubject" name="subject" className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label htmlFor="contactMessage" className="block text-neutral-dark text-sm font-bold mb-2">Your Message</label>
                <textarea id="contactMessage" name="message" rows="5" className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline" required></textarea>
              </div>
              <button type="submit" className="bg-primary-brand hover:bg-secondary-brand text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Call to Action for Farmers - Styled as a distinct white card */}
      <section className="py-16 bg-neutral-light text-neutral-dark text-center shadow-2xl rounded-xl mx-auto my-12 max-w-4xl p-8">
        <h2 className="text-4xl font-bold mb-4">Are You an Organic Farmer?</h2>
        <p className="text-xl mb-8">Join our community and connect directly with thousands of conscious consumers.</p>
        <button className="bg-primary-brand text-white hover:bg-secondary-brand font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg">
          Partner with Us
        </button>
      </section>

      {/* Site Info & Quick Contact (Footer-like content) - This will now be the very last content section on the HomePage */}
      <section className="bg-primary-brand text-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* FarmNest Logo & Tagline */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-text-light">FarmNest</h3> {/* Changed from AgriShop */}
            <p className="text-text-light leading-relaxed">Connecting farmers directly with customers. Fresh, organic produce delivered to your doorstep.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-text-light">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#top" className="text-text-light hover:text-white transition duration-300">Home</a></li>
              <li><a href="#about-section" className="text-text-light hover:text-white transition duration-300">About</a></li>
              <li><a href="#contact-section" className="text-text-light hover:text-white transition duration-300">Contact</a></li>
              <li><Link to="/privacy-policy" className="text-text-light hover:text-white transition duration-300">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-text-light">Contact Info</h4>
            <address className="not-italic space-y-2 text-text-light">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-text-light" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                <a href="mailto:info@farmnest.com" className="hover:underline text-text-light">info@farmnest.com</a> {/* Changed email domain */}
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-text-light" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l1.3 9.135a1 1 0 01-.285.86l-1.423 1.423a1 1 0 00-.214 1.055c.156.455.728.745 1.258.745H19a1 1 0 001-1v-5a1 1 0 00-1-1h-1.586a1 1 0 00-.707.293L12 11.586a1 1 0 01-1.414 0L8.414 8.586a1 1 0 00-1.414 0L5.586 10.586a1 1 0 01-1.414 0L2.293 8.293A1 1 0 002 7V3z"/></svg>
                <a href="tel:+919876543210" className="hover:underline text-text-light">+91 98765 43210</a>
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-text-light" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                FarmNest Headquarters, Bhimavaram, AP, India. {/* Changed name in address */}
              </p>
            </address>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-4 border-t border-text-light border-opacity-30 text-center text-text-light text-sm">
          &copy; {new Date().getFullYear()} FarmNest. All rights reserved. {/* Changed copyright name */}
        </div>
      </section>
    </div>
  );
};

export default HomePage;