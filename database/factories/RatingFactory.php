<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rating>
 */
class RatingFactory extends Factory
{
    protected $model = Rating::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Determinar aleatoriamente si es una calificación de curso
        $ratableType = fake()->randomElement([Course::class]);
        $rating = fake()->numberBetween(1, 5);

        return [
            'user_id' => User::factory(),
            'ratable_type' => $ratableType,
            'ratable_id' => Course::factory(),
            'rating' => $rating,
            'review' => fake()->optional(70)->paragraph(rand(2, 4)), // 70% tienen reseña
        ];
    }

    /**
     * Indicate that the rating is for a course.
     */
    public function forCourse(?Course $course = null): static
    {
        return $this->state(fn(array $attributes) => [
            'ratable_type' => Course::class,
            'ratable_id' => $course?->id ?? Course::factory(),
        ]);
    }



    /**
     * Set a specific rating value.
     */
    public function stars(int $stars): static
    {
        return $this->state(fn(array $attributes) => [
            'rating' => max(1, min(5, $stars)), // Entre 1 y 5
        ]);
    }

    /**
     * Create a 5-star rating.
     */
    public function excellent(): static
    {
        $excellentReviews = [
            '¡Excelente! Superó todas mis expectativas. Lo recomiendo 100%.',
            'Perfecto. No podría pedir más. 5 estrellas sin dudarlo.',
            'Increíble calidad. El mejor curso que he tomado en mucho tiempo.',
            'Simplemente perfecto. Aprendí exactamente lo que necesitaba.',
            'Outstanding! Worth every penny. Highly recommended.',
        ];

        return $this->state(fn(array $attributes) => [
            'rating' => 5,
            'review' => fake()->randomElement($excellentReviews),
        ]);
    }

    /**
     * Create a 4-star rating.
     */
    public function good(): static
    {
        $goodReviews = [
            'Muy buen curso. Cumple con lo prometido.',
            'Contenido de calidad, aunque podría mejorar algunos aspectos.',
            'Recomendable. Aprendí mucho aunque tiene espacio para mejorar.',
            'Buen curso en general. Vale la pena.',
            'Satisfecho con el contenido. Buena inversión.',
        ];

        return $this->state(fn(array $attributes) => [
            'rating' => 4,
            'review' => fake()->randomElement($goodReviews),
        ]);
    }

    /**
     * Create a 3-star rating.
     */
    public function average(): static
    {
        $averageReviews = [
            'Está bien, pero esperaba más. Cumple lo básico.',
            'Contenido promedio. Hay mejores opciones por el mismo precio.',
            'No está mal, pero tampoco me impresionó.',
            'Cumple su propósito, aunque podría ser mejor.',
            'Aceptable. Tiene algunos buenos momentos.',
        ];

        return $this->state(fn(array $attributes) => [
            'rating' => 3,
            'review' => fake()->randomElement($averageReviews),
        ]);
    }

    /**
     * Create a 2-star rating.
     */
    public function poor(): static
    {
        $poorReviews = [
            'Decepcionante. El contenido no es lo que esperaba.',
            'Necesita mucho trabajo. No lo recomendaría.',
            'No cumplió mis expectativas. Hay mejores alternativas.',
            'Contenido desactualizado y mal explicado.',
            'No vale la pena. Perdí mi tiempo.',
        ];

        return $this->state(fn(array $attributes) => [
            'rating' => 2,
            'review' => fake()->randomElement($poorReviews),
        ]);
    }

    /**
     * Create a 1-star rating.
     */
    public function terrible(): static
    {
        $terribleReviews = [
            'Terrible. No aprendí nada y el contenido es pésimo.',
            'El peor curso que he tomado. No lo recomiendo en absoluto.',
            'Completamente inútil. Solicité reembolso.',
            'Muy mala calidad. No vale ni un centavo.',
            'Decepción total. Evítenlo.',
        ];

        return $this->state(fn(array $attributes) => [
            'rating' => 1,
            'review' => fake()->randomElement($terribleReviews),
        ]);
    }

    /**
     * Create a rating without review (only stars).
     */
    public function withoutReview(): static
    {
        return $this->state(fn(array $attributes) => [
            'review' => null,
        ]);
    }

    /**
     * Create a rating with review.
     */
    public function withReview(): static
    {
        return $this->state(fn(array $attributes) => [
            'review' => fake()->paragraph(rand(2, 5)),
        ]);
    }
}
