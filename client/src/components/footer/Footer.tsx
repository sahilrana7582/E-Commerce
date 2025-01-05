const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-lg hover:text-blue-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg hover:text-blue-400 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg hover:text-blue-400 transition-colors"
                >
                  Press Releases
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-lg hover:text-blue-400 transition-colors"
                >
                  Help
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg hover:text-blue-400 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="text-lg mb-4">123 Street, Chandigarh, India</p>
            <p className="text-lg mb-4">Phone: +123 456 7890</p>
            <p className="text-lg mb-4">Email: sahilrana27582@gmail.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} Sahil Rana. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
