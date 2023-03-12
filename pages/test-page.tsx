import { CreateCompanyLicenseForm } from "@/src/gratie_solana_contract/gratie_solana_company";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function file2Buffer(file: any) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader()
    const readFile = function (event: any) {
      const buffer = reader.result
      resolve(buffer)
    }

    reader.addEventListener('load', readFile)
    reader.readAsArrayBuffer(file)
  })
}

const testPage = () => {
  const [selectedImage, setSelectedImage] = useState(null as null | File);

  const uploadImage = async () => {
    const buffer: any = await file2Buffer(selectedImage);
    const base64Image = Buffer.from(buffer).toString('base64');
    const resp = await axios.post('/api/upload-file', { data: base64Image, contentType: selectedImage!.type });
    return resp.data.url;
  };

  const uploadCompanyLicense = async (companyLicense: CreateCompanyLicenseForm, imageUrl: string) => {
    const data =
    {
      "name": companyLicense.name,
      "symbol": "GRATIE",
      "description": companyLicense.email,
      "seller_fee_basis_points": 5,
      "external_url": "",
      "edition": "",
      "background_color": "000000",
      "image": imageUrl
    }

    const jsonData = JSON.stringify(data);

    const dataBase64 = Buffer.from(jsonData).toString('base64');

    const resp = await axios.post('/api/upload-file', { data: dataBase64, contentType: 'application/json' });

    companyLicense.jsonMetadataUrl = resp.data.url;
    return companyLicense;

  };

  const upload = async () => {
    if (!selectedImage) {
      return
    }

    // upload the image
    const imageUrl = await uploadImage();

    const companyLicenseForm: CreateCompanyLicenseForm = {
      name: "Test Company",
      email: "",
      tierID: 1,
      evaluation: 1000,
      // will be added in the upload function
      jsonMetadataUrl: "",
    };

    const company = await uploadCompanyLicense(companyLicenseForm, imageUrl);
    console.log(company);
  };

  return (
    <div>
      <h1>Test Page</h1>
      <input type="file" name="Image" accept="image/png, image/jpeg" onChange={(event) => {
        if (event.target.files) {
          setSelectedImage(event.target.files[0])
        }
      }} />
      <Button variant="contained" color="primary" onClick={upload}>Upload</Button>
    </div>
  );
};

export default testPage;