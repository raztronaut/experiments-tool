import "../experiments.css";

export const metadata = {
  title: 'Test Empty',
  description: 'just showing what an empty experiment looks like',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
