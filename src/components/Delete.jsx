"use client";

import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";
import { FaTrash } from "react-icons/fa6";


export function Delete({ destination }) {
  const { destinationName,_id } = destination;
  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();
     const res = await fetch(`http://localhost:8000/destination/${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      authorization:`Bearer ${tokenData?.token}`
       },
    
  

    
     })
    const data = await res.json();
    redirect('/allDestinations')
    console.log(data)
 }
  return (
    <AlertDialog>
      <Button className="btn border-red-500 text-red-500" variant="danger"><FaTrash></FaTrash> Cancel</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}