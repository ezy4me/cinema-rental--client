"use client";

import React, { useEffect, useState } from "react";
import styles from "./EquipmentGrid.module.scss";
import { Equipment } from "@/types/equipment";
import { fetchImageUrl } from "@/utils/fetchImageUrl";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/ui/Loader/Loader";

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
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const selectedCategoryId = searchParams.get("categoryId");

  const router = useRouter();

  useEffect(() => {
    const fetchEquipmentsWithImages = async () => {
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

    fetchEquipmentsWithImages();
  }, [equipments]);

  useEffect(() => {
    if (selectedCategoryId) {
      setSelectedCategory(Number(selectedCategoryId));
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    const filterEquipments = async () => {
      setLoading(true); 

      await new Promise((resolve) => setTimeout(resolve, 500));

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
      setLoading(false); 
    };

    filterEquipments()
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

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);

    const query = categoryId ? `?categoryId=${categoryId}` : "";
    router.replace(`/equipment${query}`, { scroll: false });
  };

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
                  onClick={() => handleCategorySelect(null)}>
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
                    onClick={() => handleCategorySelect(category.id)}>
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <main className={styles.equipmentGrid}>
            {loading ? (
              <Loader />
            ) : (
              paginatedEquipments.map((item) => (
                <div
                  key={item.id}
                  className={styles.equipmentCard}
                  onClick={() => router.push(`/equipment/${item.id}`)}>
                  <div className={styles.equipmentImage}>
                    <img
                      src={item.image || "/images/placeholder.png"}
                      alt={item.name}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.equipmentInfo}>
                    <h3 className={styles.equipmentName}>{item.name}</h3>
                    <p className={styles.equipmentDescription}>
                      {item.description}
                    </p>
                    <p className={styles.equipmentPrice}>
                      {parseFloat(item.pricePerDay)} ₽ / день
                    </p>
                    <p className={styles.equipmentQuantity}>
                      Количество: {item.quantity}
                    </p>
                  </div>
                </div>
              ))
            )}
          </main>
        </div>

        {!loading && (
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
        )}
      </div>
    </section>
  );
};

export default EquipmentGrid;
