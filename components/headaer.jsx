"use client";
import { Fragment, useEffect, useState } from "react";
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
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const navigation = {
  categories: [
    {
      id: "Products",
      name: "Products",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://www.anveshan.farm/cdn/shop/files/moringa_safron.jpg?v=1727333767&width=360",
          imageAlt: "Moringa and saffron products.",
        },
        {
          name: "Basic oils",
          href: "#",
          imageSrc:
            "https://www.anveshan.farm/cdn/shop/files/anveshan-hallikar-cow-ghee_500g.jpg?v=1722855359&width=360",
          imageAlt: "Close up of various oils.",
        },
      ],
      sections: [
        {
          id: "oil",
          name: "Oil",
          items: [
            { name: "Sunflower Oil", href: "#" },
            { name: "Coconut Oil", href: "#" },
            { name: "Olive Oil", href: "#" },
            { name: "Almond Oil", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="hm" style={{ zIndex: "10000" }}>
      <div className="bg-white relative">
        <Dialog
          open={open}
          onClose={setOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              <TabGroup className="mt-2">
                <div className="border-b border-gray-200">
                  <TabList className="-mb-px flex space-x-8 px-4">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900"
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </TabList>
                </div>
                <TabPanels>
                  {navigation.categories.map((category) => (
                    <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                      {/* Mobile view category panels */}
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>

              <div className="border-t border-gray-200 px-4 py-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <Link href="/register" className="-m-2 block p-2 font-medium text-gray-900">
                    Create account
                  </Link>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <header className="relative bg-white">
          <p className="flex h-10 items-center justify-center bg-black text-sm font-medium text-white">
            Get free delivery on orders over ₹400/-
          </p>
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="lg:hidden bg-white p-2 text-gray-400"
                >
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="ml-4 flex lg:ml-0">
                  <a href="/">
                    <img src="file.svg" alt="" className="h-8 w-auto" />
                  </a>
                </div>

                <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700">
                          {category.name}
                        </PopoverButton>
                        <PopoverPanel
                          className="absolute z-50 inset-x-0 top-full text-sm text-gray-500"
                          static
                        >
                          <div className="absolute inset-0 top-1/2 bg-white shadow" />
                          <div className="relative bg-white">
                            <div className="mx-auto max-w-7xl px-8">
                              <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                  {category.featured.map((item) => (
                                    <div key={item.name} className="group relative text-base">
                                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                        <img src={item.imageSrc} alt={item.imageAlt} className="object-cover" />
                                      </div>
                                      <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                        {item.name}
                                      </a>
                                    </div>
                                  ))}
                                </div>
                                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10">
                                  {category.sections.map((section) => (
                                    <div key={section.name}>
                                      <p className="font-medium text-gray-900">
                                        {section.name}
                                      </p>
                                      <ul className="mt-6 space-y-6">
                                        {section.items.map((item) => (
                                          <li key={item.name} className="flow-root">
                                            <a href={item.href} className="text-gray-500">
                                              {item.name}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>
                    ))}
                  </div>
                </PopoverGroup>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}
