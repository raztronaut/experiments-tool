import "../experiments.css";

export const metadata = {
    title: 'Experiments Index',
    description: 'List of experiments',
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            {/* We can add some basic styles here for the index if we want, or rely on experiments.css */}
            <body className="bg-gray-100 text-gray-900 font-sans p-10">
                {children}
            </body>
        </html>
    );
}
