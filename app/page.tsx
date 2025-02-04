// pages/welcome.js
"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    // Split the text into individual letters for letter-by-letter animation
    const letters = document.querySelectorAll(".welcome-text span");

    // GSAP animation for each letter with a staggered effect
    gsap.from(letters, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      stagger: 0.1, // Adds a delay between each letter's animation
      ease: "power2.out",
    });

    // Redirect after 3 seconds to the register page
    setTimeout(() => {
      router.push("/register");
    }, 3000);
  }, [router]);

  // Function to split text into spans
  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="letter">
        {char}
      </span>
    ));
  };

  return (
    <div className="flex justify-center items-center h-screen  text-text-primary">
      <h1 className="welcome-text text-5xl uppercase font-bold text-accent-green">
        {splitText("Welcome")}
      </h1>
    </div>
  );
}
