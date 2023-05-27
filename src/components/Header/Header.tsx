"use client";

import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import Link from "next/link";
import {
  ShoppingCart as CartIcon,
  ShoppingBag as BagIcon,
} from "react-feather";

const Header = () => {
  return (
    <div className="h-[15vh] flex items-center justify-between px-10">
      <Link href={"/"}>
        <BagIcon size={30} />
      </Link>
      <span className="flex gap-10 items-center">
        <MusicPlayer />
        <Link href="/catalogue">
          <button className="btn btn-outline btn-lg">Catalogue</button>
        </Link>
        <Link href="/cart">
          <button className="btn btn-outline btn-lg gap-5">
            Cart
            <CartIcon />
          </button>
        </Link>
      </span>
    </div>
  );
};
export default Header;
