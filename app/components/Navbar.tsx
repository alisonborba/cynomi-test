'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (path: React.SetStateAction<string>) => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden md:block">
            Cynomi
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
        >
          {isMenuOpen ? 'X' : '#'}
        </button>
        <div
          className={`w-full md:block md:w-auto ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          id="navbar-default"
        >
          <ul className="items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                aria-current="page"
                onClick={() => handleLinkClick('/')}
              >
                Form
              </Link>
            </li>
            <li>
              <Link
                href="/list"
                onClick={() => handleLinkClick('/leaderboard')}
              >
                List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
