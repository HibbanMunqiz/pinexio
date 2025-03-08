// // app/posts/[slug]/page.tsx
// import { format, parseISO } from 'date-fns'
// import { allDocs } from 'contentlayer/generated'
// import { notFound } from 'next/navigation'
// import { Mdx } from "@/components/mdx-components"

// export const generateStaticParams = async () => {
//   console.log('docs', allDocs)
//   return allDocs.map((docs) => ({ slug: docs._raw.flattenedPath }))
// }

// export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
//   const awaitedParams = await params
//   console.log('awaitedParams', awaitedParams)
//   const docs = allDocs.find((docs) => docs._raw.flattenedPath === awaitedParams.slug)
//   if (!docs) throw new Error(`Post not found for slug: ${params.slug}`)
//   return { title: docs.title }
// }

// const DocsLayout = async ({ params }: { params: { slug: string } }) => {
//   const awaitedParams = await params
//   const docs = allDocs.find((docs) => docs._raw.flattenedPath === awaitedParams.slug)
//   if (!docs) notFound()
//   return (
//     <article className="mx-auto">
//       <div className="mb-8 text-center">
//         <time dateTime={docs.date} className="mb-1 text-xs text-gray-600">
//           {format(parseISO(docs.date), 'LLLL d, yyyy')}
//         </time>
//         <h1 className="text-3xl font-bold">{docs.title}</h1>
//       </div>
//       {/* <div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: docs.body.html }} /> */}
//       <Mdx code={docs.body.code} />
//     </article>
//   )
// }

// export default DocsLayout

import { format, parseISO } from 'date-fns'
import { allDocs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Mdx } from "@/components/mdx-components"
import Breadcrumb from '@/components/bread-crumb'

export const generateStaticParams = async () => {
  return allDocs.map((doc) => {
    // For a path like "getting-started/introduction", 
    // this creates { slug: ['getting-started', 'introduction'] }
    const slugArray = doc._raw.flattenedPath.split('/')
    return { slug: slugArray }
  })
}

export const generateMetadata = async ({ params }: { params: { slug: string[] } }) => {
  // Join the slug array back into a path string
  const awaitedParams = await params
  const path = awaitedParams.slug.join('/')
  const doc = allDocs.find((doc) => doc._raw.flattenedPath === path)
  
  if (!doc) throw new Error(`Doc not found for slug: ${path}`)
  return { title: doc.title }
}

const DocsPage = async ({ params }: { params: { slug: string[] } }) => {
  const awaitedParams = await params
  // Join the slug array back into a path string
  const path = await awaitedParams.slug.join('/')
  const doc = allDocs.find((doc) => doc._raw.flattenedPath === path)
  console.log(doc)
  if (!doc) notFound()
  return (
    <article className="mx-auto">
      <div className="mb-8 text-center">
        <Breadcrumb path={doc.slug}/>
        {doc.date && (
          <time dateTime={doc.date} className="mb-1 text-xs text-gray-600">
            {format(parseISO(doc.date), 'LLLL d, yyyy')}
          </time>
        )}
        <h1 className="text-3xl font-bold">{doc.title}</h1>
      </div>
      <Mdx code={doc.body.code} />
    </article>
  )
}

export default DocsPage