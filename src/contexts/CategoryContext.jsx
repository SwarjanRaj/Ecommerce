// src/contexts/CategoryContext.js
import React, { createContext, useEffect, useState } from 'react';
import { CATEGORYLIST, getSubCategories } from '../API/header';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cached = localStorage.getItem('categories');
        if (cached) {
          setCategories(JSON.parse(cached));
          setLoading(false);
        }

        const categoryList = await CATEGORYLIST();

        const categoryWithSubs = await Promise.all(
          categoryList.map(async (category) => {
            const subCategories = await getSubCategories(category.PK);
            return {
              id: category.PK,
              name: category.name,
              slug: category.Slug,
              subCategories: subCategories.map((sub) => ({
                sub_id: sub.id,
                sub_name: sub.name,
                sub_slug: sub.Slug,
              })),
            };
          })
        );

        setCategories(categoryWithSubs);
        localStorage.setItem('categories', JSON.stringify(categoryWithSubs));
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};
