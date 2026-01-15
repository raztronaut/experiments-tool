import "../experiments.css";

export const metadata = {
    title: 'Chat Button Experiment',
    description: 'Isolated experiment',
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
