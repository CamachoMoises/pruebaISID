<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Course;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Determinar aleatoriamente si es un comentario de curso o instructor
        $commentableType = fake()->randomElement([Course::class, Instructor::class]);

        return [
            'user_id' => User::factory(),
            'commentable_type' => $commentableType,
            'commentable_id' => $commentableType === Course::class
                ? Course::factory()
                : Instructor::factory(),
            'content' => fake()->paragraph(rand(2, 5)),
        ];
    }

    /**
     * Indicate that the comment is for a course.
     */
    public function forCourse(?Course $course = null): static
    {
        return $this->state(fn(array $attributes) => [
            'commentable_type' => Course::class,
            'commentable_id' => $course?->id ?? Course::factory(),
        ]);
    }

    /**
     * Indicate that the comment is for an instructor.
     */
    public function forInstructor(?Instructor $instructor = null): static
    {
        return $this->state(fn(array $attributes) => [
            'commentable_type' => Instructor::class,
            'commentable_id' => $instructor?->id ?? Instructor::factory(),
        ]);
    }


    /**
     * Create a positive comment.
     */
    public function positive(): static
    {
        $positiveComments = [
            '¡Excelente curso! Aprendí muchísimo y el instructor explica muy bien.',
            'Muy recomendable. El contenido está muy bien estructurado.',
            'Me encantó, superó mis expectativas. Definitivamente lo recomiendo.',
            'Increíble calidad de contenido. Vale cada centavo.',
            'El mejor curso que he tomado sobre este tema.',
        ];

        return $this->state(fn(array $attributes) => [
            'content' => fake()->randomElement($positiveComments),
        ]);
    }

    /**
     * Create a negative comment.
     */
    public function negative(): static
    {
        $negativeComments = [
            'Esperaba más del curso. El contenido es muy básico.',
            'No me convenció. Hay mejores opciones disponibles.',
            'El instructor va muy rápido y no explica bien algunos conceptos.',
            'Necesita actualización. Algunos ejemplos están desactualizados.',
            'Decepcionante. No cumplió mis expectativas.',
        ];

        return $this->state(fn(array $attributes) => [
            'content' => fake()->randomElement($negativeComments),
        ]);
    }
}
