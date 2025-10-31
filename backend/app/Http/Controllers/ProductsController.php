<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\ProductGroup;

class ProductsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index()
    {
        $products = Product::all();
        return response()->json([
            'products' => $products
        ], 200);
    }

    public function store(Request $request, ProductGroup $productGroup)
    {
        try {
            $validated = $request->validate([
                'product_name' => 'required|max:255',
                'product_description' => 'max:1250|nullable',
                'product_price' => 'required|numeric',
                'stock' => 'numeric|nullable'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }

        $product = $productGroup->products()->create($validated);

        return response()->json([
            'product' => $product,
            'product_group' => $productGroup
        ], 200);
    }

    public function show(Product $product)
    {
        return response()->json([
            'product' => $product
        ], 200);
    }

    public function update(Request $request, Product $product)
    {
        try {
            $validated = $request->validate([
                'product_name' => 'required|max:255',
                'product_description' => 'max:1250|nullable',
                'product_price' => 'required|numeric',
                'stock' => 'numeric|nullable'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }

        $product->update($validated);
        $product->load('productGroup');

        return response()->json([
            'product' => $product
        ], 200);
    }

    public function destroy(Product $product)
    {
        $deletedProductName = $product->product_name;
        $product->delete();
        return response()->json([
            'message' => "Deleted product " . $deletedProductName
        ], 200);
    }
}

