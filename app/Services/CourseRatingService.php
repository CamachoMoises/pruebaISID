<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Rating;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class CourseRatingService
{
    public function updateCourseRating(Course $course): array
    {
        $ratings = $course->ratings()
            ->selectRaw('AVG(rating) as average, COUNT(*) as total')
            ->first();

        $course->average_rating = $ratings->average ?? 0;
        $course->total_ratings = $ratings->total ?? 0;
        $course->save();

        return [
            'course_id' => $course->id,
            'average_rating' => round($course->average_rating, 2),
            'total_ratings' => $course->total_ratings,
        ];
    }
    public function updateAllCoursesRatings(): Collection
    {
        $results = collect();

        $ratingsData = Rating::where('ratable_type', Course::class)
            ->select('ratable_id', DB::raw('AVG(rating) as average'), DB::raw('COUNT(*) as total'))
            ->groupBy('ratable_id')
            ->get()
            ->keyBy('ratable_id');

        Course::chunk(100, function ($courses) use ($ratingsData, &$results) {
            foreach ($courses as $course) {
                $ratingData = $ratingsData->get($course->id);

                $course->average_rating = $ratingData ? round($ratingData->average, 2) : 0;
                $course->total_ratings = $ratingData ? $ratingData->total : 0;
                $course->save();

                $results->push([
                    'course_id' => $course->id,
                    'course_title' => $course->title,
                    'average_rating' => $course->average_rating,
                    'total_ratings' => $course->total_ratings,
                ]);
            }
        });

        return $results;
    }
}
