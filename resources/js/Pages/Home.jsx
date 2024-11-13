import Layout from '@/Layouts/Layout';
import { Head, Link, usePage} from '@inertiajs/react';
import {useState, useEffect } from "react";

export default function Home({ products }) {

    console.log(products);

    const {flash} = usePage().props;
    const [flashMsg, setFlashMsg] = useState(flash.message);
    const [flashSuccess, setFlashSuccess] = useState(flash.success);
    const {component} = usePage();

    setTimeout(() =>{
        setFlashMsg(null),
        setFlashSuccess(null)
    }, 2000);

    return (
        <>
        <Head title={component} />
            <h1 className="title">MOBILIZE MERCH STORE</h1>

            {flashMsg && <div className='absolute top-24 right-6 bg-rose-500 p-2 rounded-md shadow-lg text-sm text-white'> {flashMsg} </div>}
            {flashSuccess && <div className='absolute top-24 right-6 bg-green-500 p-2 rounded-md shadow-lg text-sm text-white'> {flashSuccess} </div>}

            <div>
                {products.data.map(product =>(
                    <div key={product.id} className="grid grid-cols-3 gap-5 p-4 border-b">
                        <div className="">
                            <img src={`/images/${product.image}`} alt={product.name} className="w-full object-cover sm:h-48"/> 
                        </div>
                        <div className="col-span-2">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm">{product.description}</p>
                            <div className="my-4">
                                <div className="block w-1/2 text-left">
                                    Price: <span className="font-medium"> R{product.price} </span>
                                </div>
                                <div className="block w-1/2 text-right float-right text-sm mr-2">
                                Quantity: <span className="font-medium">{product.quantity}</span>
                                </div>
                            </div>
                            <Link href={`/products/${product.id}`} className="text-link text-sm">Read More</Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="py-12 px-4">
                {products.links.map(link=> (
                    link.url ?(
                    <Link 
                        key={link.label} 
                        href={link.url} 
                        dangerouslySetInnerHTML={{__html: link.label}}
                        className={`p-1 mx-1 ${ link.active ? "text-blue-500 font-bold" : ''}`}
                    />
                    ):(
                    <span
                        key={link.label}
                        dangerouslySetInnerHTML={{__html: link.label}}
                        className="p-1 mx-1 text-slate-300"
                    >
                    </span>
                    )
                ))}
            </div>
        </>
    );
}