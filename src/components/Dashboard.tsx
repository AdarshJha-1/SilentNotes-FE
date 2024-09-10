import { useRecoilValue, useSetRecoilState } from "recoil"
import { isAcceptingMessagesState, userState } from "../store/atom"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import axios, { AxiosError } from "axios"
import { ResponseType } from "../types/response"

export const Dashboard = () => {

  const navigate = useNavigate()
  const { toast } = useToast()
  const { isLogin, user } = useRecoilValue(userState)
  const acceptMessageStatus = useRecoilValue(isAcceptingMessagesState)
  const setAcceptMessageStatus = useSetRecoilState(isAcceptingMessagesState);
  if (!isLogin) {
    navigate("/login")
  }
  const userURL = `http://localhost:5173/u/${user.username}`
  const copyToClipboard = () => {
    navigator.clipboard.writeText(userURL)
    toast({
      title: "Link Copied Successfully"
    })
  };

  
  const handelAcceptMessages = async () => {
  
    try {
      const res = await axios.put(import.meta.env.VITE_BE_API + `/accept-messages?is_accepting_messages=${!acceptMessageStatus}`, null, {
        withCredentials: true
      } )

      const response: ResponseType = res.data

      if (!response.success || !response) {
        toast({
          title: response.message,
          description: response.error,
        })
      } else {
          setAcceptMessageStatus(!acceptMessageStatus)
        toast({
          title: response.message,
        })
        navigate("/dashboard")
      }
    } catch (error) {
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
    <div className="text-white pt-10">
      <div className="w-4/6 mx-auto">
        <h1 className="text-5xl font-sans text-white font-extrabold tracking-tighter">User Dashboard</h1>
        <div className="flex flex-col pt-5">
          <Label className="text-xl font-bold pb-2">Copy Your Unique Link</Label>
          <div className="flex justify-between items-center">
            <Input type="text" className="bg-white text-black w-full font-medium rounded-r-none" value={userURL} />
            <Button onClick={copyToClipboard} className='text-black font-bold rounded-l-none' variant={"outline"}>Copy</Button>
          </div>


          <label className="inline-flex items-center cursor-pointer py-5">
            <input type="checkbox" checked={acceptMessageStatus} onChange={handelAcceptMessages} className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-white dark:text-gray-900">Accept Message: {acceptMessageStatus
              ? "on" : "off"}</span>
          </label>

        </div>
      </div>
    </div>
  )
}
