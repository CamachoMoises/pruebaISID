<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }


    public function favoriteCourses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_user')
            ->withTimestamps()
            ->withPivot('favorited_at');
    }


    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class);
    }

    public function hasFavorited(Course $course): bool
    {
        return $this->favoriteCourses()->where('course_id', $course->id)->exists();
    }
    public function courseComments(): HasMany
    {
        return $this->comments()->where('commentable_type', Course::class);
    }


    public function instructorComments(): HasMany
    {
        return $this->comments()->where('commentable_type', Instructor::class);
    }

    public function courseRatings(): HasMany
    {
        return $this->ratings()->where('ratable_type', Course::class);
    }


    public function instructorRatings(): HasMany
    {
        return $this->ratings()->where('ratable_type', Instructor::class);
    }
    public function favoriteCourse(Course $course): void
    {
        if (!$this->hasFavorited($course)) {
            $this->favoriteCourses()->attach($course->id, [
                'favorited_at' => now(),
            ]);
        }
    }

    public function unfavoriteCourse(Course $course): void
    {
        $this->favoriteCourses()->detach($course->id);
    }

    public function toggleFavorite(Course $course): bool
    {
        if ($this->hasFavorited($course)) {
            $this->unfavoriteCourse($course);
            return false;
        } else {
            $this->favoriteCourse($course);
            return true;
        }
    }

    public function hasRated(Course|Instructor $ratable): bool
    {
        return $this->ratings()
            ->where('ratable_id', $ratable->id)
            ->where('ratable_type', get_class($ratable))
            ->exists();
    }

    public function getRatingFor(Course|Instructor $ratable): ?Rating
    {
        return $this->ratings()
            ->where('ratable_id', $ratable->id)
            ->where('ratable_type', get_class($ratable))
            ->first();
    }

    public function rate(Course|Instructor $ratable, int $rating, ?string $review = null): Rating
    {
        return $this->ratings()->updateOrCreate(
            [
                'ratable_id' => $ratable->id,
                'ratable_type' => get_class($ratable),
            ],
            [
                'rating' => $rating,
                'review' => $review,
            ]
        );
    }

    public function comment(Course|Instructor $commentable, string $content, bool $isApproved = true): Comment
    {
        return $this->comments()->create([
            'commentable_id' => $commentable->id,
            'commentable_type' => get_class($commentable),
            'content' => $content,
            'is_approved' => $isApproved,
        ]);
    }


    public function scopeFavoritedCourse($query, Course $course)
    {
        return $query->whereHas('favoriteCourses', function ($q) use ($course) {
            $q->where('course_id', $course->id);
        });
    }

    public function scopeWithMostFavorites($query)
    {
        return $query->withCount('favoriteCourses')
            ->orderByDesc('favorite_courses_count');
    }

    public function scopeActive($query)
    {
        return $query->where(function ($q) {
            $q->has('comments')
                ->orHas('ratings');
        });
    }
}
