<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class GalleryItem extends Model { protected $fillable = ['title','description','image','before_image','category','sort_order','is_published']; protected function casts(): array { return ['is_published'=>'boolean']; } }
