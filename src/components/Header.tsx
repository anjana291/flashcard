"use client"

import Image from "next/image";
import logo from "@/app/assets/7276230.png"
import AddQuestion from "./AddQuestion";
import { useContext } from "react";
import { CategoryContext } from "@/context/CategoryContext";

export default function Header() {
    const context = useContext(CategoryContext)

    if (!context) {
        throw new Error("CategoryContext must be used within a CategoryProvider")
    }

    const { setSelectedCategory } = context
    return (
        <>
            <header className="navbar px-4 py-3 w-full shadow-lg bg-white">
                <div className="container mx-auto flex flex-wrap items-center justify-between">

                    <div className="flex-shrink-0 mb-2 sm:mb-0">
                        <Image src={logo} alt="logo" height={45} width={45} />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative w-full sm:w-auto">
                            <select
                                className="input input-bordered w-full sm:w-72 focus:outline-none px-3 py-2 rounded-lg border border-gray-300 transition pr-10"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select Category
                                </option>
                                <option value="HTML">HTML</option>
                                <option value="CSS">CSS</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="React.js">React.js</option>
                                <option value="Node.js">Node.js</option>
                                <option value="Angular">Angular</option>
                                <option value="Vue.js">Vue.js</option>
                                <option value="Express.js">Express.js</option>
                                <option value="MongoDB">MongoDB</option>
                            </select>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5 text-gray-600"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>

                        <AddQuestion />
                    </div>
                </div>
            </header>
        </>
    )
}