<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Course;
use App\Models\Instructor;
use App\Models\Lesson;
use App\Models\Rating;
use App\Models\Comment;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // Estadísticas generales
        $stats = [
            'total_users' => User::count(),
            'total_instructors' => Instructor::count(),
            'total_courses' => Course::count(),
            'published_courses' => Course::where('status', 'publicado')->count(),
            'draft_courses' => Course::where('status', 'borrador')->count(),
            'total_lessons' => Lesson::count(),
            'total_comments' => Comment::count(),
            'total_ratings' => Rating::count(),
            'average_course_rating' => round(Course::avg('average_rating'), 2),
        ];


        return Inertia::render('Dashboard', [
            'stats' => $stats,

        ]);
    }
}
