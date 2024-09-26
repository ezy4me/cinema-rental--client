import React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

interface ConfirmDeleteProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  itemName: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  color: '#000',
  p: 4,
};

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  open,
  handleClose,
  handleConfirm,
  itemName,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Подтверждение удаления
        </Typography>
        <Typography variant="body1" gutterBottom>
          Вы уверены, что хотите удалить {itemName}?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirm}
            sx={{ mr: 2 }}>
            Удалить
          </Button>
          <Button color="warning" variant="contained" onClick={handleClose}>
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDelete;
