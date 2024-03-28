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
import { useRouter } from "next/router";
import Link from 'next/link'

export default function Home() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsloading(true);

      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://sam.manutech-halabtech.com:3030/getpassword");
      xhr.onload = () => {
        if (xhr.status === 200) {
          setIsloading(false);
          if (password === JSON.parse(xhr.responseText).message) {
            // Navigate to the dashboard page
            window.location.href = "/dashboard";
          } else {
            setIsloading(false);

            setError("Incorrect password. Please try again.");
          }
        } else {
          setIsloading(false);
          setError(JSON.parse(xhr.responseText).error);
        }
      };

      xhr.send();
    } catch (error) {
      setIsloading(false);
      console.log("ERROR ", error);
      setError("Could not fetch password.");
    }
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError(""); // Clear error message when password is changed
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <Card className="px-1 py-2 w-[300px] shadow-md">
        <CardHeader className="bg-white">
          <p className="font-normal text-center ">PROTECTED SITE</p>
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
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {isloading ? (
              <Button
                type="submit"
                disabled
                className="mt-3 bg-blue-300 w-full"
              >
                LOGING IN ...
              </Button>
            ) : (
              <Button type="submit" className="mt-3 bg-blue-600 w-full">
                LOGIN
              </Button>
            )}
		<p className="text-center pt-3" >Get Password <Link className="text-blue-700 hover:font-bold" href="https://t.me/cookielogin">Here</Link></p>
          </Form>
        </CardBody>
      </Card>
    </main>
  );
}
