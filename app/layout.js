import { Poppins } from "next/font/google";
import "./globals.css";
import "react-quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import ReduxWrapper from "./ReduxWrapper";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Home - Food Blogger & Influencer",
  description: "Food Blogger & Influencer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ReduxWrapper>{children}</ReduxWrapper>
      </body>
    </html>
  );
}
