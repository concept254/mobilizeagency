import Layout from '@/Layouts/Layout';
import {Link, useForm, usePage} from "@inertiajs/react";
import {useState, useEffect } from "react";

export default function Show({product}) {
    const {flash} = usePage().props;
    const [flashMsg, setFlashMsg] = useState(flash.message);
    const [flashSuccess, setFlashSuccess] = useState(flash.success);
    const {component} = usePage();

    setTimeout(() =>{
        setFlashMsg(null),
        setFlashSuccess(null)
    }, 2000);

    const {delete:destroy} = useForm();

    function submit(e){
        e.preventDefault();
        destroy(`/products/${product.id}`)
    }
    return (
        <>

        {flashMsg && <div className='absolute top-24 right-6 bg-rose-500 p-2 rounded-md shadow-lg text-sm text-white'> {flashMsg} </div>}
            {flashSuccess && <div className='absolute top-24 right-6 bg-green-500 p-2 rounded-md shadow-lg text-sm text-white'> {flashSuccess} </div>}

        <div className="w-2/3 mx-auto">
            <img src={`/images/${product.image}`} alt={product.name} className="w-full object-cover sm:h-96 my-6"/> 
            <h1 className="title text-left">{product.name}</h1>
            <div className="my-4">
                {product.description}
            </div>
            <div className="text-right">
               <div className="font-medium my-4">Price: {product.price}</div>
               <div className="text-sm"> Quantity: {product.quantity} </div>
               <div className="flex items-center justify-end gap-2">
                    <form onSubmit={submit}>
                        <button className="primary-btn bg-red-500 text-white">Delete</button>
                    </form>
                    <Link href={`/products/${product.id}/edit`} className="bg-green-500 primary-btn text-white">Update</Link>
               </div>
            </div>
        </div>
        </>
    )
}