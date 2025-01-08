export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#eff6ff" }}>
        <main>{children}</main>
      </body>
    </html>
  );
}
