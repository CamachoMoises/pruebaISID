<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'commentable_id',
        'commentable_type',
        'content',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    public function isForCourse(): bool
    {
        return $this->commentable_type === Course::class;
    }

    public function isForInstructor(): bool
    {
        return $this->commentable_type === Instructor::class;
    }

    public function getExcerptAttribute(int $length = 100): string
    {
        if (strlen($this->content) <= $length) {
            return $this->content;
        }

        return substr($this->content, 0, $length) . '...';
    }

    public function scopeForCourses($query)
    {
        return $query->where('commentable_type', Course::class);
    }

    public function scopeForInstructors($query)
    {
        return $query->where('commentable_type', Instructor::class);
    }


    public function scopeRecent($query, int $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days))
            ->orderByDesc('created_at');
    }

    public function scopeSearch($query, string $search)
    {
        return $query->where('content', 'like', "%{$search}%");
    }
}
