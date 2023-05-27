'use client'

import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import Link from "next/link";
import {ShoppingCart as CartIcon} from 'react-feather';

const Header = () => {
    return (
        <div className="h-[15vh] flex items-center justify-end px-10">
            <span className="flex gap-10 items-center">
                <MusicPlayer/>
                <Link href="/">
                    <button className="btn btn-outline btn-lg">
                        Catalogue
                    </button>
                </Link>
                <Link href="/">
                    <button className="btn btn-outline btn-lg gap-5">
                        Cart
                    <CartIcon/>

                    </button>
                </Link>
            </span>

        </div>
    )
}
export default Header;