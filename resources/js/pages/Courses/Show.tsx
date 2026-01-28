// resources/js/Pages/Courses/Show.tsx
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import {
    Course,
    Instructor,
    Lesson,
    Comment,
    Rating,
    User,
} from '@/types/models';

interface CourseWithRelations extends Course {
    instructor: Instructor;
    lessons: Lesson[];
    comments: (Comment & { user: User })[];
    ratings: (Rating & { user: User })[];
    favoritedBy: User[];
}

interface Props {
    course: CourseWithRelations;
    averageRating: number;
    totalRatings: number;
    totalStudents: number;
    lessonsCount: number;
}

export default function Show({
    course,
    averageRating,
    totalRatings,
    totalStudents,
    lessonsCount,
}: Props) {
    // Calcular porcentaje de cada rating
    const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
        const count = course.ratings.filter((r) => r.rating === stars).length;
        const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
        return { stars, count, percentage };
    });

    return (
        <AppLayout>
            <Head title={course.title} />
            <div>
                <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="mb-4 flex items-center space-x-2">
                                <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                                    {course.status}
                                </span>
                                {course.price === 0 && (
                                    <span className="rounded-full bg-yellow-600 px-3 py-1 text-xs font-semibold text-white">
                                        GRATIS
                                    </span>
                                )}
                            </div>

                            <h1 className="mb-4 text-4xl font-bold">
                                {course.title}
                            </h1>

                            <p className="mb-6 text-lg">{course.description}</p>

                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center">
                                    <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                                        {course.instructor.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            Instructor
                                        </p>
                                        <p>{course.instructor.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <svg
                                        className="mr-2 h-5 w-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <div>
                                        <p className="font-medium">
                                            Calificación
                                        </p>
                                        <p>
                                            {averageRating} ({totalRatings}{' '}
                                            reseñas)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <svg
                                        className="mr-2 h-5 w-5 text-blue-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.67 3.623a10.95 10.95 0 01-.671 5.197"
                                        />
                                    </svg>
                                    <div>
                                        <p className="font-medium">
                                            Estudiantes
                                        </p>
                                        <p>{totalStudents.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <svg
                                        className="mr-2 h-5 w-5 text-green-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                    <div>
                                        <p className="font-medium">Lecciones</p>
                                        <p>{lessonsCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        {course.price === 0 ? (
                                            <span className="text-3xl font-bold">
                                                GRATIS
                                            </span>
                                        ) : (
                                            <>
                                                <span className="text-3xl font-bold">
                                                    €{course.price}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <ul className="space-y-">
                                        <li className="flex items-center">
                                            {lessonsCount} lecciones en video
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Sección de Lecciones */}
                        <div className="lg:col-span-2">
                            <div className="mb-8 rounded-lg p-6 shadow-md">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                                    Contenido del Curso
                                </h2>
                                <div className="space-y-2">
                                    {course.lessons.map((lesson, index) => (
                                        <div
                                            key={lesson.id}
                                            className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                                        >
                                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">
                                                    {lesson.title}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {lesson.description}
                                                </p>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Lección {lesson.order}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sección de Comentarios */}
                            <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                    Comentarios ({course.comments.length})
                                </h2>
                                <div className="space-y-6">
                                    {course.comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="border-b border-gray-100 pb-6 last:border-0"
                                        >
                                            <div className="mb-3 flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                                                        {comment.user.name.charAt(
                                                            0,
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">
                                                            {comment.user.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(
                                                                comment.created_at,
                                                            ).toLocaleDateString(
                                                                'es-ES',
                                                                {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                },
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-700">
                                                {comment.content}
                                            </p>
                                        </div>
                                    ))}

                                    {course.comments.length === 0 && (
                                        <p className="py-8 text-center text-gray-500">
                                            No hay comentarios aún. ¡Sé el
                                            primero en comentar!
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Ratings y Favoritos */}
                        <div className="lg:col-span-1">
                            {/* Distribución de Ratings */}
                            <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">
                                    Calificaciones
                                </h3>
                                <div className="mb-4">
                                    <div className="flex items-center">
                                        <div className="mr-4 text-4xl font-bold text-gray-900">
                                            {averageRating}
                                        </div>
                                        <div>
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg
                                                        key={star}
                                                        className={`h-5 w-5 ${star <= Math.round(averageRating) ? 'text-yellow-400' : ''}`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {totalRatings} calificaciones
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {ratingDistribution.map(
                                        ({ stars, count, percentage }) => (
                                            <div
                                                key={stars}
                                                className="flex items-center"
                                            >
                                                <div className="flex w-20 items-center">
                                                    <span className="text-sm text-gray-600">
                                                        {stars} estrellas
                                                    </span>
                                                </div>
                                                <div className="mx-2 h-2 flex-1 rounded-full bg-gray-200">
                                                    <div
                                                        className="h-2 rounded-full bg-yellow-400"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="w-10 text-sm text-gray-600">
                                                    {count}
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* Reviews Recientes */}
                            <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">
                                    Ultimas receñas
                                </h3>
                                <div className="space-y-4">
                                    {course.ratings
                                        .slice(0, 3)
                                        .map((rating) => (
                                            <div
                                                key={rating.id}
                                                className="border-b border-gray-100 pb-4 last:border-0"
                                            >
                                                <div className="mb-2 flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                                                            {rating.user.name.charAt(
                                                                0,
                                                            )}
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {rating.user.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        {[1, 2, 3, 4, 5].map(
                                                            (star) => (
                                                                <svg
                                                                    key={star}
                                                                    className={`h-4 w-4 ${star <= rating.rating ? 'text-yellow-400' : ''}`}
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                                {rating.review && (
                                                    <p className="text-sm text-gray-600">
                                                        {rating.review}
                                                    </p>
                                                )}
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {new Date(
                                                        rating.created_at,
                                                    ).toLocaleDateString(
                                                        'es-ES',
                                                    )}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Usuarios que marcaron como favorito */}
                            <div className="rounded-lg bg-white p-6 shadow-md">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">
                                    Favorito de
                                </h3>
                                <div className="space-y-3">
                                    {/* {course.favoritedBy.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center"
                                        >
                                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-sm font-bold text-yellow-600">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">
                                                    {user.name}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    Usuario
                                                </p>
                                            </div>
                                            <div className="ml-auto">
                                                <svg
                                                    className="h-5 w-5 text-yellow-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                        </div>
                                    ))} */}
                                    {/* 
                                    {course.favoritedBy.length === 0 && (
                                        <p className="py-4 text-center text-gray-500">
                                            Nadie ha marcado este curso como
                                            favorito aún.
                                        </p>
                                    )}

                                    {course.favoritedBy.length > 0 && (
                                        <div className="pt-4 text-center">
                                            <p className="text-sm text-gray-600">
                                                {course.favoritedBy.length}{' '}
                                                {course.favoritedBy.length === 1
                                                    ? 'persona'
                                                    : 'personas'}{' '}
                                                marcó como favorito
                                            </p>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
