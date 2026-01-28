import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />

            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Laravel + Inertia + React
                    </h1>
                    <p className="mt-4 text-gray-600">
                        Tu aplicación está lista para empezar 🚀
                    </p>
                </div>
            </div>
        </>
    );
}