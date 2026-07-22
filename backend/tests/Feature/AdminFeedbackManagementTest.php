<?php

namespace Tests\Feature;

use App\Models\Feedback;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminFeedbackManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_feedback_page_displays_management_table_and_row_actions(): void
    {
        $admin = User::factory()->create();
        $feedback = Feedback::create([
            'type' => 'testimonial',
            'name' => 'Nimal Perera',
            'email' => 'nimal@example.com',
            'message' => 'The coaching plan was excellent.',
            'status' => 'new',
            'rating' => 5,
            'is_published' => false,
        ]);

        $response = $this->actingAs($admin)->get(route('admin.feedback'));

        $response->assertOk()
            ->assertSee('Feedback Management')
            ->assertSee('Nimal Perera')
            ->assertSee('View')
            ->assertSee('Edit')
            ->assertSee('Delete')
            ->assertSee(route('admin.feedback.update', $feedback), false)
            ->assertSee('Delete feedback?')
            ->assertSee('value="DELETE"', false);
    }

    public function test_feedback_page_filters_by_search_type_and_status(): void
    {
        $admin = User::factory()->create();
        Feedback::create([
            'type' => 'testimonial',
            'name' => 'Unique Needle Client',
            'email' => 'match@example.com',
            'message' => 'A matching testimonial.',
            'status' => 'new',
        ]);
        Feedback::create([
            'type' => 'inquiry',
            'name' => 'Unique Needle Excluded',
            'email' => 'excluded@example.com',
            'message' => 'This record should be filtered out.',
            'status' => 'resolved',
        ]);

        $response = $this->actingAs($admin)->get(route('admin.feedback', [
            'search' => 'Unique Needle',
            'type' => 'testimonial',
            'status' => 'new',
        ]));

        $response->assertOk()
            ->assertSee('Unique Needle Client')
            ->assertDontSee('Unique Needle Excluded');
    }

    public function test_feedback_page_displays_summary_and_filter_controls(): void
    {
        $admin = User::factory()->create();
        Feedback::create([
            'type' => 'inquiry',
            'name' => 'Summary Client',
            'email' => 'summary@example.com',
            'message' => 'Please send package details.',
            'status' => 'new',
        ]);

        $response = $this->actingAs($admin)->get(route('admin.feedback', ['search' => 'Summary']));

        $response->assertOk()
            ->assertSee('Total feedback')
            ->assertSee('New feedback')
            ->assertSee('Testimonials')
            ->assertSee('Published')
            ->assertSee('name="search"', false)
            ->assertSee('value="Summary"', false)
            ->assertSee('name="type"', false)
            ->assertSee('name="status"', false);
    }

    public function test_admin_can_delete_feedback(): void
    {
        $admin = User::factory()->create();
        $feedback = Feedback::create([
            'type' => 'inquiry',
            'name' => 'Delete Client',
            'email' => 'delete@example.com',
            'message' => 'Remove this feedback.',
            'status' => 'resolved',
        ]);

        $response = $this->actingAs($admin)->delete("/admin/feedback/{$feedback->id}");

        $response->assertRedirect(route('admin.feedback'))
            ->assertSessionHas('success', 'Feedback deleted.');
        $this->assertDatabaseMissing('feedback', ['id' => $feedback->id]);
    }

    public function test_invalid_feedback_update_displays_validation_errors(): void
    {
        $admin = User::factory()->create();
        $feedback = Feedback::create([
            'type' => 'inquiry',
            'name' => 'Validation Client',
            'email' => 'validation@example.com',
            'message' => 'Keep this feedback.',
            'status' => 'new',
        ]);

        $response = $this->actingAs($admin)
            ->from(route('admin.feedback'))
            ->followingRedirects()
            ->put(route('admin.feedback.update', $feedback), ['status' => 'invalid']);

        $response->assertOk()->assertSee('The selected status is invalid.');
        $this->assertDatabaseHas('feedback', ['id' => $feedback->id, 'status' => 'new']);
    }

    public function test_admin_can_edit_and_publish_a_testimonial(): void
    {
        $admin = User::factory()->create();
        $feedback = Feedback::create([
            'type' => 'testimonial',
            'name' => 'Edit Client',
            'email' => 'edit@example.com',
            'message' => 'Original message.',
            'status' => 'new',
            'is_published' => false,
        ]);

        $response = $this->actingAs($admin)->put(route('admin.feedback.update', $feedback), [
            'status' => 'published',
            'admin_notes' => 'Approved for the website.',
            'role' => 'Transformation client',
            'rating' => 5,
            'result' => 'Lost 10 kg',
            'message' => 'Updated testimonial message.',
            'is_published' => '1',
        ]);

        $response->assertRedirect()->assertSessionHas('success', 'Feedback updated.');
        $this->assertDatabaseHas('feedback', [
            'id' => $feedback->id,
            'status' => 'published',
            'rating' => 5,
            'message' => 'Updated testimonial message.',
            'is_published' => true,
        ]);
    }

    public function test_guest_cannot_manage_feedback(): void
    {
        $feedback = Feedback::create([
            'type' => 'inquiry',
            'name' => 'Protected Client',
            'email' => 'protected@example.com',
            'message' => 'Protected feedback.',
            'status' => 'new',
        ]);

        $this->get(route('admin.feedback'))->assertRedirect(route('login'));
        $this->delete("/admin/feedback/{$feedback->id}")->assertRedirect(route('login'));
        $this->assertDatabaseHas('feedback', ['id' => $feedback->id]);
    }
}
