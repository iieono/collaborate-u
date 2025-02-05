"use client";

import { useState } from "react";
import Link from "next/link";
import { loginUser } from "@/lib/appwrite/appwriteService";
import { useRouter } from "next/navigation";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const hashPassword = async (password: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError("Noto‘g‘ri elektron pochta manzili.");
      return;
    }
    if (!password) {
      setError("Parolni kiriting.");
      return;
    }

    try {
      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword);
      const session = await loginUser(email, hashedPassword);
      console.log(session);
      alert("Kirish muvaffaqiyatli!");
      router.push("/posts");
    } catch (error) {
      console.log(error);
      setError("Kirishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-light p-6">
      <h1 className="text-3xl text-center jetbrains font-bold text-secondary-dark">
        Xush kelibsiz
      </h1>
      <p className="text-center text-sm jetbrains text-secondary-dark mt-2">
        {`Hisobingizga kirish uchun ma'lumotlaringizni kiriting.`}
      </p>
      <input
        className="border outline-none bg-bg-secondary text-secondary-dark placeholder-secondary-dark p-3 w-full rounded-lg mt-5"
        type="email"
        placeholder="Elektron pochta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border outline-none bg-bg-secondary text-secondary-dark placeholder-secondary-dark p-3 w-full rounded-lg mt-5"
        type="password"
        placeholder="Parol"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-primary-dark text-secondary-light p-4 rounded-lg mt-4 w-full"
        onClick={handleLogin}
      >
        Kirish
      </button>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      <Link
        href="/register"
        className="absolute w-full bottom-10 flex items-center text-secondary-light underline underline-offset-4 justify-center"
      >
        {`A'zo bo'lish`}
      </Link>
    </div>
  );
};

export default LoginScreen;
