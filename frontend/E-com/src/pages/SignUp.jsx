import { useState } from "react"
import api from '../api/axios'

export default function SignUp(){
    const [form, setForm] = useState({
        name:"",
        email:"",
        password:""
    })

    const [msg, setmsg] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/signup",form);
            console.log(response)
            setmsg(response.data.message);
            
        } catch (error) {
            setmsg(error.response?.data?.message || "An error occurred");
        }
    }


    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

                {msg && (<div className="mb-4 text-center text-sm text-blue-600 font-medium">
                    {msg}
                </div>)}

                <form onSubmit={(e)=>{handleSubmit(e)}} className="space-y-4">
                    <input
                    name="name"
                    placeholder="Enter Name"
                    value={form.name}
                    onChange={(e)=>{handleChange(e)}}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focuse:outline-none focuse:ring-2 focuse:ring-blue-500"
                    required/>
                    <input
                    name="email"
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={(e)=>{handleChange(e)}}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focuse:outline-none focuse:ring-2 focuse:ring-blue-500"
                    required/>
                    <input
                    name="password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={(e)=>{handleChange(e)}}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focuse:outline-none focuse:ring-2 focuse:ring-blue-500"
                    required/>

                    <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                        Sign Up
                    </button>
                </form>

            </div>
        </div>
    )
}