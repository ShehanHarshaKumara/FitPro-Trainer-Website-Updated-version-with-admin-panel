<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void {
        $now = now();
        $services = [
            ['title'=>'1-on-1 Personal Training','description'=>'Onsite or live video coaching focused on technique correction, performance improvement, and real-time guidance.','icon'=>'dumbbell','features'=>['Onsite sessions','Live video coaching','Form correction','Goal-based programming']],
            ['title'=>'Online Fitness Coaching','description'=>'Complete remote coaching with customized workout plans, nutrition guidance, check-ins, and ongoing support.','icon'=>'monitor','features'=>['Remote coaching','Workout guidance','Nutrition support','Progress check-ins']],
            ['title'=>'Fat Loss Coaching','description'=>'Science-based fat loss strategies designed to reduce body fat while protecting lean muscle and lifestyle balance.','icon'=>'weight','features'=>['Nutrition control','Progressive training','Body composition focus','Sustainable habits']],
            ['title'=>'Muscle Building Programs','description'=>'Structured hypertrophy-focused coaching for lean muscle growth, strength, and natural physique development.','icon'=>'trending','features'=>['Progressive overload','Hypertrophy training','Compound lifts','Recovery planning']],
            ['title'=>'Body Recomposition Coaching','description'=>'A balanced strategy to build muscle and reduce fat through targeted training, nutrition, and accountability.','icon'=>'heart','features'=>['Build muscle','Reduce body fat','Strategic nutrition','Progress tracking']],
            ['title'=>'Personalized Meal Plans','description'=>'Practical nutrition plans tailored to your body, schedule, food preferences, and transformation goal.','icon'=>'apple','features'=>['Meal planning','Macro guidance','Lifestyle fit','Healthy habit coaching']],
            ['title'=>'Personalized Workout Plans','description'=>'Practical training programs tailored to your fitness level, schedule, recovery capacity, and transformation goal.','icon'=>'dumbbell','features'=>['Customized workout programming','Progressive overload guidance','Exercise technique coaching','Lifestyle and habit support']],
        ];
        foreach ($services as $index => $service) {
            if (!DB::table('services')->where('title', $service['title'])->exists()) {
                DB::table('services')->insert([...$service, 'features'=>json_encode($service['features']), 'image'=>null, 'sort_order'=>$index + 1, 'is_published'=>true, 'created_at'=>$now, 'updated_at'=>$now]);
            }
        }
    }
    public function down(): void { DB::table('services')->whereIn('title', ['1-on-1 Personal Training','Online Fitness Coaching','Fat Loss Coaching','Muscle Building Programs','Body Recomposition Coaching','Personalized Meal Plans','Personalized Workout Plans'])->delete(); }
};
