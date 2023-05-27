"use client";

import { FC, useEffect, useState } from "react";
import { Category } from "@prisma/client";

interface FilterProps {}

const Filter: FC<FilterProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  async function getCategories() {
    const categoriesResponse = await fetch("/api/category");
    const categoriesData = await categoriesResponse.json();
    setCategories(categoriesData);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-black text-base-100 px-5 py-2 rounded-md">
      <div className="form-control flex-row gap-2">
        <label className="label">Category</label>
        <select className="select select-bordered text-black">
          {categories.map((category, index) => (
            <option value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
