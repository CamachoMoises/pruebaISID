<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Instructor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    protected $model = Course::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(rand(3, 6));

        return [
            'instructor_id' => Instructor::factory(),
            'title' => rtrim($title, '.'),
            'slug' => Str::slug($title) . '-' . fake()->unique()->numberBetween(1000, 9999),
            'description' => fake()->paragraphs(4, true),
            'price' => fake()->randomElement([
                0,
                9.99,
                19.99,
                29.99,
                49.99,
                79.99,
                99.99,
            ]),
            'status' => fake()->randomElement(['publicado', 'publicado', 'publicado', 'borrador']), // Más publicados
            'average_rating' => fake()->randomFloat(2, 3.0, 5.0),
            'total_ratings' => fake()->numberBetween(0, 300),
            'total_students' => fake()->numberBetween(0, 5000),
        ];
    }

    /**
     * Generate learning objectives for the course.
     */
    private function generateLearningObjectives(): string
    {
        $objectives = [];
        $count = fake()->numberBetween(3, 6);

        for ($i = 0; $i < $count; $i++) {
            $objectives[] = fake()->sentence();
        }

        return implode("\n", $objectives);
    }

    /**
     * Indicate that the course is free.
     */
    public function free(): static
    {
        return $this->state(fn(array $attributes) => [
            'price' => 0,
        ]);
    }

    /**
     * Indicate that the course is premium.
     */
    public function premium(): static
    {
        return $this->state(fn(array $attributes) => [
            'price' => fake()->randomFloat(2, 79.99, 199.99),
        ]);
    }

    /**
     * Indicate that the course is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'borrador',
            'total_students' => 0,
            'average_rating' => 0,
            'total_ratings' => 0,
        ]);
    }

    /**
     * Indicate that the course is published.
     */
    public function published(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'publicado',
        ]);
    }

    /**
     * Indicate that the course is popular.
     */
    public function popular(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'publicado',
            'average_rating' => fake()->randomFloat(2, 4.5, 5.0),
            'total_ratings' => fake()->numberBetween(200, 1000),
            'total_students' => fake()->numberBetween(2000, 10000),
        ]);
    }
}
