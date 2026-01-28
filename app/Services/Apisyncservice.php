<?php

namespace App\Services;

use App\Models\Comment;
use App\Models\Course;
use App\Models\Instructor;
use App\Models\Lesson;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ApiSyncService
{
    private string $apiUrl;

    public function __construct()
    {
        $this->apiUrl = rtrim(config('services.sync_api.url'), '/');
    }

    public function syncAll(): array
    {
        $results = [
            'success' => true,
            'synced' => [],
            'errors' => [],
            'total_time' => 0,
        ];

        $startTime = microtime(true);

        try {
            DB::beginTransaction();

            $results['synced']['instructors'] = $this->syncInstructors();
            $results['synced']['courses'] = $this->syncCourses();
            $results['synced']['lessons'] = $this->syncLessons();
            $results['synced']['ratings'] = $this->syncRatings();
            $results['synced']['comments'] = $this->syncComments();

            DB::commit();

            $results['total_time'] = round(microtime(true) - $startTime, 2);
        } catch (\Exception $e) {
            DB::rollBack();

            $results['success'] = false;
            $results['errors'][] = $e->getMessage();

            Log::error('API Sync Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }

        return $results;
    }


    public function syncInstructors(): int
    {
        $response = Http::get("{$this->apiUrl}/instructors");
        $data = $response->json();

        $count = 0;

        foreach ($data as $item) {
            Instructor::updateOrCreate(
                ['id' => $item['id']],
                [
                    'name' => $item['name'],
                    'email' => $item['email'],
                    'bio' => $item['bio'] ?? null,
                    'average_rating' => $item['average_rating'] ?? 0,
                    'total_ratings' => $item['total_ratings'] ?? 0,
                ]
            );
            $count++;
        }

        return $count;
    }


    public function syncCourses(): int
    {
        $response = Http::get("{$this->apiUrl}/courses");
        $data = $response->json();

        $count = 0;

        foreach ($data as $item) {
            Course::updateOrCreate(
                ['id' => $item['id']],
                [
                    'instructor_id' => $item['instructor_id'],
                    'title' => $item['title'],
                    'slug' => $item['slug'],
                    'description' => $item['description'],
                    'price' => $item['price'] ?? 0,
                    'status' => $item['status'] ?? 'draft',
                    'average_rating' => $item['average_rating'] ?? 0,
                    'total_ratings' => $item['total_ratings'] ?? 0,
                    'total_students' => $item['total_students'] ?? 0,
                ]
            );
            $count++;
        }

        return $count;
    }

    public function syncLessons(): int
    {
        $response = Http::get("{$this->apiUrl}/lessons");
        $data = $response->json();

        $count = 0;

        foreach ($data as $item) {
            Lesson::updateOrCreate(
                ['id' => $item['id']],
                [
                    'course_id' => $item['course_id'],
                    'title' => $item['title'],
                    'description' => $item['description'] ?? null,
                    'video_url' => $item['video_url'],
                    'order' => $item['order'] ?? 0,
                ]
            );
            $count++;
        }

        return $count;
    }


    public function syncRatings(): int
    {
        $response = Http::get("{$this->apiUrl}/ratings");
        $data = $response->json();

        $count = 0;

        foreach ($data as $item) {
            Rating::updateOrCreate(
                ['id' => $item['id']],
                [
                    'user_id' => $item['user_id'],
                    'ratable_type' => $item['ratable_type'],
                    'ratable_id' => $item['ratable_id'],
                    'rating' => $item['rating'],
                    'review' => $item['review'] ?? null,
                ]
            );
            $count++;
        }

        return $count;
    }

    public function syncComments(): int
    {
        $response = Http::get("{$this->apiUrl}/comments");
        $data = $response->json();

        $count = 0;

        foreach ($data as $item) {
            Comment::updateOrCreate(
                ['id' => $item['id']],
                [
                    'user_id' => $item['user_id'],
                    'commentable_type' => $item['commentable_type'],
                    'commentable_id' => $item['commentable_id'],
                    'content' => $item['content'],
                    'is_approved' => $item['is_approved'] ?? true,
                ]
            );
            $count++;
        }

        return $count;
    }
}
