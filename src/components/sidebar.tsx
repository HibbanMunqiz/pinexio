'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/mdx-pages')
      .then((res) => res.json())
      .then((data) => setPages(data));
  }, []);

  // Preload the MDX module on hover.
  // Adjust the import path so it matches your project structure.
  const preloadModule = (slug: string) => {
    import(`@/content/${slug}.mdx`);
  };

  return (
    <nav>
      <ul>
        {pages.map((slug) => (
          <li key={slug} onMouseEnter={() => preloadModule(slug)}>
            <Link href={`/doc/${slug}`}>{slug.replace('-', ' ')}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
