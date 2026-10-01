import "./globals.css";

export const metadata = {
  title: "Game Arena",
  description: "Portal mini game browser dengan tema terang dan gelap."
};

const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem('game-arena-theme');
    var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = saved || preferred;
  } catch (error) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
