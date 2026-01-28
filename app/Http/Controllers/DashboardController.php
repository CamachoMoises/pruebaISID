<?php

namespace App\Http\Controllers;

use App\Jobs\SyncDataJob;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Course;
use App\Models\Instructor;
use App\Models\Lesson;
use App\Models\Rating;
use App\Models\Comment;
use App\Services\ApiSyncService;

class DashboardController extends Controller
{
    protected  $syncService;

    public function __construct(ApiSyncService $syncService)
    {
        $this->syncService = $syncService;
    }
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

    public function sync(Request $request)
    {
        try {
            SyncDataJob::dispatch();

            return response()->json([
                'success' => true,
                'message' => 'Sincronización iniciada. Se procesará en segundo plano.',
                'job_id' => null,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al iniciar sincronización: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function syncStatus(Request $request)
    {
        //job_id podría ser usado para rastrear el estado específico de un job


        return response()->json([
            'status' => 'idle', // 'idle', 'running', 'completed', 'failed'
            'last_sync' => null, // Fecha de última sincronización
            'details' => [],
        ]);
    }
}
