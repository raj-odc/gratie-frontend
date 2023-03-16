import { Akord } from '@akord/akord-js'
import type { NextPage } from 'next'
import Button from '@mui/material/Button';
import Head from 'next/head'
import { useState } from 'react'
import axios from "axios";
import Upload from '@mui/icons-material/Upload';
import React from 'react';
import Loading from './Loading';


interface Values {
  email: string;
  password: string;
}

const UploadFile = (props:any) => {

  const [openLoading, setOpenLoading] = React.useState(false);

  const handleLoaderToggle = (status:boolean) => {
    setOpenLoading(status)
  }

  const file2Buffer = (file: any) => {
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

  const uploadImage = async (files: FileList | null) => {
    if (!files || !files.length) {
      throw new Error('Failed uploading the file')
    };
    handleLoaderToggle(true);
    const selectedImage = files[0]
    const buffer: any = await file2Buffer(selectedImage);
    const base64Image = Buffer.from(buffer).toString('base64');
    const resp = await axios.post('/api/upload-file', { data: base64Image, contentType: selectedImage!.type });
    props.updateImage(resp.data.url)
    handleLoaderToggle(false);
    return resp.data.url;
  };

  return (
    <div style={{flexGrow: 1}}>
        <Button
            variant="contained"
            component="label"
            >
            <Upload sx={{color:'#56e456'}} />
            <input onChange={(e) => uploadImage(e.target.files)}
                type="file"
                hidden
            />
        </Button>
        <Loading open={openLoading} handleClose={handleLoaderToggle} />
    </div>
    )
  
}

export default UploadFile