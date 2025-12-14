<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    // User: Get own appointments
    public function index()
    {
        $appointments = auth()->user()->appointments()->latest()->get();
        return response()->json($appointments);
    }

    // User: Create new appointment
    public function store(Request $request)
    {
        $data = $request->validate([
            'starts_at' => 'required|date|after:now',
            'notes' => 'nullable|string',
        ]);

        $appointment = Appointment::create([
            'user_id' => auth()->id(),
            'starts_at' => $data['starts_at'],
            'notes' => $data['notes'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Appointment created successfully',
            'appointment' => $appointment
        ], 201);
    }

    // User: Cancel own appointment
    public function destroy(Appointment $appointment)
    {
        // Check if user owns the appointment
        if ($appointment->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Check if appointment can be cancelled
        if ($appointment->starts_at < now()) {
            return response()->json(['error' => 'Cannot cancel past appointments'], 400);
        }

        $appointment->delete();
        return response()->json(['message' => 'Appointment cancelled successfully']);
    }

    // Admin: Get all appointments
    public function indexAll()
    {
        $appointments = Appointment::with('user:id,name,email')
            ->latest()
            ->get();
        
        return response()->json($appointments);
    }

    // Admin: Update appointment status
    public function updateStatus(Request $request, Appointment $appointment)
    {
        $data = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $appointment->update(['status' => $data['status']]);

        return response()->json([
            'message' => 'Appointment status updated successfully',
            'appointment' => $appointment->load('user:id,name,email')
        ]);
    }
}
