import './globals.css'

export const metadata = {
  title: 'Next To do List App',
  description: 'To do list application for personal use by Aitisam Yaseen',
  keywords: 'next, react, javascript, todo, list, app',
  author: 'Aitisam Yaseen',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <link rel="icon" type="image/icon" href="/icon.png" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  )
}
