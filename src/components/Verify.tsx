import React from 'react'
import axios, { AxiosError } from "axios"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Link, useNavigate, } from "react-router-dom"
import { ResponseType } from "../types/response"
import { useToast } from "./ui/use-toast"
import {useParams} from "react-router-dom"


const formSchema = z.object({
  username: z.string(),
  code: z.string(),   
})
export const Verify = () => {

  const { toast } = useToast()
  const navigate = useNavigate()
  const {username} = useParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username ?? "",
      code: "",
    },
  })


  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    console.log(data.username);

    
    try {
        const res = await axios.put(import.meta.env.VITE_BE_API + "/verify", null, {
      params: {
        username: username, 
        code: data.code,
      },
      withCredentials: true,
    });
      const response: ResponseType = res.data
      console.log(response);

      if (!response.success || !response) {
        toast({
          title: response.message,
          description: response.error,
        })
      } else {
        toast({
          title: response.message,
        })
        navigate("/login")
      }
    } catch (error) {

      console.log(error.message);
      if (error instanceof AxiosError) {
        toast({
          title: 'Error',
          description: error.response?.data?.message || error.message,
        });
        console.error('Axios error:', error);
      } else {
        console.log("here");

        toast({
          title: 'Error',
          description: 'An unexpected error occurred',
        });
        console.error('Unexpected error:', error);
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Welcome Back to AMA</h1>
          <p className="mb-4">Join SilentNotes</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
            )}
          />
         <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                  <Input type="verification code" {...field} />
                  <FormMessage />
                </FormItem>
            )}
          />
            <Button className='w-full' type="submit">Verify</Button>
          </form>
        </Form>
      </div>
      </div>
  )
}
