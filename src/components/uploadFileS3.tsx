import { Akord } from '@akord/akord-js'
import type { NextPage } from 'next'
import Button from '@mui/material/Button';
import Head from 'next/head'
import { useState } from 'react'
import axios from "axios";


interface Values {
  email: string;
  password: string;
}

const Upload = (props:any) => {

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
    const selectedImage = files[0]
    const buffer: any = await file2Buffer(selectedImage);
    const base64Image = Buffer.from(buffer).toString('base64');
    const resp = await axios.post('/api/upload-file', { data: base64Image, contentType: selectedImage!.type });
    props.updateImage(resp.data.url)
    return resp.data.url;
  };

  return (
    <div style={{flexGrow: 1}}>
        <Button
            variant="contained"
            component="label"
            >
            Upload File
            <input onChange={(e) => uploadImage(e.target.files)}
                type="file"
                hidden
            />
        </Button>
    </div>
    )
  
}

export default Upload


// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

// import { Akord } from "@akord/akord-js";
// import fs from "fs";
// import { NodeJs } from "@akord/akord-js/lib/types/file";

// import uploadFunction from './../../app/components/upload';

// // import Akord from "@akord/akord-js";


// // var file = require('file-system');
// // var fs = require('fs');

// export default function UploadFile() {
//   const handleUploadFile = async(event:any) => {
//     // const fs = require('fs');
//     // console.log("Upload", uploadFunction.file)
//     const filePath = event.target.files[0]
//     // const fileData = await fs.readFile(filePath);
//     console.log(filePath);
//     if(typeof window === 'undefined'){
//         return;
//     }
//     else {
//         const { akord, wallet, jwtToken } = await Akord.auth.signIn('selvaraj.ror@gmail.com', 'hBVp8i3KxtPM6zb');
//         console.log("wallet",wallet);
//         console.log("wallet",jwtToken);
//         // const Akord = require("@akord/akord-js");
//     }


//     const { akord, wallet, jwtToken } = await Akord.auth.signIn('selvaraj.ror@gmail.com', 'hBVp8i3KxtPM6zb');

//     const { vaultId } = await akord.vault.create("From React App");


//     console.log("vaultId", akord);

//      let file = NodeJs.File.fromPath(filePath);

//     const fs = require('fs/promises'); // LOOK HERE

//     // fs.appendFile('mynewfile1.txt', 'Hello content!', function (err:any) {
//     //     if (err) throw err;
//     //     console.log('Saved!');
//     //   });

//     // // const filePath = event.target.files[0]
//     // // const fileData = await fs.readFile(filePath);
//     // // console.log(fileData);
//     // // const file = fileData

//     // const { vaultId } = await akord.vault.create("From React App");

//     // const { stackId } = await akord.stack.create(vaultId, file, "my first file stack");

//     // const { data: fileBuffer, name: fileName } = await akord.stack.getVersion(stackId);
//   }
  

//   return (
//     <div style={{flexGrow: 1}}>
//         <Button
//             variant="contained"
//             component="label"
//             >
//             Upload File
//             <input onChange={handleUploadFile}
//                 type="file"
//                 hidden
//             />
//         </Button>
//     </div>
//     )
// }
