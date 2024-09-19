import EquipmentGrid from "@/components/features/Equipment/EquipmentGrid/EquipmentGrid";
import EquipmentHeroSection from "@/components/features/Equipment/EquipmentHeroSection";
import { getBrands } from "@/services/brand.api";
import { getCategories } from "@/services/category.api";
import { getEquipments } from "@/services/equipment.api";

export default async function Page() {
  const equipmentData = await getEquipments();
  const brandData = await getBrands();
  const categoryData = await getCategories();

  return (
    <div className="page">
      <EquipmentHeroSection />
      <EquipmentGrid
        equipments={equipmentData} 
        brands={brandData}
        categories={categoryData}
      />
    </div>
  );
}
