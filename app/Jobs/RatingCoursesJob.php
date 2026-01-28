<?php

namespace App\Jobs;

use App\Models\Course;
use App\Services\CourseRatingService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class RatingCoursesJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(CourseRatingService $syncService): void
    {
        try {
            Log::info('Calculo de rating iniciado por job');
            $result = $syncService->updateAllCoursesRatings();
            Log::info('Sincronización completada exitosamente');
        } catch (\Exception $e) {
            Log::error('Error en el calculo: ' . $e->getMessage());
            throw $e;
        }
    }
    public function failed(\Throwable $exception): void
    {
        Log::error('Job de calculo falló: ' . $exception->getMessage());
    }
}
