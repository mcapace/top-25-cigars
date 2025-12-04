"use client";

import Link from "next/link";
import { ChevronUp, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const helpLinks = [
  "FAQ/Contact Us",
  "Customer Care",
  "Sell Our Magazine",
  "Back Issues",
  "Cigar Aficionado Products",
  "Find a Retailer",
  "Advertise with Us",
  "Privacy Policy",
  "Terms of Service",
];

const shankenLinks = [
  "Wine Spectator",
  "Whisky Advocate",
  "Market Watch",
  "Impact / Impact Databank",
  "Shanken News Daily",
];

const subscriptionLinks = [
  "Print Subscription",
  "Digital Subscription",
  "Gift Subscription",
  "Cigar Insider",
  "Cigar Watch",
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-darkBrown/75 via-charcoal/70 to-charcoal/75 backdrop-blur-xl border-t border-gold/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Social Media Section */}
        <div className="mb-10 pb-8 border-b border-cream/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <h3 className="text-cream font-sans font-bold text-base sm:text-lg">
              Follow Us On:
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/cigaraficionado"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-gold transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/cigaraficionado"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-gold transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://twitter.com/cigaraficionado"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-gold transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://www.youtube.com/cigaraficionado"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-gold transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
          {/* Help Column */}
          <div>
            <h4 className="text-cream font-sans font-bold text-sm uppercase tracking-wider mb-4">
              Help
            </h4>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-cream/70 hover:text-gold font-sans text-sm transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* M. Shanken Communications Column */}
          <div>
            <h4 className="text-cream font-sans font-bold text-sm uppercase tracking-wider mb-4">
              M. Shanken Communications
            </h4>
            <ul className="space-y-2">
              {shankenLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-cream/70 hover:text-gold font-sans text-sm transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscriptions Column */}
          <div>
            <h4 className="text-cream font-sans font-bold text-sm uppercase tracking-wider mb-4">
              Subscriptions
            </h4>
            <ul className="space-y-2">
              {subscriptionLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-cream/70 hover:text-gold font-sans text-sm transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright and Return to Top */}
        <div className="pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/60 font-sans text-xs sm:text-sm text-center sm:text-left">
            © Cigar Aficionado Online, M. Shanken Communications, Inc. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-cream/70 hover:text-gold font-sans text-xs sm:text-sm transition-colors duration-200 group"
            aria-label="Return to top"
          >
            <span>Return to top.</span>
            <div className="p-2 bg-cream/10 hover:bg-gold/20 rounded border border-cream/20 group-hover:border-gold/40 transition-colors duration-200">
              <ChevronUp size={16} className="text-cream/70 group-hover:text-gold" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

