<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lesson extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'course_id',
        'title',
        'description',
        'video_url',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function next(): ?self
    {
        return self::where('course_id', $this->course_id)
            ->where('order', '>', $this->order)
            ->orderBy('order')
            ->first();
    }

    public function previous(): ?self
    {
        return self::where('course_id', $this->course_id)
            ->where('order', '<', $this->order)
            ->orderByDesc('order')
            ->first();
    }

    public function isFirst(): bool
    {
        return $this->order === 1 ||
            $this->order === $this->course->lessons()->min('order');
    }


    public function isLast(): bool
    {
        return $this->order === $this->course->lessons()->max('order');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
