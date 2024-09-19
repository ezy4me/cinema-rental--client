"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CategorySection.module.scss";
import { fetchImageUrl } from "@/utils/fetchImageUrl";
import { Category } from "@/types/category";

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategoriesWithImages = async () => {
      const updatedCategories = await Promise.all(
        categories.map(async (category) => {
          const imageUrl = await fetchImageUrl(category.fileId);
          return {
            ...category,
            image: imageUrl,
          };
        })
      );

      setCategoryData(updatedCategories);
    };

    fetchCategoriesWithImages();
  }, [categories]);

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/equipment?categoryId=${categoryId}`);
  };

  return (
    <section className={styles.categorySection}>
      <h2 className="title">Оборудование</h2>
      <div className={styles.container}>
        {categoryData.map((category) => (
          <div
            className={styles.card}
            key={category.id}
            onClick={() => handleCategoryClick(category.id)} 
          >
            <div className={styles.imageWrapper}>
              <img
                src={category.image || "/images/placeholder.png"}
                alt={category.name}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{category.name}</h3>
              <p className={styles.description}>{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
