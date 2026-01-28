import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

import {
    Course,
    PaginatedData,
    Instructor,
    Comment,
    Rating,
    User,
} from '@/types/models';

type CourseWithRelations = Course & {
    instructor: Instructor;
    lessons_count: number;
    comments: (Comment & { user: User })[];
    ratings: (Rating & { user: User })[];
};

interface Props {
    courses: PaginatedData<CourseWithRelations>;
}

export default function Index({ courses }: Props) {
    const { delete: destroy, processing } = useForm();
    return (
        <AppLayout>
            <Head title="Cursos" />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            Cursos
                        </h1>
                        <span className="text-sm font-medium text-gray-500">
                            Mostrando {courses.from} - {courses.to} de{' '}
                            {courses.total} resultados
                        </span>
                        <Link
                            href="/courses/create"
                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                        >
                            <svg
                                className="mr-2 h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Nuevo Curso
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.data.map((course) => (
                            <div
                                key={course.id}
                                className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl"
                            >
                                <div className="relative aspect-video overflow-hidden bg-gray-200">
                                    <div className="flex h-full items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 text-gray-400">
                                        <svg
                                            className="h-12 w-12"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>

                                    <button
                                        onClick={() => {
                                            if (
                                                !confirm(
                                                    '¿Seguro que deseas eliminar este curso?',
                                                )
                                            )
                                                return;
                                            destroy(`/courses/${course.id}`);
                                        }}
                                        disabled={processing}
                                        className="absolute top-4 left-4 rounded bg-red-600/90 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700"
                                    >
                                        Eliminar
                                    </button>

                                    <button
                                        onClick={() => {
                                            window.location.href = `/courses/${course.id}/edit`;
                                        }}
                                        className="absolute top-4 left-1/2 -translate-x-1/2 rounded bg-white/90 px-2 py-1 text-xs font-semibold text-gray-800 shadow-sm hover:bg-gray-100"
                                    >
                                        Editar
                                    </button>
                                    <div className="absolute top-4 right-4 rounded bg-white/90 px-2 py-1 text-sm font-bold text-blue-600 shadow-sm backdrop-blur">
                                        €{course.price}
                                    </div>
                                </div>

                                <div className="flex grow flex-col p-6">
                                    <div className="mb-2 flex items-center gap-2">
                                        <span className="text-xs font-bold tracking-wider text-blue-500 uppercase">
                                            {course.lessons_count} Lecciones
                                        </span>
                                        <span className="text-gray-300">•</span>
                                        <div className="flex items-center text-yellow-500">
                                            <span className="mr-1 text-xs font-bold">
                                                {course.average_rating}
                                            </span>
                                            <svg
                                                className="h-3 w-3 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/courses/${course.id}`}
                                        className="inline-block"
                                    >
                                        <h2 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                            {course.title}
                                        </h2>
                                    </Link>

                                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                                        {course.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                        <div className="flex items-center">
                                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                                                {course.instructor.name.charAt(
                                                    0,
                                                )}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">
                                                {course.instructor.name}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {course.total_students} Estudiantes
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {courses.data.length === 0 && (
                        <div className="rounded-xl border border-gray-200 bg-white py-20 text-center shadow-sm">
                            <p className="text-lg text-gray-500">
                                No se encontraron cursos disponibles en este
                                momento.
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {courses.total > courses.per_page && (
                        <div className="mt-12 flex justify-center">
                            <nav className="inline-flex -space-x-px overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm">
                                {courses.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                            link.active
                                                ? 'z-10 border-blue-600 bg-blue-600 text-white'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        } ${!link.url ? 'pointer-events-none cursor-not-allowed opacity-50' : ''} border-r last:border-r-0`}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
