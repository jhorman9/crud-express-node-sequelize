import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import CustomCard from "../components/CustomCard";
import Input from "../components/Input";
import axios from "axios";
import Swal from "sweetalert2";

function CreateForm() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleValue = (field, value) => {
    const copyState = { ...formValues };
    copyState[field] = value;
    setFormValues(copyState);
  };

  const handleClear = () => {
    setFormValues({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = () => {
    axios.post('http://127.0.0.1:8000/users', formValues)
    .then(response => {
      Swal.fire({
        title: "Usuario creado",
        text: `${response.data.message}`,
        icon: "success",
        background: 'gray',
        color: "white",
        confirmButtonText: "Continuar",
        confirmButtonColor: '#333',
      });
      handleClear();
    })
    .catch(error => {
      console.log('errir:', error.response.data.error)
      Swal.fire({
        title: "Oops error",
        text: `${error.response.data.error}`,
        icon: "error"
      });
      handleClear();
    });
  };

  return (
    <CustomCard>
      <Box
        sx={{
          padding: "35px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Typography variant="h4" color="secondary">
          Crear Usuario
        </Typography>
        <Input
          variant="outlined"
          size="medium"
          label="nombre"
          color="secondary"
          focused
          fullWidth
          onChange={(e) => handleValue("username", e.target.value)}
        />
        <Input
          variant="outlined"
          size="medium"
          label="email"
          color="secondary"
          focused
          fullWidth
          onChange={(e) => handleValue("email", e.target.value)}
        />
        <Input
          type="password"
          variant="outlined"
          size="medium"
          label="password"
          color="secondary"
          focused
          fullWidth
          onChange={(e) => handleValue("password", e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleSubmit}
        >
          Crear
        </Button>
      </Box>
    </CustomCard>
  );
}

export default CreateForm;
