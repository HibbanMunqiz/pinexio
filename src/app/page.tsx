'use client';
import { Github } from 'lucide-react'
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { Button } from '@/components/button'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex-1">
            {/* Empty space for layout balance */}
          </div>
          <nav className="flex-1 flex justify-center">
            {/* Navigation links can be added here */}
          </nav>
          <div className="flex-1 flex gap-2 justify-end">
            <ModeToggle />
            <Button onClick={() => router.push('https://github.com/sanjayc208/pinedocs')}>
              <Github className="h-[1.2rem] w-[1.2rem] transition-all" /></Button>
          </div>
        </div>
      </header>

      {/* Main Content - will flex-grow to fill available space */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 py-4 md:py-8">
        <div className="container mx-auto flex flex-col items-center max-w-6xl">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex gap-2 lg:gap-4 justify-center xs:px-2">
              <Image
                alt="logo"
                className="h-auto w-auto dark:invert"
                width={100}
                height={100}
                src={`/logos/pinedocs.png`}
              />
              <h1 className="text-3xl content-center md:text-6xl font-stretch-110% -tracking-tighter text-gray-900 dark:text-white">
                PINE<span className="md:text-7xl">D</span>OCS
              </h1>
            </div>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A customizable open-source documentation template built with Next.js 15,
              Tailwind CSS 4, and Contentlayer for beautiful, fast, and flexible documentation.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-row sm:flex-row gap-4 mt-8">
            <Button className="px-6 py-3 text-md " variant={'primary'} onClick={() => router.push('/docs/getting-started/introduction')}>Get Started</Button>
            <Button className="px-6 py-3 text-md gap-2" variant={'outline'} onClick={() => router.push('https://github.com/sanjayc208/pinedocs')}>
              <Github size={20} />
              GitHub
            </Button>
          </div>

          {/* Technology Logos */}
          <div className="mt-16 mb-6">
            {/* <p className="text-center mb-3 underline text-gray-600 dark:text-gray-400">Built with</p> */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {/* Next.js */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    width={100}
                    height={100}
                    src="/logos/next15.png"
                    alt="Next.js Logo"
                    className="dark:invert"
                  />
                </div>
                <span className="mt-2 text-sm">Next.js 15</span>
              </div>

              {/* Typescript */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    width={100}
                    height={100}
                    alt={'ts logo'}
                    src="/logos/ts.png"
                    className="dark:invert"
                  />
                </div>
                <span className="mt-2 text-sm">Typescript</span>
              </div>

              {/* Tailwind CSS */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    width={100}
                    height={100}
                    src={`/logos/tailwindcss-light.png`}
                    alt="Tailwind CSS Logo"
                    className="w-10 h-10 dark:invert"
                  />
                </div>
                <span className="mt-2 text-sm">Tailwind CSS 4</span>
              </div>

              {/* Contentlayer */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    width={100}
                    height={100}
                    src="/logos/contentlayer.png"
                    alt="Contentlayer Logo"
                    className="h-12 block"
                  />
                </div>
                <span className="mt-2 text-sm">Contentlayer</span>
              </div>

              {/* MDX */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    width={100}
                    height={100}
                    src="/logos/mdx.png"
                    alt="MDX Logo"
                    className=""
                  />
                </div>
                <span className="mt-2 text-sm">MDX</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 z-10 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
        <div className="container text-sm mx-auto px-4 py-3 text-center text-gray-600 dark:text-gray-400">
          <p>PINEDOCS - Open Source Documentation Template</p>
        </div>
      </footer>
    </div>
  )
}