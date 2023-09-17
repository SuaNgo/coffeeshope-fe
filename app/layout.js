import "./globals.css";
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import { CartContextProvider } from "@/context/CartContextProvider";

config.autoAddCss = false; /* eslint-disable import/first */

export const metadata = {
  title: "Nammob",
  description: "Website quản lý bán hàng",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Finger+Paint&family=Josefin+Sans:ital,wght@0,400;0,600;0,700;1,500&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <CartContextProvider>{children}</CartContextProvider>
      </body>
    </html>
  );
}
