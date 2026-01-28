<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'instructor_id',
        'title',
        'slug',
        'description',
        'price',
        'status',
        'average_rating',
        'total_ratings',
        'total_students',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'average_rating' => 'decimal:2',
        'total_ratings' => 'integer',
        'total_students' => 'integer',
    ];

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class);
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }

    public function favoritedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'course_user')
            ->withTimestamps()
            ->withPivot('favorited_at');
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function ratings(): MorphMany
    {
        return $this->morphMany(Rating::class, 'ratable');
    }


    public function updateAverageRating(): void
    {
        $this->average_rating = $this->ratings()->avg('rating') ?? 0;
        $this->total_ratings = $this->ratings()->count();
        $this->save();
    }


    public function isFree(): bool
    {
        return $this->price == 0;
    }


    public function isPublished(): bool
    {
        return $this->status === 'publicado';
    }

    public function isDraft(): bool
    {
        return $this->status === 'borrador';
    }

    public function getLessonsCountAttribute(): int
    {
        return $this->lessons()->count();
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'publicado');
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'borrador');
    }

    public function scopeArchived($query)
    {
        return $query->where('status', 'archived');
    }

    public function scopeFree($query)
    {
        return $query->where('price', 0);
    }


    public function scopePaid($query)
    {
        return $query->where('price', '>', 0);
    }

    public function scopeTopRated($query, int $minRatings = 10)
    {
        return $query->where('total_ratings', '>=', $minRatings)
            ->orderByDesc('average_rating');
    }

    public function scopePopular($query)
    {
        return $query->orderByDesc('total_students');
    }

    public function scopeNewest($query)
    {
        return $query->orderByDesc('created_at');
    }

    public function scopeSearch($query, string $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhereHas('instructor', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
        });
    }

    public function scopePriceRange($query, float $min, float $max)
    {
        return $query->whereBetween('price', [$min, $max]);
    }

    public function scopeMinRating($query, float $rating)
    {
        return $query->where('average_rating', '>=', $rating);
    }
}
