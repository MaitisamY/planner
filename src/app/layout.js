import './globals.css'

export const metadata = {
  title: 'PLANNER',
  description: `Planner is a simple daily tasks maintainer app built on Next.js framework, 
  designed to assist users in managing their tasks efficiently. It provides essential features such as task creation, editing, 
  marking as completed or pending, and deletion. The app utilizes local storage to persist tasks and related functionalities.`,
  author: 'Aitisam Yaseen',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        {/* <link rel="icon" type="image/icon" href="/planner-icon.png" sizes="any" /> */}
        <link rel="icon" type="image/icon" href="/planner-favicon.png" sizes="any" />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}