
"use client"
import { authClient } from "@/lib/auth-client";
import {Envelope} from "@gravity-ui/icons";
import { FieldError, Input, Label, ListBox, TextField, Select, TextArea, Card, Modal, Button, Surface } from '@heroui/react'

import { FaEdit } from "react-icons/fa";

export function EditModal({ destination }) {
  const {
    _id,
    country,
    imageUrl,
    destinationName,
    price ,
    rating ,
    days ,
    nights,
    category,
    duration,
    departureDate,
    description
  } = destination;
    const onSubmit = async(e)=> {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const destination = Object.fromEntries(formData.entries);
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());

      console.log(destination)
      
    const {data:tokenData}=await authClient.token()

      const response = await fetch(`http://localhost:8000/destination/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        authorization :`Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(destination)
    });
    const data =await response.json()

    console.log(data)
  }
  return (
    <Modal>
      <Button className='btn border-[#6C696D] text-black' variant="secondary"><FaEdit></FaEdit> Edit</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Contact Us</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Fill out the form below and we'll get back to you. The modal adapts automatically
                when the keyboard appears on mobile.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                  <form  onSubmit={onSubmit}
                           className="p-10 space-y-8"
                         >
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             {/* Destination Name */}
                             <div className="md:col-span-2">
                               <TextField name="destinationName" isRequired defaultValue={destinationName}>
                                 <Label>Destination Name</Label>
                                 <Input placeholder="Bali Paradise" className="rounded-2xl" />
                                 <FieldError />
                               </TextField>
                             </div>
               
                             {/* Country */}
                             <TextField name="country" isRequired defaultValue={country}>
                               <Label>Country</Label>
                               <Input placeholder="Indonesia" className="rounded-2xl" />
                               <FieldError />
                             </TextField>
               
                             {/* Category - Updated Select Component */}
                             <div>
                      <Select
                        defaultValue={category}
                                 name="category"
                                 isRequired
                                 className="w-full"
                                 placeholder="Select category"
                               >
                                 <Label>Category</Label>
                                 <Select.Trigger className="rounded-2xl">
                                   <Select.Value />
                                   <Select.Indicator />
                                 </Select.Trigger>
                                 <Select.Popover>
                                   <ListBox>
                                     <ListBox.Item id="Beach" textValue="Beach">
                                       Beach
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                     <ListBox.Item id="Mountain" textValue="Mountain">
                                       Mountain
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                     <ListBox.Item id="City" textValue="City">
                                       City
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                     <ListBox.Item id="Adventure" textValue="Adventure">
                                       Adventure
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                     <ListBox.Item id="Cultural" textValue="Cultural">
                                       Cultural
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                     <ListBox.Item id="Luxury" textValue="Luxury">
                                       Luxury
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                   </ListBox>
                                 </Select.Popover>
                               </Select>
                             </div>
               
                             {/* Price */}
                             <TextField name="price" type="number" isRequired defaultValue={price}>
                               <Label>Price (USD)</Label>
                               <Input
                                 type="number"
                                 placeholder="1299"
                                 className="rounded-2xl"
                               />
                               <FieldError />
                             </TextField>
               
                             {/* Duration */}
                             <TextField name="duration" isRequired defaultValue={duration}>
                               <Label>Duration</Label>
                               <Input
                                 placeholder="7 Days / 6 Nights"
                                 className="rounded-2xl"
                               />
                               <FieldError />
                             </TextField>
               
                             {/* Departure Date */}
                             <div className="md:col-span-2">
                               <TextField name="departureDate" type="date" isRequired defaultValue={departureDate}>
                                 <Label>Departure Date</Label>
                                 <Input type="date" className="rounded-2xl" />
                                 <FieldError />
                               </TextField>
                             </div>
               
                             {/* Image URL - Removed preview */}
                             <div className="md:col-span-2">
                               <TextField name="imageUrl" isRequired defaultValue={imageUrl}>
                                 <Label>Image URL</Label>
                                 <Input
                                   type="url"
                                   placeholder="https://example.com/bali-paradise.jpg"
                                   className="rounded-2xl"
                                 />
                                 <FieldError />
                               </TextField>
                             </div>
               
                             {/* Description */}
                             <div className="md:col-span-2">
                               <TextField name="description" isRequired defaultValue={description}>
                                 <Label>Description</Label>
                                 <TextArea
                                   placeholder="Describe the travel experience..."
                                   className="rounded-3xl"
                                 />
                                 <FieldError />
                               </TextField>
                             </div>
                           </div>
               
                           {/* Buttons */}
               
                       <button className="btn btn-outline">save</button>
                         </form>
              </Surface>
            </Modal.Body>
           
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}