// resources/js/Pages/Courses/FormCourse.tsx
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Instructor, Course } from '@/types/models';

interface Props {
    course?: Course; // Opcional, para modo edición
    instructors: Instructor[];
    isEditing?: boolean;
}

export default function FormCourse({
    course,
    instructors,
    isEditing = false,
}: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        instructor_id: course?.instructor_id || '',
        title: course?.title || '',
        description: course?.description || '',
        level: course?.level || 'principiante',
        price: course?.price?.toString() || '',
        status: course?.status || 'borrador',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && course) {
            // Usar put para actualización
            put(`/courses/${course.id}`, {
                onSuccess: () => reset(),
            });
        } else {
            // Usar post para creación
            post('/courses', {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <AppLayout>
            <Head
                title={
                    isEditing ? `Editar: ${course?.title}` : 'Crear Nuevo Curso'
                }
            />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link
                            href="/courses"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800"
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
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Volver a Cursos
                        </Link>
                        <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
                            {isEditing
                                ? `Editar: ${course?.title}`
                                : 'Crear Nuevo Curso'}
                        </h1>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Instructor */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Instructor
                                </label>
                                <select
                                    value={data.instructor_id}
                                    onChange={(e) =>
                                        setData('instructor_id', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                    required
                                >
                                    <option value="">
                                        Seleccionar Instructor
                                    </option>
                                    {instructors.map((instructor) => (
                                        <option
                                            key={instructor.id}
                                            value={instructor.id}
                                        >
                                            {instructor.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.instructor_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.instructor_id}
                                    </p>
                                )}
                            </div>

                            {/* Título */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Título del Curso
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Descripción */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {/* Nivel */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nivel
                                    </label>
                                    <select
                                        value={data.level}
                                        onChange={(e) =>
                                            setData(
                                                'level',
                                                e.target.value as
                                                    | 'principiante'
                                                    | 'intermedio'
                                                    | 'avanzado',
                                            )
                                        }
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="principiante">
                                            Principiante
                                        </option>
                                        <option value="intermedio">
                                            Intermedio
                                        </option>
                                        <option value="avanzado">
                                            Avanzado
                                        </option>
                                    </select>
                                    {errors.level && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.level}
                                        </p>
                                    )}
                                </div>

                                {/* Precio */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Precio ($)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData('price', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                    {errors.price && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>

                                {/* Estado */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Estado
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData(
                                                'status',
                                                e.target.value as
                                                    | 'borrador'
                                                    | 'published'
                                                    | 'archived',
                                            )
                                        }
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="borrador">
                                            Borrador
                                        </option>
                                        <option value="publicado">
                                            Publicado
                                        </option>
                                        <option value="archivado">
                                            Archivado
                                        </option>
                                    </select>
                                    {errors.status && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-3 pt-6">
                                <Link
                                    href="/courses"
                                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                                >
                                    {processing
                                        ? isEditing
                                            ? 'Actualizando...'
                                            : 'Creando...'
                                        : isEditing
                                          ? 'Actualizar Curso'
                                          : 'Crear Curso'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
