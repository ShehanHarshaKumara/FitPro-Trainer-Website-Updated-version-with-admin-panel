<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void {
        $now = now();
        $transformations = [
            ['12 Week Transformation','Before and after progress from focused training and nutrition','/assets/img3.jpeg','/assets/img4.jpeg'],
            ['Body Recomposition','Leaner shape with improved muscle definition','/assets/img5.jpeg','/assets/img6.jpeg'],
            ['Muscle Building Success','Stronger physique built through progressive training','/assets/img7.jpeg','/assets/img8.jpeg'],
            ['Strength Gains','Visible progress from consistent strength work','/assets/img9.jpeg','/assets/img10.jpeg'],
            ['Athletic Performance','Conditioning and body composition improved together','/assets/img11.jpeg','/assets/img12.jpeg'],
            ['Complete Transformation','Full transformation through training, nutrition, and accountability','/assets/img13.jpeg','/assets/img14.jpeg'],
            ['Fat Loss Progress','Sharper condition from a focused fat loss phase','/assets/img15.jpeg','/assets/img16.jpeg'],
            ['Lean Muscle Progress','Improved size, posture, and overall shape','/assets/img17.jpeg','/assets/img18.jpeg'],
            ['Physique Upgrade','Clear before and after body composition change','/assets/img19.jpeg','/assets/img20.jpeg'],
            ['Transformation Journey','Step-by-step progress through structured coaching','/assets/img21.jpeg','/assets/img22.jpeg'],
            ['Client Result','Before and after progress with measurable consistency','/assets/img23.jpeg','/assets/img24.jpeg'],
        ];
        foreach ($transformations as $index => [$title, $description, $before, $after]) {
            if (!DB::table('gallery_items')->where('title', $title)->exists()) DB::table('gallery_items')->insert(['title'=>$title,'description'=>$description,'before_image'=>$before,'image'=>$after,'category'=>'transformation','sort_order'=>$index + 1,'is_published'=>true,'created_at'=>$now,'updated_at'=>$now]);
        }
        $training = [
            'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1648542036561-e1d66a5ae2b1?auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&w=1080&q=80',
        ];
        foreach ($training as $index => $image) {
            $title = 'Training Photo '.($index + 1);
            if (!DB::table('gallery_items')->where('title', $title)->exists()) DB::table('gallery_items')->insert(['title'=>$title,'description'=>'Training and coaching gallery image','image'=>$image,'category'=>'training','sort_order'=>$index + 20,'is_published'=>true,'created_at'=>$now,'updated_at'=>$now]);
        }
    }
    public function down(): void { DB::table('gallery_items')->where('title','like','Training Photo %')->orWhereIn('title',['12 Week Transformation','Body Recomposition','Muscle Building Success','Strength Gains','Athletic Performance','Complete Transformation','Fat Loss Progress','Lean Muscle Progress','Physique Upgrade','Transformation Journey','Client Result'])->delete(); }
};
