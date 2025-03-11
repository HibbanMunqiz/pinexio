import { allDocs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Mdx } from "@/components/mdx-components"
import Breadcrumb from '@/components/bread-crumb'
import { configDocs } from "config/docs";
import Link from 'next/link'

type tParams = Promise<{ slug: string[] }>;

export const generateStaticParams = async () => {
  return allDocs.map((doc) => {
    // For a path like "getting-started/introduction", 
    // this creates { slug: ['getting-started', 'introduction'] }
    const slugArray = doc._raw.flattenedPath.split('/')
    return { slug: slugArray }
  })
}

export const generateMetadata = async ({ params }: { params: tParams }) => {
  // Join the slug array back into a path string
  const awaitedParams = await params
  const path = awaitedParams.slug.join('/')
  const doc = allDocs.find((doc) => doc._raw.flattenedPath === path)

  if (!doc) throw new Error(`Doc not found for slug: ${path}`)
  return { title: doc.title }
}

const DocsPage = async ({ params }: { params: tParams }) => {
  const awaitedParams = await params
  // Join the slug array back into a path string
  const path = awaitedParams.slug.join('/')
  const doc = allDocs.find((doc) => doc._raw.flattenedPath === path)
  const { quickReference } = configDocs;

  if (!doc) notFound()
  return (
    <div className={`grid xl:grid xl:grid-cols-[1fr_270px]`}>
      <article className="overflow-auto">
        <div className="mb-8 text-center">
          <Breadcrumb path={doc.url} />
          {/* {doc.date && (
            <time dateTime={doc.date} className="mb-1 text-xs text-gray-600">
              {format(parseISO(doc.date), 'LLLL d, yyyy')}
            </time>
          )}
          <h1 className="text-3xl font-bold">{doc.title}</h1> */}
        </div>
        <Mdx code={doc.body.code} />
      </article>

      <aside className="fixed right-0 hidden xl:block w-64 p-6 top-16 border-l border-[var(--color-border)] h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="sticky top-0 pb-2">
          <h2 className="text-lg font-semibold text-[var(--color)]">On this page</h2>
        </div>
        <nav className="mt-4">
          <ul className="space-y-4">
            {quickReference[doc.title as keyof typeof quickReference]?.map((item, index) => (
              <li key={index} className="group">
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-200 font-medium transition-colors flex items-center"
                >
                  {item.title}
                </Link>

                {'pages' in item && item.pages.length > 0 && (
                  <ul className="mt-2 ml-4 space-y-2 border-l-2 border-gray-300 pl-3">
                    {item.pages.map((subItem, subIndex) => (
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
    </div>
  )
}

export default DocsPage