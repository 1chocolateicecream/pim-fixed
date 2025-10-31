<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class ProductGroup extends Model
{
    /** @use HasFactory<\Database\Factories\ProductGroupFactory> */
    use HasFactory;

    public $fillable = ["product_group_name"];

    public function products() {
        return $this->hasMany(Product::class);
    }
}
