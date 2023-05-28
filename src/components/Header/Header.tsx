"use client";

import { useLockr } from "@/lib/common/contexts/LockrContext/LockrContext";
import useAuth from "@/lib/common/hooks/useAuth/useAuth";
import useQueryParams from "@/lib/common/hooks/useQueryParams/useQueryParams";
import Avvvatars from "avvvatars-react";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  ShoppingCart as CartIcon,
  ShoppingBag as BagIcon,
} from "react-feather";
import { Search as SearchIcon } from "react-feather";
import constants from "@/constants/constants";
import Image from "next/image";

const Header = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const searchParams = useSearchParams();
  const { user } = useLockr();
  const { signIn, signOut } = useAuth({ redirectUri: constants.APP_URL });

  return (
    <div className="h-[15vh] flex items-center justify-between px-10">
      <Link href={"/"}>
        <BagIcon size={30} />
      </Link>
      <div className="flex gap-10 items-center">
        <Formik
          initialValues={{ search: searchParams.get("search") || "" }}
          onSubmit={(formValues) => {
            const updatedQuery = {
              ...queryParams,
              search: formValues.search,
              page: null,
            };
            setQueryParams(updatedQuery, "/catalogue");
          }}
        >
          <Form>
            <div className="input-group">
              <Field
                name="search"
                type="text"
                placeholder="Search"
                className="input border-black placeholder-black text-black input-lg"
              />
              <button className="btn btn-square btn-lg btn-accent text-base-100">
                <SearchIcon />
              </button>
            </div>
          </Form>
        </Formik>
        <Link href="/catalogue">
          <button className="btn btn-outline btn-lg">Catalogue</button>
        </Link>

        <div className="flex justify-end items-center gap-10">
          {!user ? (
            <span>
              <button className="btn btn-ghost btn-lg" onClick={signIn}>
                Log in
              </button>
            </span>
          ) : (
            <>
              <Link href="/cart">
                <button className="btn btn-outline btn-lg gap-5">
                  Cart
                  <CartIcon />
                </button>
              </Link>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div>
                    {user.image ? (
                      <span className="avatar">
                        <Image
                          src={user.image}
                          alt="user_image"
                          width={50}
                          height={50}
                          className="mask mask-squircle"
                        />
                      </span>
                    ) : (
                      <Avvvatars value={user.email} size={45} />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 border-[1px] border-black menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li onClick={signOut}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
