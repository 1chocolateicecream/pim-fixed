<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductGroup;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductsFactory> */
    use HasFactory;

    public $fillable = ["product_name", "product_description", "product_price", "stock"];

    public function productGroup() {
        return $this->belongsTo(ProductGroup::class);
    }
}
