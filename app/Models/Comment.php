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
}
