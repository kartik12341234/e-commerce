import React from "react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img className="h-20" src="file.svg" />
            <p className="text-sm leading-6 text-white">
              Your all orgainic products are here
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              {/* Add similar elements for other social media icons, updating class to className */}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Solutions
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Marketing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Analytics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Commerce
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Insights
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/lab"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Lab test
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/reciepe"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      reciepe
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Partners
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/rfe.pdf"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Claim
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pp.pdf"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/spf.pdf"
                      className="text-sm leading-6 text-white hover:text-white"
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500">
            &copy; 2024 all organic, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
