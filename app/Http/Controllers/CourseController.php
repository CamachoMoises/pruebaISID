<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{

    public function index(Request $request): Response
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
            ->where('status', 'publicado')
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
        ]);
    }
}
