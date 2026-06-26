<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void {
        $now = now();
        $packages = [
            ['slug'=>'legacy','title'=>'LEGACY','duration'=>'12-Month Transformation Journey','price'=>'Rs. 165,500','description'=>'A premium year-round coaching experience with guidance, accountability, and support for a stronger physique and sustainable lifestyle.','features'=>['Fully personalized nutrition plan with ongoing updates','Customized training programs tailored to your goals and schedule','Daily progress tracking and accountability','Unlimited meal plan modifications when required','Personalized workout plan updates throughout the year','Supplementation guidance and recommendations','Technique and exercise support','Lifestyle and habit coaching','24-Hour WhatsApp response guarantee','Direct access to your coach for guidance and support']],
            ['slug'=>'foundation','title'=>'FOUNDATION','duration'=>'3-Month Coaching Program','price'=>'Rs. 66,500','description'=>'A results-driven coaching experience designed to build momentum, establish consistency, and create measurable progress through personalized training and nutrition.','features'=>['Personalized meal plan tailored to your goals','Customized training program based on your fitness level and lifestyle','Weekly progress tracking and feedback','Ongoing plan modifications based on your results','Supplementation recommendations','Accountability and coach support','Exercise form and technique guidance','24-48 Hour WhatsApp response guarantee']],
            ['slug'=>'elevate','title'=>'ELEVATE','duration'=>'6-Month Coaching Program','price'=>'Rs. 92,500','description'=>'A structured and sustainable approach for people serious about maximizing results, refining physique, and improving performance.','features'=>['Personalized nutrition plan with ongoing updates','Goal-specific training programs designed for progression','Regular progress assessments and strategy adjustments','Recovery and lifestyle management guidance','Supplementation recommendations','Performance and physique tracking','Coach support throughout the program','24-48 Hour WhatsApp response guarantee']],
            ['slug'=>'elite-monthly','title'=>'ELITE MONTHLY','duration'=>'Monthly Coaching Membership','price'=>'Rs. 28,500','description'=>'A high-support coaching experience for individuals who value regular guidance and accountability.','features'=>['Personalized meal plan','Customized training plan','Weekly progress reviews','Coach feedback and support','Recipe collection','Supplement guidance','24-48 Hour WhatsApp response guarantee']],
            ['slug'=>'nutrition-blueprint','title'=>'NUTRITION BLUEPRINT','duration'=>'One-Time Plan','price'=>'Rs. 16,500','description'=>'A personalized nutrition plan built around your lifestyle, food preferences, and body composition goals.','features'=>['Customized calorie targets','Personalized meal structure','Flexible food selections','Supplement recommendations']],
            ['slug'=>'training-blueprint','title'=>'TRAINING BLUEPRINT','duration'=>'One-Time Workout Plan','price'=>'Rs. 16,500','description'=>'A fully customized workout program designed for your fitness level, experience, equipment, and physique goals.','features'=>['Personalized workout plan','Customized to your fitness level and experience','Home or gym-based training options','Goal-specific exercise selection','Structured sets, reps, and training volume','Progressive overload strategy for continued results','Clear exercise instructions and training guidance']],
        ];
        foreach ($packages as $index => $package) {
            if (!DB::table('packages')->where('slug', $package['slug'])->exists()) {
                DB::table('packages')->insert([...$package, 'features'=>json_encode($package['features']), 'image'=>null, 'sort_order'=>$index + 1, 'is_published'=>true, 'created_at'=>$now, 'updated_at'=>$now]);
            }
        }
    }
    public function down(): void { DB::table('packages')->whereIn('slug', ['legacy','foundation','elevate','elite-monthly','nutrition-blueprint','training-blueprint'])->delete(); }
};
