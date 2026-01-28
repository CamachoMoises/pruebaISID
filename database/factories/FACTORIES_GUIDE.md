# Factories - Sistema de Cursos

## 📦 Factories Disponibles

Las factories permiten generar datos de prueba de forma rápida y consistente para todas las tablas del sistema.

---

## 🎯 InstructorFactory

### Uso Básico
```php
use App\Models\Instructor;

// Crear un instructor
$instructor = Instructor::factory()->create();

// Crear múltiples instructores
$instructors = Instructor::factory()->count(10)->create();
```

### Estados Disponibles

**newInstructor()** - Instructor sin calificaciones
```php
$instructor = Instructor::factory()->newInstructor()->create();
```

**topRated()** - Instructor altamente calificado
```php
$instructor = Instructor::factory()->topRated()->create();
```

---

## 📚 CourseFactory

### Uso Básico
```php
use App\Models\Course;

// Crear un curso (con instructor automático)
$course = Course::factory()->create();

// Crear curso con instructor específico
$course = Course::factory()->create([
    'instructor_id' => $instructor->id,
]);
```

### Estados Disponibles

**free()** - Curso gratuito
```php
$course = Course::factory()->free()->create();
```

**premium()** - Curso premium (alto precio)
```php
$course = Course::factory()->premium()->create();
```

**draft()** - Curso en borrador
```php
$course = Course::factory()->draft()->create();
```

**published()** - Curso publicado
```php
$course = Course::factory()->published()->create();
```

**popular()** - Curso popular (muchos estudiantes y ratings)
```php
$course = Course::factory()->popular()->create();
```

**Niveles:**
```php
Course::factory()->beginner()->create();
Course::factory()->intermediate()->create();
Course::factory()->advanced()->create();
```

### Combinar Estados
```php
$course = Course::factory()
    ->published()
    ->popular()
    ->advanced()
    ->create();
```

---

## 🎥 LessonFactory

### Uso Básico
```php
use App\Models\Lesson;

// Crear lección (con curso automático)
$lesson = Lesson::factory()->create();

// Crear lección para curso específico
$lesson = Lesson::factory()->create([
    'course_id' => $course->id,
]);

// Crear múltiples lecciones ordenadas
$course = Course::factory()->create();
Lesson::factory()
    ->count(5)
    ->sequence(
        ['order' => 1],
        ['order' => 2],
        ['order' => 3],
        ['order' => 4],
        ['order' => 5],
    )
    ->create(['course_id' => $course->id]);
```

### Estados Disponibles

**free()** - Lección gratuita (preview)
```php
$lesson = Lesson::factory()->free()->create();
```

**premium()** - Lección de pago
```php
$lesson = Lesson::factory()->premium()->create();
```

**youtube()** - Video en YouTube
```php
$lesson = Lesson::factory()->youtube()->create();
```

**vimeo()** - Video en Vimeo
```php
$lesson = Lesson::factory()->vimeo()->create();
```

**order(int)** - Orden específico
```php
$lesson = Lesson::factory()->order(1)->create();
```

**Duración:**
```php
Lesson::factory()->short()->create(); // < 10 min
Lesson::factory()->long()->create();  // > 30 min
```

---

## 💬 CommentFactory

### Uso Básico
```php
use App\Models\Comment;

// Comentario aleatorio (curso o instructor)
$comment = Comment::factory()->create();

// Comentario para curso específico
$comment = Comment::factory()->forCourse($course)->create();

// Comentario para instructor específico
$comment = Comment::factory()->forInstructor($instructor)->create();
```

### Estados Disponibles

**approved()** - Comentario aprobado
```php
$comment = Comment::factory()->approved()->create();
```

**pending()** - Comentario pendiente de moderación
```php
$comment = Comment::factory()->pending()->create();
```

**positive()** - Comentario positivo
```php
$comment = Comment::factory()->positive()->forCourse($course)->create();
```

**negative()** - Comentario negativo
```php
$comment = Comment::factory()->negative()->forCourse($course)->create();
```

---

## ⭐ RatingFactory

### Uso Básico
```php
use App\Models\Rating;

// Calificación aleatoria (curso o instructor)
$rating = Rating::factory()->create();

// Calificación para curso específico
$rating = Rating::factory()->forCourse($course)->create();

// Calificación para instructor específico
$rating = Rating::factory()->forInstructor($instructor)->create();
```

### Estados Disponibles

**stars(int)** - Calificación específica (1-5)
```php
$rating = Rating::factory()->stars(5)->create();
```

