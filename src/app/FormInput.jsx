"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import setosa from './download.webp'
import virginica from './virginica.jpeg'
import versicolor from './Versicolor.jpeg'





function FormInput() {


    let data;
    const [img, setimg] = useState()
    const [first, setfirst] = useState(false)
    const [sepal_length, setsepal_length] = useState("")
    const [petal_length, setpetal_length] = useState("")
    const [sepal_width, setsepal_width] = useState("")
    const [petal_width, setpetal_width] = useState("")
    const [sp, setsp] = useState("")




    const handleSubmit = async () => {
        let reqdata = {
            slength: sepal_length,
            swidth: sepal_width,
            plength: petal_length,
            pwidth: petal_width,
        }
        let res = await fetch(`http://localhost:5000/getresult`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqdata),
        })
        let resdata = await res.json();
        let Species=resdata?.species;
        
        if(resdata){
            setsp(Species)
           
            if(Species==='Iris-setosa')
            {
                setimg(setosa)
            }
            else if(Species=='Iris-versicolor')
            {
                setimg(versicolor)
            }
            else
            {
                setimg(virginica)
            }
            setfirst(true);
            
        }
        
    }



    return (
        <div>
            <div className="p-10">
                <h1 className="mb-8 font-extrabold text-4xl text-fuchsia-900">IRIS CLASSIFICATION</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <form>
                        <div>
                            <label className="block font-semibold" htmlFor="name">
                                Sepal Length
                            </label>
                            <input
                                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 "
                                id="name"
                                type="text"
                                name="name"
                                onChange={(e) => setsepal_length(e.target.value)}
                                required="required"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block font-semibold" htmlFor="email">
                                Sepal Width
                            </label>
                            <input
                                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                                id="email"
                                type="text"
                                name="email"
                                onChange={(e) => setsepal_width(e.target.value)}
                                required="required"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block font-semibold" htmlFor="password">
                                Petal Length
                            </label>
                            <input
                                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 "
                                id="password"
                                type="text"
                                name="password"
                                required="required"
                                onChange={(e) => setpetal_length(e.target.value)}
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block font-semibold" htmlFor="password">
                                Petal Width
                            </label>
                            <input
                                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 "
                                id="password"
                                type="text"
                                name="password"
                                required="required"
                                onChange={(e) => setpetal_width(e.target.value)}
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="flex items-center justify-between mt-8">
                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-800 hover:bg-fuchsia-900 md:py-4 md:text-lg md:px-10"
                            >
                                Predict
                            </button>

                        </div>
                    </form>
                    <aside className="mt-6">
                        <p className='text-xl font-bold'>Predicted Result</p>
                        {first && <div className="bg-gray-100 p-8 rounded flex flex-row-reverse justify-around  items-center">
                            <h1 className='font-bold'>Species Name : <span className='text-violet-600 capitalize italic'>{sp}</span> </h1>
                            <Image src={img} width={200} height={500} alt='image' className='rounded' />
                        </div>}
                        {
                        !first && <><p>Enter Species Info And Click Predict</p></>
                        }
                    </aside>
                </div>
            </div>

        </div>
    )
}

export default FormInput