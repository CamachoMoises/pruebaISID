<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Instructor extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'bio',
    ];

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    public function publishedCourses(): HasMany
    {
        return $this->courses()->where('status', 'publicado');
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function ratings(): MorphMany
    {
        return $this->morphMany(Rating::class, 'ratable');
    }

    public function getTotalStudentsAttribute(): int
    {
        return $this->courses()->sum('total_students');
    }

    public function scopePopular($query)
    {
        return $query->withCount(['courses as total_students_count' => function ($query) {
            $query->select(DB::raw('SUM(total_students)'));
        }])->orderByDesc('total_students_count');
    }

    public function scopeSearch($query, string $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        });
    }
}
