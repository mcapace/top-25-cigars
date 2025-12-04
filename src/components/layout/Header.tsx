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
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-darkBrown/70 via-darkBrown/60 to-charcoal/50 backdrop-blur-xl border-b border-gold/30 shadow-2xl">
      {/* Top Section - Logo, Subscribe, Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-warmWhite font-serif text-lg sm:text-xl font-medium leading-tight drop-shadow-lg">
                cigar
              </span>
              <span className="text-warmWhite font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight -mt-1 drop-shadow-lg">
                aficionado
              </span>
            </div>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Subscribe Button */}
            <button className="hidden sm:flex px-4 py-2 bg-warmWhite hover:bg-cream text-charcoal font-sans font-semibold text-sm rounded-md transition-colors duration-200 shadow-md hover:shadow-lg">
              Subscribe
            </button>
            
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-warmWhite hover:text-gold transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={20} className="stroke-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="border-t border-gold/30 bg-gradient-to-r from-charcoal/40 via-darkBrown/35 to-charcoal/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
            <ul className="flex items-center gap-4 sm:gap-6 lg:gap-8 py-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-warmWhite/90 hover:text-gold font-sans text-xs sm:text-sm font-medium uppercase tracking-wider whitespace-nowrap transition-colors duration-200 relative group"
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
        <div className="absolute top-full left-0 right-0 bg-charcoal/98 backdrop-blur-md border-b border-charcoal/30 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <Search size={20} className="text-warmWhite/70" />
              <input
                type="search"
                placeholder="Search..."
                className="flex-1 bg-transparent text-warmWhite placeholder-warmWhite/50 font-sans text-base outline-none border-b border-warmWhite/20 focus:border-gold transition-colors duration-200"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

