"use client"
import FlashCard from "@/components/Flashcard";
import Header from "@/components/Header";
import Welcome from "@/components/Welcome";
import { CategoryContext } from "@/context/CategoryContext";
import { useContext } from "react";

export default function Home() {
  const context = useContext(CategoryContext)

  if (!context) {
    throw new Error("CategoryContext must be used within a CategoryProvider")
  }

  const { selectedCategory } = context

  return (
    <>
      <Header />
      {
        selectedCategory ?
          <FlashCard selectedCategory={selectedCategory}/>
          :
          <Welcome />
      }
    </>
  );
}
