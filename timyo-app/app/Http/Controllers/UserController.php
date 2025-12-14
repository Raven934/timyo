<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Admin: Get all users
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'role', 'created_at')
            ->withCount('appointments')
            ->latest()
            ->get();

        return response()->json($users);
    }

    // Admin or User: Get single user
    public function show(User $user)
    {
        $user->load('appointments');
        return response()->json($user);
    }
}
