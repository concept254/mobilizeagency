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
                        <div className="menu-left">
                            <Link href="/" className="nav-link">Home</Link>
                        </div>
                        <div class="status-msg"></div>
                        <div className="menu-right">
                            <Link href="/shop" className="small-link">Products</Link>
                            <Link href="/products/create" className="small-link">Create</Link>
                            <Link href="/register" className="small-link">Register</Link>
                            <Link href="/login" className="small-link">Login</Link>
                        </div>

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
