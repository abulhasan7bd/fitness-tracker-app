import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Fitness Tracker</h3>
          <p className="text-gray-400">
            Helping you stay fit and healthy with personalized tracking and motivation.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/features" className="hover:text-white">Features</a></li>
            <li><a href="/trainers" className="hover:text-white">Trainers</a></li>
            <li><a href="/blog" className="hover:text-white">Blog</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
          <p>email@example.com</p>
          <p>+880 1234 567890</p>

          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white">
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.012 3.676 9.163 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.163 22 17.012 22 12z" />
              </svg>
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-white">
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.46 6c-.77.35-1.5.58-2.27.69a4.1 4.1 0 001.8-2.27c-.8.48-1.66.83-2.58 1.02a4.11 4.11 0 00-7 3.75A11.65 11.65 0 013 5.15a4.1 4.1 0 001.27 5.48 4 4 0 01-1.86-.51v.05a4.11 4.11 0 003.3 4 4.1 4.1 0 01-1.85.07 4.11 4.11 0 003.83 2.85A8.23 8.23 0 012 19.54a11.64 11.64 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.52A8.36 8.36 0 0022.46 6z" />
              </svg>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white">
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 2a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 text-sm">
        &copy; {new Date().getFullYear()} Fitness Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
