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
import {useSetRecoilState} from "recoil"
import {userState} from "../store/atom.ts"



const formSchema = z.object({
  identifier: z.union([z.string().min(3).max(30), z.string().email()]),
  password: z.string()
})

export const Login = () => {

  const { toast } = useToast()
  const navigate = useNavigate()
  const setUserSatate = useSetRecoilState(userState);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post(import.meta.env.VITE_BE_API + "/sign-in", data, {
        withCredentials: true,
      })

      const response: ResponseType = res.data

      if (!response.success || !response) {
        toast({
          title: response.message,
          description: response.error,
        })
      } else {
        localStorage.setItem("token", response.data.token);
        setUserSatate({user: response.data.user, isLogin: true})
        toast({
          title: response.message,
        })
        navigate("/dashboard")
      }
    } catch (error) {
      setUserSatate({user: null, isLogin: false})
      if (error instanceof AxiosError) {
        toast({
          title: 'Error',
          description: error.response?.data?.message || error.message,
        });
        console.error('Axios error:', error);
      } else {
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
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            name="identifier"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
            )}
          />
            <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
            )}
          />
            <Button className='w-full' type="submit">Sign In</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
          Not a member yet?{' '}
            <Link to="/sign-up" className="text-blue-600 hover:text-blue-800">
            Sign up
          </Link>
          </p>
        </div>
      </div>
      </div>
  )
}
