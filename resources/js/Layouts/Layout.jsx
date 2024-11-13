import { Head, Link } from '@inertiajs/react';

export default function Layout({ children, auth = {}, laravelVersion, phpVersion  }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

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

                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="small-link"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="small-link"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="small-link"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}

                        </div>

                    </div>
                </div>
            </header>

            <main>
                {children}
            </main>

            <footer>
                <div className="copyrights text-sm text-white text-center pt-4">All rights reserved 2024</div>
                <div className="py-5 text-center text-white text-xs">Laravel v{laravelVersion} (PHP v{phpVersion})</div>
            </footer>
        </>
    )
}
