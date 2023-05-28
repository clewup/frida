"use client";

import AutoSubmit from "@/lib/common/components/AutoSubmit/AutoSubmit";
import useApi from "@/lib/common/hooks/useApi/useApi";
import useQueryParams from "@/lib/common/hooks/useQueryParams/useQueryParams";
import { SearchResponseType } from "@/types/searchTypes";
import { Field, Form, Formik, FormikValues } from "formik";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Category } from "@prisma/client";

interface FilterProps {
  searchResults: SearchResponseType;
}

const Filter: FC<FilterProps> = ({ searchResults }) => {
  const searchParams = useSearchParams();
  const { queryParams, setQueryParams } = useQueryParams();
  const { get } = useApi();
  const [categories, setCategories] = useState<Category[]>([]);

  async function getCategories() {
    const categoriesData = await get<Category[]>("/api/category");
    setCategories(categoriesData);
  }

  useEffect(() => {
    getCategories();
  }, []);

  type FilterFormValues = {
    category: string;
  };

  const initialValues: FilterFormValues = {
    category: searchParams.get("category") || "default",
  };

  function onSubmit(formValues: FormikValues) {
    const reservedValues = ["default"];

    Object.entries(formValues).forEach(([key, value]) => {
      const isNotFiltered = reservedValues.includes(value);

      const updatedQuery = {
        ...queryParams,
        page: null,
        [key]: isNotFiltered ? null : value,
      };
      setQueryParams(updatedQuery);
    });
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {({ values, handleChange }) => {
        return (
          <Form className="flex flex-col items-center justify-between bg-black rounded-md text-base-100 px-2 gap-5 py-1 md:flex-row md:gap-20">
            <span className="form-control flex-row gap-2">
              <label className="label">Category</label>
              <Field name="category">
                {() => (
                  <select
                    name="category"
                    className="select select-bordered w-60 text-black"
                    disabled={!categories.length}
                    value={values.category}
                    onChange={handleChange}
                  >
                    <option value={"default"}>Select...</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            </span>
            <p className="text-lg">
              {searchResults.pagination.pageResults +
                searchResults.pagination.resultsPerPage *
                  (searchResults.pagination.page - 1)}
              /{searchResults.pagination.totalResults} results
            </p>
            <AutoSubmit />
          </Form>
        );
      }}
    </Formik>
  );
};

export default Filter;
