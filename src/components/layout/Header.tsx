"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

const navLinks = [
  "RATINGS & REVIEWS",
  "NEWS",
  "CIGAR LIFE",
  "BIG SMOKE",
  "THE MAGAZINE",
  "CIGAR 101",
  "VIDEO",
  "FIND A RETAILER",
  "TOP 25",
];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-cream/95 via-warmWhite/98 to-cream/95 backdrop-blur-md border-b border-charcoal/10 shadow-lg">
      {/* Top Section - Logo, Subscribe, Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logos/images.png"
              alt="Cigar Aficionado"
              width={200}
              height={60}
              className="h-8 sm:h-9 md:h-10 lg:h-11 w-auto object-contain"
              priority
            />
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Subscribe Button */}
            <button className="hidden sm:flex items-center justify-center px-5 py-2.5 bg-warmWhite hover:bg-warmWhite/95 text-charcoal font-sans font-semibold text-sm rounded transition-colors duration-200 shadow-sm hover:shadow-md min-h-[44px]">
              Subscribe
            </button>
            
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-charcoal hover:text-gold transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={20} className="stroke-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="border-t border-charcoal/10 bg-gradient-to-r from-warmWhite/80 via-cream/90 to-warmWhite/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center overflow-x-auto scrollbar-hide">
            <ul className="flex items-center gap-4 sm:gap-6 lg:gap-8 py-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-charcoal/90 hover:text-gold font-sans text-xs sm:text-sm font-medium uppercase tracking-wider whitespace-nowrap transition-colors duration-200 relative group"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-200 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-warmWhite/98 backdrop-blur-md border-b border-charcoal/10 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <Search size={20} className="text-charcoal/70" />
              <input
                type="search"
                placeholder="Search..."
                className="flex-1 bg-transparent text-charcoal placeholder-charcoal/50 font-sans text-base outline-none border-b border-charcoal/20 focus:border-gold transition-colors duration-200"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

