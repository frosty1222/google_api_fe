import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useDrivePicker from 'react-google-drive-picker'
import axios from "axios";
const Container = styled.div`
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: #000;
    text-align: center;
    margin-bottom: 20px;
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

function App() {
  const [openPicker, authResponse] = useDrivePicker();
  const [fileId,setFileId]= useState();
  const [nameFile,setNameFile]= useState();
  const TOKEN = "ya29.a0AXooCgtgsjuEbcJ0wxkHQcnL8TapuCmU2ELLlVuoUljL4kTCrvN4mSqz9b0BqWqC-s8V_ubFcq2GlmuKdoylOxIypnSgxsKdXTHjv-1zYbTfBf3UynLhfAF39LwYe7in1vDwK5COazOFWYoZSRDMdQVI43at0ZNYd7zaaCgYKAU8SARISFQHGX2MiyYDwsSdVI4XRnE0HyZ0Z-w0171";
  const CLIENT_ID = "643052924731-0rijpm91f3hvsi84plmlm4hmlmbt2n27.apps.googleusercontent.com";
  const DEVELOPER_KEY = "AIzaSyDVMIS-2mPOe20R5hF7j9qOlSOyl5RIaD8";
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: CLIENT_ID,
      developerKey: DEVELOPER_KEY,
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        if(data && Array(data.docs)){
            data?.docs?.map((e)=>{
              if(e.id){
                setFileId(e.id)
                setNameFile(e.name)
              }
            })
        }
      },
    })
  }
  const sharePickedFile=async(fileId)=>{
    const response = await axios.post(`http://localhost:3002/api/google-service-picker-api/share-picked-file/${fileId}`);
    if(response.success === true){
      alert("shared successfully")
    }
  }
  return (
    <Container>
      <button onClick={() => handleOpenPicker()}>Open Picker</button>
      {fileId ? (
           <button onClick={() => sharePickedFile(fileId)}>share {nameFile}</button>
      ):(<></>)}
    </Container>
  );
}

export default App;
