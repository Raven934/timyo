<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_all_users()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        User::factory()->count(5)->create();

        $response = $this->actingAs($admin, 'sanctum')
            ->getJson('/api/admin/users');

        $response->assertStatus(200)
            ->assertJsonCount(6); // 5 + 1 admin
    }

    public function test_user_cannot_view_all_users()
    {
        $user = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/admin/users');

        $response->assertStatus(403);
    }
}
