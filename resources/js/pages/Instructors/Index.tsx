import { Head, Link } from '@inertiajs/react';
import {
    Instructor,
    PaginatedData,
    Comment,
    Rating,
    User,
} from '@/types/models';
import AppLayout from '@/layouts/AppLayout';

type InstructorWithActivity = Instructor & {
    courses_count: number;
    comments: (Comment & { user: User })[];
    ratings: (Rating & { user: User })[];
};

interface Props {
    instructors: PaginatedData<InstructorWithActivity>;
}

export default function Index({ instructors }: Props) {
    return (
        <AppLayout>
            <Head title="Instructores" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="mb-8 border-b pb-4 text-3xl font-bold">
                                Nuestros Instructores
                            </h1>

                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                {instructors.data.map((instructor) => (
                                    <div
                                        key={instructor.id}
                                        className="flex flex-col rounded-xl border border-gray-200 bg-gray-50/50 p-6 transition-all hover:shadow-lg"
                                    >
                                        <div className="mb-4 flex items-start justify-between">
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-800">
                                                    {instructor.name}
                                                </h2>
                                                <p className="text-sm font-medium text-blue-600">
                                                    {instructor.email}
                                                </p>
                                            </div>
                                            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                                                {instructor.courses_count}{' '}
                                                Cursos
                                            </span>
                                        </div>

                                        <p className="mb-6 line-clamp-2 text-gray-600 italic">
                                            "{instructor.bio}"
                                        </p>

                                        <div className="mt-auto grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {/* Recent Comments */}
                                            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                                                <h3 className="font-uppercase mb-3 text-xs font-bold tracking-wider text-gray-400">
                                                    ÚLTIMOS COMENTARIOS
                                                </h3>
                                                {instructor.comments.length >
                                                0 ? (
                                                    <ul className="space-y-3">
                                                        {instructor.comments.map(
                                                            (comment) => (
                                                                <li
                                                                    key={
                                                                        comment.id
                                                                    }
                                                                    className="text-sm"
                                                                >
                                                                    <span className="font-semibold text-gray-700">
                                                                        {
                                                                            comment
                                                                                .user
                                                                                ?.name
                                                                        }
                                                                        :
                                                                    </span>
                                                                    <p className="line-clamp-1 text-gray-600">
                                                                        {
                                                                            comment.content
                                                                        }
                                                                    </p>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                ) : (
                                                    <p className="text-xs text-gray-400 italic">
                                                        Sin comentarios aún
                                                    </p>
                                                )}
                                            </div>

                                            {/* Recent Ratings */}
                                            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                                                <h3 className="font-uppercase mb-3 text-xs font-bold tracking-wider text-gray-400">
                                                    ÚLTIMAS CALIFICACIONES
                                                </h3>
                                                {instructor.ratings.length >
                                                0 ? (
                                                    <ul className="space-y-3">
                                                        {instructor.ratings.map(
                                                            (rating) => (
                                                                <li
                                                                    key={
                                                                        rating.id
                                                                    }
                                                                    className="flex items-center justify-between text-sm"
                                                                >
                                                                    <span className="mr-2 truncate text-gray-700">
                                                                        {
                                                                            rating
                                                                                .user
                                                                                ?.name
                                                                        }
                                                                    </span>
                                                                    <div className="flex text-yellow-400">
                                                                        {'★'.repeat(
                                                                            rating.rating,
                                                                        )}
                                                                        {'☆'.repeat(
                                                                            5 -
                                                                                rating.rating,
                                                                        )}
                                                                    </div>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                ) : (
                                                    <p className="text-xs text-gray-400 italic">
                                                        Sin calificaciones aún
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {instructors.data.length === 0 && (
                                <p className="py-10 text-center text-gray-500">
                                    No hay instructores registrados actualmente.
                                </p>
                            )}

                            {/* Pagination Controls */}
                            {instructors.total > instructors.per_page && (
                                <div className="mt-12 flex justify-center">
                                    <nav className="inline-flex rounded-md shadow-sm">
                                        {instructors.links.map(
                                            (link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                    className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                                                        link.active
                                                            ? 'z-10 border-blue-600 bg-blue-600 text-white'
                                                            : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                                                    } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                        index ===
                                                        instructors.links
                                                            .length -
                                                            1
                                                            ? 'rounded-r-md'
                                                            : ''
                                                    } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                                />
                                            ),
                                        )}
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
