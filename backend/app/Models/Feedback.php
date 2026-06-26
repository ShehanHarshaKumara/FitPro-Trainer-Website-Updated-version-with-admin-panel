<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Feedback extends Model { protected $fillable = ['type','name','email','phone','package_id','role','rating','result','image','message','status','is_published','admin_notes']; protected function casts(): array { return ['is_published'=>'boolean']; } }
