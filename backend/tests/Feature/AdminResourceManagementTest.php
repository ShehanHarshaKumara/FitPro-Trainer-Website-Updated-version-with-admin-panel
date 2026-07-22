<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\Package;
use App\Models\GalleryItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminResourceManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_services_page_displays_redesigned_management_table(): void
    {
        $admin = User::factory()->create();
        $service = Service::create([
            'title' => 'Strength Coaching',
            'description' => 'Personal strength and conditioning.',
            'features' => ['Weekly plan', 'Progress tracking'],
            'icon' => 'dumbbell',
            'is_published' => true,
        ]);

        $response = $this->actingAs($admin)->get(route('admin.resources', 'services'));

        $response->assertOk()
            ->assertSee('Services Management')
            ->assertSee('Total items')
            ->assertSee('Published')
            ->assertSee('Drafts')
            ->assertSee('name="search"', false)
            ->assertSee('Strength Coaching')
            ->assertSee('View')
            ->assertSee('Edit')
            ->assertSee('Delete item?')
            ->assertSee(route('admin.edit', ['services', $service->id]), false);
    }

    public function test_resource_page_filters_by_search_and_publication(): void
    {
        $admin = User::factory()->create();
        Service::create([
            'title' => 'Unique Mobility Program',
            'description' => 'The visible matching service.',
            'is_published' => false,
        ]);
        Service::create([
            'title' => 'Unique Mobility Published',
            'description' => 'This item must be filtered out.',
            'is_published' => true,
        ]);

        $response = $this->actingAs($admin)->get(route('admin.resources', [
            'type' => 'services',
            'search' => 'Unique Mobility',
            'publication' => 'draft',
        ]));

        $response->assertOk()
            ->assertSee('Unique Mobility Program')
            ->assertDontSee('Unique Mobility Published')
            ->assertSee('value="Unique Mobility"', false);
    }

    public function test_package_create_page_displays_structured_editor(): void
    {
        $admin = User::factory()->create();

        $response = $this->actingAs($admin)->get(route('admin.create', 'packages'));

        $response->assertOk()
            ->assertSee('Create Package')
            ->assertSee('Package details')
            ->assertSee('Content and features')
            ->assertSee('Media and publication')
            ->assertSee('Save Package');
    }

    public function test_packages_page_displays_package_specific_details(): void
    {
        $admin = User::factory()->create();
        Package::create([
            'slug' => 'elite-package-test',
            'title' => 'Elite Package Test',
            'duration' => '16 weeks',
            'price' => 'LKR 40,000',
            'description' => 'A complete coaching package.',
            'features' => ['Training', 'Nutrition'],
            'is_published' => true,
        ]);

        $response = $this->actingAs($admin)->get(route('admin.resources', 'packages'));

        $response->assertOk()
            ->assertSee('Packages Management')
            ->assertSee('Elite Package Test')
            ->assertSee('16 weeks')
            ->assertSee('LKR 40,000')
            ->assertSee('Package details');
    }

    public function test_gallery_page_displays_image_preview_and_category(): void
    {
        $admin = User::factory()->create();
        GalleryItem::create([
            'title' => 'Transformation Preview Test',
            'description' => 'Before and after progress.',
            'image' => 'gallery/preview-test.jpg',
            'before_image' => 'gallery/before-preview-test.jpg',
            'category' => 'transformation',
            'is_published' => false,
        ]);

        $response = $this->actingAs($admin)->get(route('admin.resources', 'gallery'));

        $response->assertOk()
            ->assertSee('Gallery Management')
            ->assertSee('Transformation Preview Test')
            ->assertSee('transformation')
            ->assertSee(asset('storage/gallery/preview-test.jpg'), false)
            ->assertSee(asset('storage/gallery/before-preview-test.jpg'), false)
            ->assertSee('Gallery item details');
    }

    public function test_gallery_preserves_public_and_remote_image_urls(): void
    {
        $admin = User::factory()->create();
        GalleryItem::create([
            'title' => 'Public Asset Test',
            'image' => '/assets/img22.jpeg',
            'category' => 'training',
            'is_published' => true,
        ]);
        GalleryItem::create([
            'title' => 'Remote Asset Test',
            'image' => 'https://images.example.com/training.jpg',
            'category' => 'training',
            'is_published' => true,
        ]);

        $response = $this->actingAs($admin)->get(route('admin.resources', 'gallery'));

        $response->assertOk()
            ->assertSee('src="/assets/img22.jpeg"', false)
            ->assertSee('src="https://images.example.com/training.jpg"', false);
    }

    public function test_resource_page_paginates_large_collections(): void
    {
        $admin = User::factory()->create();
        foreach (range(1, 16) as $index) {
            Service::create([
                'title' => "Pagination Service {$index}",
                'description' => 'Pagination test item.',
                'is_published' => true,
            ]);
        }

        $response = $this->actingAs($admin)->get(route('admin.resources', 'services'));

        $response->assertOk()
            ->assertSee('Page 1 of 2')
            ->assertSee('page=2', false);
    }

    public function test_admin_can_create_a_package_draft_from_the_redesigned_form(): void
    {
        $admin = User::factory()->create();

        $response = $this->actingAs($admin)->post(route('admin.store', 'packages'), [
            'title' => 'Draft Package Test',
            'duration' => '8 weeks',
            'price' => 'LKR 20,000',
            'description' => 'Draft package description.',
            'features_text' => "Training plan\nNutrition guide",
            'is_published' => '0',
        ]);

        $response->assertRedirect(route('admin.resources', 'packages'))
            ->assertSessionHas('success');
        $package = Package::where('title', 'Draft Package Test')->firstOrFail();
        $this->assertFalse($package->is_published);
        $this->assertSame(['Training plan', 'Nutrition guide'], $package->features);
    }

    public function test_guest_cannot_access_resource_management_pages(): void
    {
        $this->get(route('admin.resources', 'services'))->assertRedirect(route('login'));
        $this->get(route('admin.create', 'gallery'))->assertRedirect(route('login'));
    }

    public function test_before_only_gallery_item_does_not_render_an_empty_after_image(): void
    {
        $admin = User::factory()->create();
        GalleryItem::create([
            'title' => 'Before Only Test',
            'before_image' => 'gallery/before-only.jpg',
            'category' => 'transformation',
            'is_published' => false,
        ]);

        $response = $this->actingAs($admin)->get(route('admin.resources', [
            'type' => 'gallery',
            'search' => 'Before Only Test',
        ]));

        $response->assertOk()
            ->assertSee(asset('storage/gallery/before-only.jpg'), false)
            ->assertDontSee('src=""', false);
    }
}
