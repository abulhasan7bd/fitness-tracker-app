import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <p>Email: support@roommatefinder.com</p>
          <p>Phone: +1 234 567 8901</p>
          <p>Address: 123 Main Street, NY, USA</p>
        </div>

        {/* Terms & Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">Contact Page</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/AbulHasanFB" target="_blank" rel="noreferrer">
              <FaFacebook size={24} className="hover:text-blue-500" />
            </a>
            <a href="https://www.facebook.com/AbulHasanFB" target="_blank" rel="noreferrer">
              <FaTwitter size={24} className="hover:text-blue-400" />
            </a>
            <a href="https://www.facebook.com/AbulHasanFB" target="_blank" rel="noreferrer">
              <FaInstagram size={24} className="hover:text-pink-500" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} Roommate Finder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
