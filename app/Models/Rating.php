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
}
