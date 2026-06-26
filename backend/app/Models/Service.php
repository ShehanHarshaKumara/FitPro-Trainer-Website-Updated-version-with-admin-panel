<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Service extends Model { protected $fillable = ['title','description','features','image','icon','sort_order','is_published']; protected function casts(): array { return ['features'=>'array','is_published'=>'boolean']; } }