**Calificaciones Predefinidas:**
```php
Rating::factory()->excellent()->create(); // 5 estrellas con reseña positiva
Rating::factory()->good()->create();      // 4 estrellas
Rating::factory()->average()->create();   // 3 estrellas
Rating::factory()->poor()->create();      // 2 estrellas
Rating::factory()->terrible()->create();  // 1 estrella
```

**withReview() / withoutReview()**
```php
Rating::factory()->withReview()->create();    // Con reseña
Rating::factory()->withoutReview()->create(); // Solo estrellas
```

---

## 🚀 Ejemplos Completos

### Ejemplo 1: Instructor con Cursos y Lecciones
```php
use App\Models\Instructor;
use App\Models\Course;
use App\Models\Lesson;

$instructor = Instructor::factory()
    ->topRated()
    ->has(
        Course::factory()
            ->count(3)
            ->published()
            ->has(Lesson::factory()->count(8), 'lessons'),
        'courses'
    )
    ->create();
```

### Ejemplo 2: Curso Popular con Ratings y Comentarios
```php
use App\Models\Course;
use App\Models\Rating;
use App\Models\Comment;

$course = Course::factory()
    ->popular()
    ->has(Rating::factory()->excellent()->count(20), 'ratings')
    ->has(Rating::factory()->good()->count(10), 'ratings')
    ->has(Comment::factory()->positive()->count(15), 'comments')
    ->create();
```

### Ejemplo 3: Sistema Completo con Datos de Prueba
```php
use App\Models\Instructor;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\User;
use App\Models\Rating;
use App\Models\Comment;

// Crear instructores
$instructors = Instructor::factory()
    ->count(10)
    ->create();

// Cada instructor tiene entre 2-5 cursos
$instructors->each(function ($instructor) {
    $courses = Course::factory()
        ->count(rand(2, 5))
        ->published()
        ->create(['instructor_id' => $instructor->id]);
    
    // Cada curso tiene entre 5-15 lecciones
    $courses->each(function ($course) {
        Lesson::factory()
            ->count(rand(5, 15))
            ->sequence(fn ($sequence) => ['order' => $sequence->index + 1])
            ->create(['course_id' => $course->id]);
        
        // Agregar calificaciones al curso
        Rating::factory()
            ->count(rand(5, 30))
            ->forCourse($course)
            ->create();
        
        // Agregar comentarios al curso
        Comment::factory()
            ->count(rand(3, 15))
            ->forCourse($course)
            ->create();
    });
    
    // Calificaciones para el instructor
    Rating::factory()
        ->count(rand(10, 50))
        ->forInstructor($instructor)
        ->create();
});

// Crear usuarios y asignar cursos favoritos
$users = User::factory()->count(50)->create();
$courses = Course::all();

$users->each(function ($user) use ($courses) {
    $user->favoriteCourses()->attach(
        $courses->random(rand(1, 5))->pluck('id')
    );
});
```

### Ejemplo 4: Seeder Completo
```php
// database/seeders/DatabaseSeeder.php

namespace Database\Seeders;

use App\Models\Instructor;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Crear usuarios
        User::factory()->count(100)->create();
        
        // Crear instructores con cursos
        Instructor::factory()
            ->count(15)
            ->has(
                Course::factory()
                    ->count(3)
                    ->has(Lesson::factory()->count(10), 'lessons')
            )
            ->create();
    }
}
```

---

## 📝 Tips y Buenas Prácticas

1. **Usa sequence() para datos ordenados:**
```php
Lesson::factory()->count(5)->sequence(
    ['order' => 1, 'title' => 'Introducción'],
    ['order' => 2, 'title' => 'Conceptos Básicos'],
    ['order' => 3, 'title' => 'Práctica'],
    ['order' => 4, 'title' => 'Avanzado'],
    ['order' => 5, 'title' => 'Conclusión'],
)->create();
```

2. **Combina estados para variedad:**
```php
Course::factory()
    ->published()
    ->intermediate()
    ->premium()
    ->create();
```

3. **Usa relaciones anidadas:**
```php
Instructor::factory()
    ->has(Course::factory()->count(3)->has(Lesson::factory()->count(8)))
    ->create();
```

4. **Evita N+1 queries usando with():**
```php
$courses = Course::factory()
    ->count(10)
    ->create()
    ->load('instructor', 'lessons', 'ratings');
```

---

## 🎨 Personalización

Puedes sobrescribir cualquier atributo al crear:

```php
Course::factory()->create([
    'title' => 'Mi Curso Personalizado',
    'price' => 99.99,
]);
```

O usar callbacks para lógica compleja:

```php
Course::factory()
    ->afterCreating(function ($course) {
        // Lógica adicional después de crear
        $course->update(['slug' => Str::slug($course->title)]);
    })
    ->create();
```
