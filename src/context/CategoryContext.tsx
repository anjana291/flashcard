"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

interface CategoryContextType {
    selectedCategory: string,
    setSelectedCategory: Dispatch<SetStateAction<string>>
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCategory, setSelectedCategory] = useState("")
    return (
        <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}