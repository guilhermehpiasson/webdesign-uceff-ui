/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

function OrdersOverview() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  const consultarCep = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/api/enderecos/consulta-cep/${cep}`);
      const data = response.data;
      setEndereco(data.ENDERECO);
      setBairro(data.BAIRRO);
      setCidade(data.CIDADE);
      setUf(data.UF);
    } catch (error) {
      console.error("Erro ao consultar o CEP:", error);
      // Lide com o erro aqui, por exemplo, mostrando uma mensagem de erro ao usuário.
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Consulta de CEP
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              
            </MDTypography>{" "}
            Insira o CEP a ser consultado no campo abaixo
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <MDInput type="text" label="CEP" fullWidth value={cep} onChange={(e) => setCep(e.target.value)} />
      </MDBox>
      <MDBox p={2}>
        <MDButton variant="gradient" color="info" onClick={consultarCep}>
          Consultar
        </MDButton>
      </MDBox>
      {endereco && (
        <MDBox p={2}>
          <MDTypography variant="body1">
            Endereço: {endereco}
          </MDTypography>
          <MDTypography variant="body1">
            Bairro: {bairro}
          </MDTypography>
          <MDTypography variant="body1">
            Cidade: {cidade}
          </MDTypography>
          <MDTypography variant="body1">
            UF: {uf}
          </MDTypography>
        </MDBox>
      )}
    </Card>
  );
}

export default OrdersOverview;
