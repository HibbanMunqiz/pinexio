// import createMDX from '@next/mdx';
import { createContentlayerPlugin } from "next-contentlayer2"

// const withMDX = createMDX({
//   extension: /\.mdx?$/,
//   options: {
//     providerImportSource: '@mdx-js/react', // Ensures that MDX files use MDXProvider
//   },
// });

const nextConfig = {
  // pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

// export default withMDX(nextConfig);

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
})

export default withContentlayer(nextConfig)
