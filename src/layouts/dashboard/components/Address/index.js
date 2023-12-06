/* eslint-disable */
import React, { useState, useEffect  } from "react";
import axios from "axios"; // Importe o Axios ou a biblioteca que você está usando para fazer chamadas à API.
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

function Address() {
  const columns = [
    { Header: "CEP", accessor: "CEP" },
    { Header: "Endereço", accessor: "ENDERECO" },
    { Header: "Bairro", accessor: "BAIRRO" },
    { Header: "Cidade", accessor: "CIDADE" },
    { Header: "UF", accessor: "UF" },
  ];

  const [menu, setMenu] = useState(null);
  const [addressData, setAddressData] = useState([]); // Estado para armazenar os dados da API.
  const [isLoading, setIsLoading] = useState(false);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const fetchAddresses = async () => {
    setIsLoading(true); // Ativa o indicador de carregamento

    try {
      const response = await axios.get("http://localhost:3003/api/enderecos");
      const data = response.data;
      setAddressData(data); // Atualize o estado com os dados da API.
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
    } finally {
      setIsLoading(false); // Desativa o indicador de carregamento, independentemente do resultado
    }
  };

  // Use o useEffect para chamar fetchAddresses quando o componente for montado
  useEffect(() => {
    fetchAddresses();
  }, []); // O array vazio assegura que isso só aconteça uma vez após a montagem do componente


  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Ação 1</MenuItem>
      <MenuItem onClick={closeMenu}>Ação 2</MenuItem>
      <MenuItem onClick={closeMenu}>Ação 3</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox p={2}>
        <MDButton
          variant="gradient"
          color="info"
          onClick={fetchAddresses}
          disabled={isLoading} // Desativa o botão durante o carregamento
        >
          {isLoading ? "Buscando..." : "Buscar Endereços"}
        </MDButton>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Endereços
          </MDTypography>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        {addressData && addressData.length > 0 ? (
          <DataTable
            table={{ columns, rows: addressData }}
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
            entriesPerPage={false}
          />
        ) : (
          <MDBox mt={0} mb={2}>
            <MDTypography variant="button" color="text" fontWeight="regular">
              Nenhum endereço encontrado
            </MDTypography>
          </MDBox>
        )}
      </MDBox>
    </Card>
  );
}

export default Address;
