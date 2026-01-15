import { SiteFooter } from "@/components/site-footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">{children}</div>
      <div className="w-full max-w-4xl mx-auto px-8 md:px-24">
        <SiteFooter />
      </div>
    </div>
  );
}
