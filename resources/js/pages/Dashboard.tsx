// @refresh reset
import AppLayout from '@/layouts/AppLayout';
import { usePage } from '@inertiajs/react';

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
    const page = usePage();

    return (
        <AppLayout>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Vista general del sistema de cursos
                    </p>
                </div>

                {/* Stats Grid */}
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
