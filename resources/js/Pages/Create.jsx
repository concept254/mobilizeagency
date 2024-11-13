import Layout from '@/Layouts/Layout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from "@inertiajs/react";

export default function Create (){
    const { data, setData, post, errors, processing, progress} = useForm({
        name: "",
        price: "",
        quantity: "",
        description: "",
        image: ""
    });

    function submit(e) {
        e.preventDefault()
        post('/products');
    }

    console.log(errors);

    return(
        <>
            <Head>
                <meta 
                    head-key="description"
                    name="description" 
                    content="This is the create description" 
                />
            </Head>

            <h1 className="title">Create a new product</h1>
            
            <div className="w-1/2 mx-auto">
                <form onSubmit={submit}>
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={data.name} 
                        onChange={(e) => setData('name', e.target.value)} 
                        className={errors.name && '!ring-red-500'}/>
                    {errors.name && <p className="error text-sm py-2">{errors.name}</p>}
                    <label>Price</label>
                    <input 
                        type="text" 
                        value={data.price}  
                        onChange={(e) => setData('price', e.target.value)} 
                        className={errors.name && '!ring-red-500'}/>
                    {errors.price && <p className="error text-sm py-2">{errors.price}</p>}
                    <label>Quantity</label>
                    <input 
                        type="text" 
                        value={data.quantity}  
                        onChange={(e) => setData('quantity', e.target.value)} 
                        className={errors.name && '!ring-red-500'}/>
                    {errors.quantity && <p className="error text-sm py-2">{errors.quantity}</p>}
                    <label>Product Image</label>
                    <input 
                        type="file" 
                        onChange={e => setData('image', e.target.files[0])} />
                        {progress && (
                        <progress value={progress.percentage} max="90%">
                            {progress.percentage}%
                        </progress>
                        )}
                    {errors.image && <p className="error text-sm py-2">{errors.image}</p>}
                    <label>Description</label>
                    <textarea rows="5" value={data.description}  onChange={(e) => setData('description', e.target.value)} className="my-2"></textarea>
                    <button 
                        className="bg-green-500 primary-btn text-white"
                        disabled={processing}
                    >
                        Create Product
                    </button>
                </form>
            </div>
        </>
    )
}