import { Head, Link } from '@inertiajs/react';

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <meta 
                    head-key="description"
                    name="description" 
                    content="This is the default description" 
                />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
            </Head>

            <header>
                <div className="header-wrapper">
                    <div className="top-header">
                        <Link href="/" className="nav-link">Home</Link>
                        <Link href="/products" className="nav-link">Products</Link>
                        <Link href="/products/create" className="nav-link">Create</Link>
                        <Link href="/register" className="nav-link">Register</Link>
                        <Link href="/login" className="nav-link">Login</Link>
                    </div>
                </div>
            </header>

            <main>
                {children}
            </main>

            <footer>
                <div className="copyrights text-sm text-white text-center">All rights reserved 2024</div>
            </footer>
        </>
    )
}
