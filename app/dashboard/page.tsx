"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  InputGroup,
} from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Link from 'next/link'

export default function Home() {
  const [passwordProtected, setPasswordProtected] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [zipname, setZipname] = useState<string>("");
  const [isloading, setIsloading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>(""); // To store upload status
  async function handleDownload() {
    try {
      console.log(zipname);
      const response = await fetch(
        `https://sam.manutech-halabtech.com:3030/download?zipname=${zipname}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to download zip file. Server returned ${response.status} ${response.statusText}`
        );
      }

      // Get the response body as a Blob
      const blob = await response.blob();

      // Create a temporary anchor element
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.setAttribute("download", "@techielove.zip");

      // Append the anchor to the body and trigger the click event
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Clean up - remove the anchor element
      document.body.removeChild(downloadLink);
      setUploadStatus("");

      // Return the response if needed
      return response;
    } catch (error) {
      console.error("Error downloading zip file:", error);
      throw error;
    }
  }

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploadStatus("");
    setIsloading(true);
    const fileInput = document.getElementById("formFile") as HTMLInputElement;
    const file = fileInput.files![0];
    const formData = new FormData();
    formData.append("file", file);

    formData.append("password", password);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sam.manutech-halabtech.com:3030/upload");

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress); // Update progress state
      }
    });

    xhr.onload = () => {
      if (xhr.status === 200) {
        setIsloading(false);
        setUploadStatus(JSON.parse(xhr.responseText).message);
        setZipname(JSON.parse(xhr.responseText).zipname);
        //console.log("200 res...",JSON.parse(xhr.responseText).zipname);
      } else {
        setIsloading(false);
        setUploadStatus("No live Cookies");
        //console.log("other res...",xhr.responseText);
      }
      // Reset upload progress after upload completion
      setUploadProgress(0);
    };

    xhr.send(formData);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <Card className="px-4 py-2 w-[320px] shadow-md">
        <CardHeader className="bg-white">
          <p className="font-normal text-center ">CHECK NETFLIX COOKIES</p>
        </CardHeader>
        <CardBody className="text-md font-normal ">
          <Form onSubmit={handleUpload}>
            <InputGroup className="flex flex-col my-3">
              <label>Upload .zip or .rar</label>
              <input
                className="my-3 w-full text-ellipsis text-sm"
                accept=".zip,.rar"
                type="file"
                id="formFile"
                required
              ></input>
            </InputGroup>
            <InputGroup className="flex flex-col my-3">
              <Form.Check
                type="switch"
                label="Password protected"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPasswordProtected(e.target.checked)
                }
              />
            </InputGroup>
            {passwordProtected && (
              <InputGroup className="flex flex-col">
                <input
                  type="password"
                  placeholder="Encryption password"
                  className="px-2 py-1 rounded-md mt-2 border border-neutral-500 focus:border-blue-200 focus:border"
                  value={password}
                  onChange={handlePasswordChange}
                ></input>
              </InputGroup>
            )}
            {isloading ? (
              <Button
                type="submit"
                disabled
                className="my-2 bg-blue-600 w-full"
              >
                CHECKING
              </Button>
            ) : (
              <Button type="submit" className="my-2 bg-blue-600 w-full">
                UPLOAD
              </Button>
            )}

            {/* Conditionally render progress bar */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-3 w-full">
                <ProgressBar
                  animated
                  now={uploadProgress}
                  label={`${uploadProgress.toFixed(0)}%`}
                />
              </div>
            )}
            {/* Show upload status */}
            {uploadStatus &&
              (uploadStatus === "Download Live Cookies" ? (
                <p
                  className="text-blue-700 text-center cursor-pointer"
                  onClick={handleDownload}
                >
                  Download Live Cookies
                </p>
              ) : (
                <p className="text-red-500 text-center">No Live Cookies</p>
              ))}
          </Form>
          <CardFooter className="text-center bg-white mt-6">
            <p className="text-sm pt-2">
              Made ❤️ with by <Link className="text-blue-400 hover:font-bold" href="https://t.me/Underwater5885">Flixchecker</Link>
              <br></br>
              <span className="text-[10px] mx-2 text-gray-400">
                Copyright © 2024
              </span>
            </p>
          </CardFooter>
        </CardBody>
      </Card>
    </main>
  );
}
