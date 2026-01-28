<?php

namespace App\Http\Controllers;

use App\Jobs\RatingCoursesJob;
use App\Models\Course;
use App\Models\Instructor;
use App\Services\CourseRatingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    protected  $ratingService;

    public function __construct(CourseRatingService $ratingService)
    {
        $this->ratingService = $ratingService;
    }
    public function index(): Response
    {
        $courses = Course::with(['instructor'])
            ->withCount('lessons')
            ->with([
                'comments' => function ($query) {
                    $query->with('user')->latest()->limit(3);
                },
                'ratings' => function ($query) {
                    $query->with('user')->latest()->limit(3);
                }
            ])
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
        ]);
    }
    public function show(Course $course): Response
    {
        $course->load([
            'instructor',
            'lessons' => function ($query) {
                $query->orderBy('order');
            },
            'comments' => function ($query) {
                $query->with('user')->latest();
            },
            'ratings' => function ($query) {
                $query->with('user')->latest();
            },
            'favoritedBy' => function ($query) {
                $query->latest()->limit(10);
            }
        ]);



        return Inertia::render('Courses/Show', [
            'course' => $course,
            'averageRating' => $course->average_rating,
            'totalRatings' => $course->total_ratings,
            'totalStudents' => $course->total_students,
            'lessonsCount' => $course->lessons_count,
        ]);
    }
    public function create(): Response
    {
        return Inertia::render('Courses/Create', [
            'instructors' => Instructor::all(),
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'instructor_id' => 'required|exists:instructors,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:borrador,publicado,archivado',
        ]);

        // Generar slug automáticamente
        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(4);

        // Establecer valores por defecto
        $validated['average_rating'] = 0;
        $validated['total_ratings'] = 0;
        $validated['total_students'] = 0;
        $validated['duration_minutes'] = 0;

        $course = Course::create($validated);
        return redirect()->route('courses.index')
            ->with('success', 'Curso creado exitosamente.');
    }

    public function edit(Course $course): Response
    {
        $course->load('instructor');

        return Inertia::render('Courses/Edit', [
            'course' => $course,
            'instructors' => Instructor::all(),
        ]);
    }


    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'instructor_id' => 'required|exists:instructors,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail' => 'nullable|url',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:borrador,publicado,archivado',
        ]);

        // Solo actualizar el slug si cambió el título
        if ($course->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(4);
        }

        $course->update($validated);

        return redirect()->route('courses.index')
            ->with('success', 'Curso actualizado exitosamente.');
    }

    public function toggleFavorite(Course $course, Request $request)
    {
        $request->validate([
            'action' => 'sometimes|in:favorite,unfavorite',
        ]);

        $user = $request->user();

        if (!$user) {
            return back()->with('warning', 'Debes iniciar sesión para marcar como favorito.');
        }

        if ($user->hasFavorited($course)) {
            $user->unfavoriteCourse($course);
            $message = 'Curso removido de favoritos.';
        } else {
            $user->favoriteCourse($course);
            $message = 'Curso agregado a favoritos.';
        }

        return back()->with('success', $message);
    }


    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->back()->with('success', 'Curso eliminado correctamente');
    }


    public function rating()
    {
        try {
            RatingCoursesJob::dispatch();

            return response()->json([
                'success' => true,
                'message' => 'Calculo de rating iniciado. Se procesará en segundo plano.',
                'job_id' => null,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al iniciar Calculo: ' . $e->getMessage(),
            ], 500);
        }
    }
}
