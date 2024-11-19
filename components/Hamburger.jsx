// HamburgerMenu.jsx
import { useState } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
const Hamburger = ({ navigation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden bg-white p-2 text-gray-400"
      >
        <span className="sr-only">Open menu</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <Dialog
          as="div"
          className="lg:hidden"
          onClose={() => setMobileMenuOpen(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 z-50" />
          <div className="fixed inset-0 flex z-50">
            <Dialog.Panel className="relative ml-auto w-full max-w-xs bg-white shadow-lg">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-medium">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <nav>
                <ul>
                  {navigation.categories.map((category) => (
                    <li key={category.name}>
                      <a href="#" className="block p-4 text-gray-700">
                        {category.name}
                      </a>
                    </li>
                  ))}
                  {navigation.pages.map((page) => (
                    <li key={page.name}>
                      <a href={page.href} className="block p-4 text-gray-700">
                        {page.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Hamburger;
