<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password = null;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Indicate that the user's email is verified.
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => now(),
        ]);
    }

    /**
     * Set a specific password for the user.
     */
    public function withPassword(string $password): static
    {
        return $this->state(fn (array $attributes) => [
            'password' => Hash::make($password),
        ]);
    }

    /**
     * Create an admin user.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);
    }

    /**
     * Create a test user.
     */
    public function test(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);
    }

    /**
     * Create a user with favorite courses.
     */
    public function withFavorites(int $count = 3): static
    {
        return $this->has(
            \App\Models\Course::factory()->count($count),
            'favoriteCourses'
        );
    }

    /**
     * Create a user with ratings.
     */
    public function withRatings(int $count = 5): static
    {
        return $this->has(
            \App\Models\Rating::factory()->count($count),
            'ratings'
        );
    }

    /**
     * Create a user with comments.
     */
    public function withComments(int $count = 5): static
    {
        return $this->has(
            \App\Models\Comment::factory()->count($count),
            'comments'
        );
    }

    /**
     * Create an active user with favorites, ratings, and comments.
     */
    public function active(): static
    {
        return $this->has(
            \App\Models\Course::factory()->count(5),
            'favoriteCourses'
        )->has(
            \App\Models\Rating::factory()->count(8),
            'ratings'
        )->has(
            \App\Models\Comment::factory()->count(6),
            'comments'
        );
    }
}
