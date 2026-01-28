<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Rating extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'ratable_id',
        'ratable_type',
        'rating',
        'review',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function ratable(): MorphTo
    {
        return $this->morphTo();
    }
    public function isForCourse(): bool
    {
        return $this->ratable_type === Course::class;
    }
    public function isForInstructor(): bool
    {
        return $this->ratable_type === Instructor::class;
    }

    public function getLabelAttribute(): string
    {
        return match ($this->rating) {
            5 => 'Excelente',
            4 => 'Muy bueno',
            3 => 'Bueno',
            2 => 'Regular',
            1 => 'Malo',
            default => 'Sin calificar',
        };
    }

    public function hasReview(): bool
    {
        return !empty($this->review);
    }

    public function getStarsArrayAttribute(): array
    {
        return array_fill(0, $this->rating, true);
    }

    public function getExcerptAttribute(int $length = 150): ?string
    {
        if (!$this->review) {
            return null;
        }

        if (strlen($this->review) <= $length) {
            return $this->review;
        }

        return substr($this->review, 0, $length) . '...';
    }

    public function scopeWithReview($query)
    {
        return $query->whereNotNull('review');
    }

    public function scopeWithoutReview($query)
    {
        return $query->whereNull('review');
    }

    public function scopeForCourses($query)
    {
        return $query->where('ratable_type', Course::class);
    }

    public function scopeMinRating($query, int $rating)
    {
        return $query->where('rating', '>=', $rating);
    }

    public function scopeRating($query, int $rating)
    {
        return $query->where('rating', $rating);
    }

    public function scopeRecent($query, int $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days))
            ->orderByDesc('created_at');
    }

    public function scopeTopRatings($query)
    {
        return $query->whereIn('rating', [4, 5]);
    }

    public function scopeLowRatings($query)
    {
        return $query->whereIn('rating', [1, 2]);
    }

    public function scopeSearch($query, string $search)
    {
        return $query->where('review', 'like', "%{$search}%");
    }

    protected static function booted(): void
    {
        static::created(function ($rating) {
            $rating->ratable->updateAverageRating();
        });

        static::updated(function ($rating) {
            $rating->ratable->updateAverageRating();
        });

        static::deleted(function ($rating) {
            $rating->ratable->updateAverageRating();
        });
    }
}
