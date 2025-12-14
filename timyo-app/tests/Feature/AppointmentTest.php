<?php

namespace Tests\Feature;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AppointmentTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_appointment()
    {
        $user = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/appointments', [
                'starts_at' => now()->addDays(1)->toDateTimeString(),
                'notes' => 'Test appointment',
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['message', 'appointment']);

        $this->assertDatabaseHas('appointments', [
            'user_id' => $user->id,
            'status' => 'pending',
        ]);
    }

    public function test_user_can_view_own_appointments()
    {
        $user = User::factory()->create(['role' => 'user']);
        Appointment::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/appointments');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_user_can_cancel_own_appointment()
    {
        $user = User::factory()->create(['role' => 'user']);
        $appointment = Appointment::factory()->create([
            'user_id' => $user->id,
            'starts_at' => now()->addDays(1),
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->deleteJson("/api/appointments/{$appointment->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('appointments', ['id' => $appointment->id]);
    }

    public function test_user_cannot_cancel_other_users_appointment()
    {
        $user1 = User::factory()->create(['role' => 'user']);
        $user2 = User::factory()->create(['role' => 'user']);
        $appointment = Appointment::factory()->create([
            'user_id' => $user2->id,
        ]);

        $response = $this->actingAs($user1, 'sanctum')
            ->deleteJson("/api/appointments/{$appointment->id}");

        $response->assertStatus(403);
    }

    public function test_admin_can_view_all_appointments()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Appointment::factory()->count(5)->create();

        $response = $this->actingAs($admin, 'sanctum')
            ->getJson('/api/admin/appointments');

        $response->assertStatus(200)
            ->assertJsonCount(5);
    }

    public function test_admin_can_update_appointment_status()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $appointment = Appointment::factory()->create(['status' => 'pending']);

        $response = $this->actingAs($admin, 'sanctum')
            ->patchJson("/api/admin/appointments/{$appointment->id}/status", [
                'status' => 'approved',
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('appointments', [
            'id' => $appointment->id,
            'status' => 'approved',
        ]);
    }

    public function test_user_cannot_access_admin_routes()
    {
        $user = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/admin/appointments');

        $response->assertStatus(403);
    }
}
