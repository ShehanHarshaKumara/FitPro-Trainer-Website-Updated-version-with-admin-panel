<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Package extends Model { protected $fillable = ['slug','title','duration','price','description','features','image','sort_order','is_published']; protected function casts(): array { return ['features'=>'array','is_published'=>'boolean']; } }
