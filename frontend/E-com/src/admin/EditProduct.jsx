import { useEffect,useState } from "react";

import api from "../api/axios.js";

import { useNavigate , useParams } from "react-router";

export default function EditProduct(){
    const {id} = useParams();
    const [form,setForm] = useState({
         title : "",
        description : "",
        price : "",
        category : "",
        image: "",
        stock : ""
    });

    const navigate = useNavigate();

    const allowedField = ["title", "description" , "price" , "category" , "image" , "stock"];

    const handlechange = (e) =>  {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const loadproduct = async () =>{ 
        const res = await api.get('/product/');
        const product = res.data.find((p) => p.id === parseInt(id));
        setForm(product);
    }

    useEffect(()=>{loadproduct()},[]);

    const handlesubmit = async(e) => {
        e.preventDefault();
        await api.put(`/product/${id}`,form);
        alert("Product updated successfully");
        navigate("/admin/products");
    }

    return(
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
            <h2 className="text-2xl fot-bold mb-6 "> Edit product</h2>
            <form onSubmit={handlesubmit} className="space-y-3">
                {
                    allowedField.map((key)=>(
                        allowedField.includes(key) &&
                        <input 
                            key={key}
                            name={key}
                            value={form[key]}
                            onchange={handlechange}
                            placeholder={key}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focuse:outline-none focuse:ring-2 focuse:ring-blue-500"
                             />

                    ))
                }

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                        Add Product
                    </button>
            </form>

        </div>
    )


}

