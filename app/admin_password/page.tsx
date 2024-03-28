"use client";
// pages/index.js

import { ChangeEvent, FormEvent, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  InputGroup,
} from "react-bootstrap";

export default function Home() {
  const [password, setPassword] = useState<string>("");
  const [res, setRes] = useState<string>("");
  const [isloading, setIsloading] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsloading(true);
    try {
	setRes("")
      //const formData = new FormData();
	
      //formData.append("password", password);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://sam.manutech-halabtech.com:3030/setpassword");
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.status === 200) {
          setIsloading(false);
          console.log("200 OK", xhr.responseText);
          setRes(JSON.parse(xhr.responseText).message);
        } else {
          console.log("ERROR ", xhr.responseText);
          setRes(JSON.parse(xhr.responseText).error);
          setIsloading(false);
        }
      };

      xhr.send(JSON.stringify({"password":password}));
    } catch (error) {
      setIsloading(false);
      console.log("ERROR ", error);
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <Card className="px-1 py-2 w-[300px] shadow-md">
        <CardHeader className="bg-white">
          <p className="font-normal text-center ">CONFIGURE SITE PSASSWORD</p>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="flex flex-col">
              <label>Password</label>
              <input
                required
                type="password"
                placeholder="Enter a password"
                className="px-2 py-1 rounded-md mt-2 border border-neutral-500 focus:border-blue-200 focus:border"
                value={password}
                onChange={handlePasswordChange}
              ></input>
            </InputGroup>
            {res}
            {!isloading ? (
              <Button type="submit" className="mt-3 bg-blue-600 w-full">
                SET PASSWORD
              </Button>
            ) : (
              <Button
                type="submit"
                disabled
                className="mt-3 bg-blue-400 w-full"
              >
                SETTING PASSWORD
              </Button>
            )}
          </Form>
        </CardBody>
      </Card>
    </main>
  );
}
