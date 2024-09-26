"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  MenuItem,
  Typography,
  Stack,
  styled,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { addEquipment } from "@/services/equipment.api";
import { getCategories } from "@/services/category.api";
import { getBrands } from "@/services/brand.api";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface EquipmentFormProps {
  open: boolean;
  handleClose: () => void;
  onEquipmentAdded: (newEquipment: any) => void;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({
  open,
  handleClose,
  onEquipmentAdded,
}) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pricePerDay: 0,
    quantity: 1,
    category: "2",
    brand: "1",
    file: null as File | null,
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    pricePerDay: "",
    quantity: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getCategories();
      const fetchedBrands = await getBrands();
      setCategories(fetchedCategories);
      setBrands(fetchedBrands);
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); 
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      description: "",
      pricePerDay: "",
      quantity: "",
    };

    if (!formData.name) {
      newErrors.name = "Пожалуйста, введите название.";
    }
    if (!formData.description) {
      newErrors.description = "Пожалуйста, введите описание.";
    }
    if (formData.pricePerDay <= 0) {
      newErrors.pricePerDay = "Пожалуйста, введите корректную стоимость.";
    }
    if (formData.quantity <= 0) {
      newErrors.quantity = "Количество должно быть больше нуля.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const newEquipment = {
      name: formData.name,
      description: formData.description,
      pricePerDay: formData.pricePerDay,
      quantity: formData.quantity,
      categoryId: formData.category,
      brandId: formData.brand,
      file: formData.file,
      fileId: "/images/placeholder.png",
    };

    const addedEquipment = await addEquipment(
      newEquipment,
      session?.accessToken!
    );
    onEquipmentAdded(addedEquipment);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 600,
          overflow: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          color: "#000",
          p: 4,
        }}>
        <Typography variant="h5" mb={2}>
          Добавить оборудование
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Название"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Описание"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={3}
            fullWidth
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            label="Стоимость в день"
            name="pricePerDay"
            type="number"
            value={formData.pricePerDay}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.pricePerDay}
            helperText={errors.pricePerDay}
          />
          <TextField
            label="Количество"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
          <TextField
            label="Категория"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            select
            fullWidth>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Бренд"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            select
            fullWidth>
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </TextField>

          {preview && (
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                marginBottom: 2,
              }}
              src={preview}
              alt="Предварительный просмотр изображения"
            />
          )}

          <Button
            sx={{ backgroundColor: "#000", color: "#fff" }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}>
            Загрузить фото
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          <Button
            sx={{ backgroundColor: "#000", color: "#fff" }}
            color="primary"
            onClick={handleSubmit}>
            Добавить
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EquipmentForm;
