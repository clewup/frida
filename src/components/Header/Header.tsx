"use client";

import useQueryParams from "@/lib/common/hooks/useQueryParams/useQueryParams";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  ShoppingCart as CartIcon,
  ShoppingBag as BagIcon,
} from "react-feather";
import { Search as SearchIcon } from "react-feather";

const Header = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const searchParams = useSearchParams();

  return (
    <div className="h-[15vh] flex items-center justify-between px-10">
      <Link href={"/"}>
        <BagIcon size={30} />
      </Link>
      <span className="flex gap-10 items-center">
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
