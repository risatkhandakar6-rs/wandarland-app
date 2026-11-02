"use client";

import { authClient } from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, Separator, TextField} from "@heroui/react";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";


export default function SignUpPage() {
  
  const OnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      image: user.image,
      password: user.password
    });
    console.log(user)
    if (data) {
      redirect('/allDestinations')
    }
  }
  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
    provider: "google",
  });
  }
  

  return (
    <div className="mx-auto h-screen mt-30">
       <Form  className="flex w-96 flex-col gap-4" onSubmit={OnSubmit} >
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }

          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name="name"
        type="name"
      
      >
        <Label>Name</Label>
        <Input placeholder="Enter Your Name" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name="image"
        type=""
        
      >
        <Label>Image</Label>
        <Input placeholder="Add your image" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }

          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>

      <div className="flex gap-2">
        <Button className='w-8/12 rounded-none' type="submit">
          <Check />
          Submit
        </Button>
        <Button className='w-4/12 rounded-none' type="reset" variant="secondary">
          Reset
        </Button>
      </div>
      </Form>
      <div className="divider">Or</div>
      <button onClick={handleGoogleSignUp} className="flex items-center gap-1 btn w-full "><FcGoogle></FcGoogle> SignUp with Gooogle</button>

   </div>
  );
}