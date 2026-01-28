<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lesson>
 */
class LessonFactory extends Factory
{
    protected $model = Lesson::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $videoIds = [
            'dQw4w9WgXcQ',
            'jNQXAC9IVRw',
            'M7lc1UVf-VE',
            '3JZ_D3ELwOQ',
            'kJQP7kiw5Fk',
            'L_jWHffIx5E',
        ];

        return [
            'course_id' => Course::factory(),
            'title' => fake()->sentence(rand(3, 8)),
            'description' => fake()->optional()->paragraphs(2, true),
            'video_url' => 'https://www.youtube.com/watch?v=' . fake()->randomElement($videoIds),
            'order' => fake()->numberBetween(1, 20),
        ];
    }





    /**
     * Set a specific order for the lesson.
     */
    public function order(int $order): static
    {
        return $this->state(fn(array $attributes) => [
            'order' => $order,
        ]);
    }
}
