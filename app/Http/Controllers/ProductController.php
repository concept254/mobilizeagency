<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource on the home page
     */
    
    public function index()
    {
        $products = Product::latest()->paginate(6)->toArray();
        
        return Inertia::render('Home', [
            'products' => $products,
            'auth' => [
                'user' => auth()->user(),
            ],
            'canLogin' => Route::has('login'), 
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    // list all products
    public function shop()
    {
        $products = Product::latest()->paginate(6);
        
        return inertia('Shop', ['products' => $products]);
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

        // validate form fields before storing
        $fields = $request->validate([
            'name' => ['required'],
            'price' => 'required|integer',
            'quantity' => 'required|integer',
            'image' =>'required|image|mimes:png,jpeg|max:1024',
            'description' => ['required']
        ]);

        // grab image name and move file to public/images folder
        $imageName = time().'.'.$request->image->extension();
        $request->image->move(public_path("images"), $imageName);

        $fields['image'] = $imageName;

        Product::create($fields);

        // redirect and show flas message
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
        // validate form fields
        $fields = $request->validate([
            'name' => 'required',
            'price' => 'required|integer',
            'quantity' => 'required|integer',
            'description' => 'required',
            "image" => ''
        ]);

        // update the product
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
        // delete and return with flash message
        $product->delete();

        return redirect('/products')->with(
            'message', 'The product was deleted!',
        );
    }
}
