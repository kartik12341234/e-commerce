import "./globals.css";
import RootLayout from "./RootLayout";

export const metadata = {
  title: "OIL Site",
  description: "a oil site",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      {/* <head>
       
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head> */}
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
