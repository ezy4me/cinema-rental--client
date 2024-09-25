import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getEquipments } from "@/services/equipment.api";
import EquipmentDataGrid from "@/components/dashboard/DataGrids/EquipmentDataGrid";

const EquipmentsPage: React.FC = async () => {
  const session = await getServerSession(authOptions);
  let equipments: any = [];
  if (session) equipments = await getEquipments();

  return (
    <div>
      <EquipmentDataGrid equipments={equipments} />
    </div>
  );
};

export default EquipmentsPage;
