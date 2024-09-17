"use client";

import React, { useEffect, useState } from "react";
import styles from "./EquipmentGrid.module.scss";
import { Equipment } from "@/types/equipment";
import { fetchImageUrl } from "@/utils/fetchImageUrl";
import { useRouter } from "next/navigation";

interface EquipmentGridProps {
  equipments: Equipment[];
  brands: { id: number; name: string }[];
  categories: { id: number; name: string }[];
}

const PAGE_SIZE = 9;

const EquipmentGrid: React.FC<EquipmentGridProps> = ({
  equipments,
  brands,
  categories,
}) => {
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const fetchCategoriesWithImages = async () => {
      const updatedEquipments = await Promise.all(
        equipments.map(async (equipment) => {
          const imageUrl = await fetchImageUrl(equipment.fileId);
          return {
            ...equipment,
            image: imageUrl,
          };
        })
      );

      setEquipmentData(updatedEquipments);
      setFilteredEquipments(updatedEquipments);
    };

    fetchCategoriesWithImages();
  }, [equipments]);

  useEffect(() => {
    const filtered = equipmentData.filter((item) => {
      const matchesBrand = selectedBrand
        ? item.brandId === selectedBrand
        : true;
      const matchesCategory = selectedCategory
        ? item.categoryId === selectedCategory
        : true;
      return matchesBrand && matchesCategory;
    });

    setFilteredEquipments(filtered);
  }, [selectedBrand, selectedCategory, equipmentData]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const paginatedEquipments = filteredEquipments.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredEquipments.length / PAGE_SIZE);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <section>
      <div className="container">
        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3>Бренд</h3>
              <ul>
                <li
                  className={
                    selectedBrand === null ? styles.selectedFilter : ""
                  }
                  onClick={() => setSelectedBrand(null)}>
                  Все
                </li>
                {brands.map((brand) => (
                  <li
                    key={brand.id}
                    className={
                      selectedBrand === brand.id ? styles.selectedFilter : ""
                    }
                    onClick={() => setSelectedBrand(brand.id)}>
                    {brand.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.filterSection}>
              <h3>Категория</h3>
              <ul>
                <li
                  className={
                    selectedCategory === null ? styles.selectedFilter : ""
                  }
                  onClick={() => setSelectedCategory(null)}>
                  Все
                </li>
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className={
                      selectedCategory === category.id
                        ? styles.selectedFilter
                        : ""
                    }
                    onClick={() => setSelectedCategory(category.id)}>
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <main className={styles.equipmentGrid}>
            {paginatedEquipments.map((item) => (
              <div
                key={item.id}
                className={styles.equipmentCard}
                onClick={() => router.push(`/equipment/${item.id}`)}>
                <div className={styles.equipmentImage}>
                  <img
                    src={item.image || "/images/placeholder.png"}
                    alt={item.name}
                    className={styles.equipmentImage}
                  />
                </div>
                <div className={styles.equipmentInfo}>
                  <h3 className={styles.equipmentName}>{item.name}</h3>
                  <p className={styles.equipmentDescription}>
                    {item.description}
                  </p>
                  <p className={styles.equipmentPrice}>
                    ${parseFloat(item.pricePerDay).toFixed(2)} / день
                  </p>
                  <p className={styles.equipmentQuantity}>
                    Количество: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </main>
        </div>

        <div className={styles.pagination}>
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`${styles.pageButton} ${
                page === currentPage ? styles.activePage : ""
              }`}
              onClick={() => handlePageChange(page)}>
              {page}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentGrid;
