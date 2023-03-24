/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

module.exports = {
  images: { domains: ['app.supabase.com', 'get.wallhere.com'] },
  // env: {
  //   API_URL: 'http://localhost:4000'
  // }
}
