import "./globals.css"; 

export const metadata = {
  title: "SafePurdue", 
  description: "Survivor-centered decision-support tool for Purdue students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
