/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'qncbnxbxcvvacstnmmdk.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**'
            }
        ]
    }
}

module.exports = nextConfig
