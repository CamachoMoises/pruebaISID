<?php

namespace App\Http\Controllers;

use App\Models\Instructor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InstructorController extends Controller
{

    public function index(): Response
    {
        $instructors = Instructor::withCount('courses')
            ->with([
                'comments' => function ($query) {
                    $query->with('user')->latest()->limit(5);
                },
                'ratings' => function ($query) {
                    $query->with('user')->latest()->limit(5);
                }
            ])
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('Instructors/Index', [
            'instructors' => $instructors,
        ]);
    }
}
