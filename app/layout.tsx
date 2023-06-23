export const metadata = {
  title: 'frontend pakages manager',
  description: 'testing frontend pakages',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
