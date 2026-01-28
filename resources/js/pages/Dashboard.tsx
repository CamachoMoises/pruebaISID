// @refresh reset
import AppLayout from '@/layouts/AppLayout';

interface Stats {
    total_users: number;
    total_instructors: number;
    total_courses: number;
    published_courses: number;
    draft_courses: number;
    total_lessons: number;
    total_comments: number;
    total_ratings: number;
    average_course_rating: number;
}

interface PageProps {
    stats: Stats;
}

export default function Dashboard({ stats }: PageProps) {
    return (
        <AppLayout>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Vista general del sistema de cursos
                    </p>
                </div>
                <div>
                    <button
                        onClick={() => {
                            window.location.href = `/dashboard/sync`;
                        }}
                        className={`inline-flex items-center rounded-md bg-blue-400 px-4 py-2 text-sm font-semibold focus:ring-2`}
                    >
                        <>
                            <svg
                                className="mr-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            Iniciar Sincronización
                        </>
                    </button>
                </div>
                <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">
                            Total Usuarios
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            {stats.total_users}
                        </dd>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">
                            Instructores
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            {stats.total_instructors}
                        </dd>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">
                            Cursos Publicados
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            {stats.published_courses}
                            <span className="ml-2 text-sm font-normal text-gray-500">
                                / {stats.total_courses}
                            </span>
                        </dd>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">
                            Rating Promedio
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            {stats.average_course_rating}
                            <span className="ml-1 text-xl text-yellow-400">
                                ★
                            </span>
                        </dd>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">
                            Total Lecciones
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            {stats.total_lessons}
                        </dd>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">
                            Comentarios
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            {stats.total_comments}
                        </dd>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">
                            Calificaciones
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            {stats.total_ratings}
                        </dd>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">
                            Borradores
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            {stats.draft_courses}
                        </dd>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
