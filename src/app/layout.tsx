import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar'
import './globals.css'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Metadata } from 'next'
import Script from 'next/script'
import { Adaptirebuli, GeoGza, firaGo } from '@/styles/fonts'

export const metadata: Metadata = {
  title: 'Followajara',
  description: "აჭარის ტურიზმის დეპარტამენტმა შიდა ტურიზმის სტიმულირების მიზნით დაიწყო სარეკლამო კამპანია „გამომყევი აჭარაში“, რომლის ფარგლებშიც ქართველ ბლოგერებს, მოგზაურებს, ინფლუენსერებს, ფოტოგრაფ/ვიდეოგრაფებსა და ცნობილ სახეებს საშუალება ეძლევათ იმოგზაურონ აჭარაში, შექმნან საინტერესო კონტენტი, გაუზიარონ გამომწერებს და მოიგონ კამპანიის მთავარი პრიზი 100, 000 ლარი",
  openGraph: {
    title: 'Followajara',
    description: "აჭარის ტურიზმის დეპარტამენტმა შიდა ტურიზმის სტიმულირების მიზნით დაიწყო სარეკლამო კამპანია „გამომყევი აჭარაში“, რომლის ფარგლებშიც ქართველ ბლოგერებს, მოგზაურებს, ინფლუენსერებს, ფოტოგრაფ/ვიდეოგრაფებსა და ცნობილ სახეებს საშუალება ეძლევათ იმოგზაურონ აჭარაში, შექმნან საინტერესო კონტენტი, გაუზიარონ გამომწერებს და მოიგონ კამპანიის მთავარი პრიზი 100, 000 ლარი",
  },
}


export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  const userId = session?.user.id

  let { data, error, status } = await supabase
    .from('profiles')
    .select(`*`)
    .eq('id', userId)
    .single()

  return (
    <html lang="en">
      <Script id="gllogleApi" async src="https://www.googletagmanager.com/gtag/js?id=G-YB0QW5TRGT" />
      <Script id="scrt">
        {` window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-YB0QW5TRGT');`}
      </Script>
      <body className={`${firaGo.variable} ${Adaptirebuli.variable} ${GeoGza.variable} font-fira-go`}>
        <Navbar metadata={data} />
        <main className='main'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}