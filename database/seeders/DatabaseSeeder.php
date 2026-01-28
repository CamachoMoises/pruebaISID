<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Comment;
use App\Models\Course;
use App\Models\Instructor;
use App\Models\Lesson;
use App\Models\Rating;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('Iniciando seed de la base de datos...');

        $this->command->info('Creando usuarios...');
        $users = User::factory()->count(100)->create();
        $this->command->info("{$users->count()} usuarios creados");

        $this->command->info('Creando instructores...');
        $instructors = Instructor::factory()->count(15)->create();
        $this->command->info("{$instructors->count()} instructores creados");

        $this->command->info('Creando cursos, lecciones y contenido...');

        $totalCourses = 0;
        $totalLessons = 0;
        $totalRatings = 0;
        $totalComments = 0;

        $instructors->each(function ($instructor) use (&$totalCourses, &$totalLessons, &$totalRatings, &$totalComments, $users) {
            $coursesCount = rand(2, 5);

            $courses = Course::factory()
                ->count($coursesCount)
                ->published()
                ->create(['instructor_id' => $instructor->id]);
            $totalCourses += $courses->count();

            $courses->each(function ($course) use (&$totalLessons, &$totalRatings, &$totalComments, $users) {
                $lessonsCount = rand(6, 15);

                Lesson::factory()
                    ->count($lessonsCount)
                    ->sequence(fn($sequence) => [
                        'order' => $sequence->index + 1,
                    ])
                    ->create(['course_id' => $course->id]);

                $totalLessons += $lessonsCount;

                $ratingsCount = rand(10, 50);

                $ratings = collect();
                $excellentCount = (int)($ratingsCount * 0.4);
                $ratings = $ratings->merge(
                    Rating::factory()
                        ->count($excellentCount)
                        ->excellent()
                        ->forCourse($course)
                        ->create()
                );

                $goodCount = (int)($ratingsCount * 0.2);
                $ratings = $ratings->merge(
                    Rating::factory()
                        ->count($goodCount)
                        ->good()
                        ->forCourse($course)
                        ->create()
                );
                $averageCount = (int)($ratingsCount * 0.2);
                $ratings = $ratings->merge(
                    Rating::factory()
                        ->count($averageCount)
                        ->average()
                        ->forCourse($course)
                        ->create()
                );

                $remaining = $ratingsCount - $ratings->count();
                if ($remaining > 0) {
                    $ratings = $ratings->merge(
                        Rating::factory()
                            ->count($remaining)
                            ->sequence(
                                fn($sequence) => ['rating' => rand(1, 3)]
                            )
                            ->forCourse($course)
                            ->create()
                    );
                }

                $totalRatings += $ratings->count();

                $course->average_rating = $ratings->avg('rating');
                $course->total_ratings = $ratings->count();
                $course->total_students = rand(100, 5000);
                $course->save();

                $commentsCount = (int)($ratingsCount * 0.7);

                Comment::factory()
                    ->count($commentsCount)
                    ->forCourse($course)
                    ->sequence(function ($sequence) use ($ratings) {
                        $rating = $ratings->random();
                        $state = match (true) {
                            $rating->rating >= 4 => 'positive',
                            $rating->rating <= 2 => 'negative',
                            default => null,
                        };

                        return ['user_id' => $rating->user_id];
                    })
                    ->create();

                $totalComments += $commentsCount;
            });
        });

        $this->command->info("{$totalCourses} cursos creados");
        $this->command->info("{$totalLessons} lecciones creadas");
        $this->command->info("{$totalRatings} calificaciones creadas");
        $this->command->info("{$totalComments} comentarios creados");
        $this->command->info('Asignando cursos favoritos...');
        $courses = Course::all();
        $totalFavorites = 0;

        $users->each(function ($user) use ($courses, &$totalFavorites) {
            $favoritesCount = rand(0, 8);
            if ($favoritesCount > 0) {
                $user->favoriteCourses()->attach(
                    $courses->random(min($favoritesCount, $courses->count()))->pluck('id')
                );
                $totalFavorites += $favoritesCount;
            }
        });
        $this->command->info("{$totalFavorites} favoritos asignados");
        $this->command->info('Creando cursos en borrador...');
        $draftCourses = Course::factory()
            ->count(5)
            ->draft()
            ->create([
                'instructor_id' => $instructors->random()->id,
            ]);

        $draftCourses->each(function ($course) {
            Lesson::factory()
                ->count(rand(3, 8))
                ->sequence(fn($sequence) => ['order' => $sequence->index + 1])
                ->create(['course_id' => $course->id]);
        });

        $this->command->info("{$draftCourses->count()} cursos en borrador creados");
        $this->command->newLine();
        $this->command->info('¡Seed completado exitosamente!');
        $this->command->newLine();
        $this->command->table(
            ['Recurso', 'Cantidad'],
            [
                ['Usuarios', $users->count()],
                ['Instructores', $instructors->count()],
                ['Cursos', Course::count()],
                ['Lecciones', Lesson::count()],
                ['Calificaciones', Rating::count()],
                ['Comentarios', Comment::count()],
                ['Favoritos', $totalFavorites],
            ]
        );
    }
}
