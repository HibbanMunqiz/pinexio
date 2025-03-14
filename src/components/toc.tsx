import React from 'react';
import Link from 'next/link';
import { TocData } from "config/toc";

interface TocItems {
  title: string;
  href: string;
  pages?: TocItems[];
}

interface TocProps {
  doc: {
    title: string;
  };
}

const Toc: React.FC<TocProps> = ({ doc }) => {

  return (
    <aside className="fixed right-0 hidden xl:block w-64 p-6 top-16 border-l border-[var(--color-border)] h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="top-0 pb-2">
        <h2 className="font-semibold text-[var(--color)]">On this page</h2>
      </div>
      <nav className="mt-4">
        <ul className="space-y-3">
          {TocData[doc.title as keyof typeof TocData]?.map((item: any, index: any) => (
            <li key={index} className="group">
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-200 font-normal transition-colors flex items-center"
              >
                {item.title}
              </Link>

              {'pages' in item && item.pages && item.pages.length > 0 && (
                <ul className="mt-2 ml-4 space-y-2 border-l-2 border-gray-300 pl-3">
                  {item.pages.map((subItem: any, subIndex: any) => (
                    <li key={subIndex} className="text-sm">
                      <Link
                        href={subItem.href}
                        className="text-gray-600 font-regular dark:text-gray-200 transition-colors block py-1"
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Toc;