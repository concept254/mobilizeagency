<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
    public function index()
    {
        $products = Product::latest()->paginate(6);
        
        return inertia('Home', ['products' => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $fields = $request->validate([
            'name' => ['required'],
            'price' => 'required|integer',
            'quantity' => 'required|integer',
            'image' =>'required|image|mimes:png,jpeg|max:1024',
            'description' => ['required']
        ]);

        $imageName = time().'.'.$request->image->extension();
        $request->image->move(public_path("images"), $imageName);

        $fields['image'] = $imageName;

        Product::create($fields);

        return redirect('/products')->with(
            'success', 'The product was created successfully!',
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        sleep(2);
        return inertia('Show', ['product' => $product]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return inertia('Edit', ['product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        
        $fields = $request->validate([
            'name' => 'required',
            'price' => 'required|integer',
            'quantity' => 'required|integer',
            'description' => 'required',
            "image" => ''
        ]);
        

        // $imageName = time().'.'.$request->image->extension();
        // $request->image->move(public_path("images"), $imageName);

        // $fields['image'] = $imageName;
        

        // dd($fields);

        $product->update($fields);

        return redirect('/products')->with(
            'success', 'The product was updated successfully!',
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect('/products')->with(
            'message', 'The product was deleted!',
        );
    }
}
