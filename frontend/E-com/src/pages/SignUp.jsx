import { useState } from "react"
import api from '../api/axios'

export default function SignUp(){
    const [form, setForm] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange = (e) => {
        
    }
    const handleSubmit = async (e) => {
        e.preventdefault();
    }


    return(
        <div>
            <h1>Sign Page</h1>
        </div>
    )
}