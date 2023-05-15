import Head from "next/head";
import { useRouter, withRouter } from 'next/router'

const SEO = ({ title, description, image}) => {
  const defaultTitle = "Konek GPT",
    defaultDescription = "Konek GPT",
    siteUrl = "https://konekgpt.gnusa.id",
    defaultImage = `${siteUrl}/icongen/android-chrome-192x192.png`,
    twitterUsername = "0121FZZ"
  const router = useRouter()
  

  const seo = {
    title: `${title} - ${defaultTitle}` || defaultTitle,
    description: `${description}` || defaultDescription,
    image: `${image || defaultImage}`,
    url: `${siteUrl}${router.asPath}`
  }

  // console.log(seo);

  return (
    <Head>
      <title>{seo.title}</title>
      <link rel="icon" href="/favicon.ico"/>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="image" content={seo.image} />
      <meta name="application-name" content={seo.title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icongen/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />
      <link rel="apple-touch-icon" href="/icongen/apple-touch-icon.png" />

      {/* <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" /> */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/icongen/android-chrome-192x192.png" color="#5bbad5" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={`@${twitterUsername}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:site_name" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />

    </Head>
  )
}

export default withRouter(SEO)