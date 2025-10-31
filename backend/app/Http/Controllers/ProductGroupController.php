<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductGroup;
use Illuminate\Validation\ValidationException;

class ProductGroupController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index()
    {
        $productGroups = ProductGroup::all();
        return response()->json([
            'product_groups' => $productGroups
        ], 200);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'product_group_name' => 'required|max:1000'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }

        $productGroup = ProductGroup::create($validated);

        return response()->json([
            'product_groups' => [$productGroup]
        ], 200);
    }

    public function show(ProductGroup $productGroup)
    {
        $productGroup->load('products');
        return response()->json([
            'product_groups' => $productGroup
        ], 200);
    }

    public function update(Request $request, ProductGroup $productGroup)
    {
        try {
            $validated = $request->validate([
                'product_group_name' => 'required|max:1000'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }

        $productGroup->update($validated);

        return response()->json([
            'product_groups' => $productGroup
        ], 200);
    }

    public function destroy(ProductGroup $productGroup)
    {
        $deletedProductGroupName = $productGroup->product_group_name;
        $productGroup->delete();
        return response()->json([
            "message" => "Deleted product group " . $deletedProductGroupName
        ], 200);
    }
}