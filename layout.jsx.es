import "./globals.css";

export const metadata = {
  title: "Vercel Game Hub",
  description: "Portal mini game casual siap deploy ke Vercel."
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
