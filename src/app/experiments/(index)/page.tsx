import Link from 'next/link';

export default function ExperimentsIndex() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Experiments</h1>
            <ul className="space-y-4">
                <li>
                    <Link href="/experiments/shader-landing" className="block p-4 bg-white rounded shadow hover:shadow-md transition">
                        <span className="text-lg font-medium text-blue-600">Shader Landing</span>
                        <p className="text-gray-600">WebGL shader canvas experiment (migrated)</p>
                    </Link>
                </li>
                <li>
                    <Link href="/experiments/chat-button" className="block p-4 bg-white rounded shadow hover:shadow-md transition">
                        <span className="text-lg font-medium text-blue-600">Chat Button</span>
                        <p className="text-gray-600">Interactive chat button (migrated)</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
