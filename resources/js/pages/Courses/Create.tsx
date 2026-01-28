// resources/js/Pages/Courses/Create.tsx
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Instructor } from '@/types/models';

interface Props {
    instructors: Instructor[];
}

export default function Create({ instructors }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        instructor_id: '',
        title: '',
        description: '',
        level: 'principiante',
        price: '',
        status: 'borrador',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/courses', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Crear Nuevo Curso" />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link
                            href="/courses" // URL directa
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
                            Crear Nuevo Curso
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
                                            setData('level', e.target.value)
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
                                            setData('status', e.target.value)
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
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                                >
                                    {processing ? 'Creando...' : 'Crear Curso'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
