<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'starts_at' => fake()->dateTimeBetween('now', '+30 days'),
            'status' => fake()->randomElement(['pending', 'approved', 'rejected']),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
