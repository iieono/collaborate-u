"use client";

import { createUser } from "@/lib/appwrite/appwriteService";
import { ID } from "appwrite";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterScreen = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
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

  const handleNextStep = async () => {
    if (!validateEmail(email)) {
      setError("Noto‘g‘ri elektron pochta manzili.");
      return;
    }
    if (!isChecked) {
      setError("Davom etish uchun maxfiylik siyosatiga rozilik bildiring.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleRegister = async () => {
    try {
      const hashedPassword = await hashPassword(password);
      const session = await createUser({
        id: ID.unique(),
        email,
        full_name: fullName,
        username,
        password_hash: hashedPassword,
      });
      console.log(session);
      alert("Foydalanuvchi muvaffaqiyatli yaratildi!");
      router.push("/posts");
    } catch (error) {
      console.log(error);
      alert(error);
      setError("Ro‘yxatdan o‘tishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-light p-6">
      {step === 1 ? (
        <>
          <h1 className="text-3xl text-center jetbrains font-bold text-secondary-dark">
            Tanish. Ilhomlan. Yuksal.
          </h1>
          <p className="text-center text-sm jetbrains text-secondary-dark mt-2">
            Bu platforma sizga bilimlarni almashish va o‘sish imkoniyatini
            beradi.
          </p>
          <input
            className="border outline-none bg-bg-secondary text-secondary-dark placeholder-secondary-dark p-3 w-full rounded-lg mt-5"
            type="email"
            placeholder="Elektron pochta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-primary-dark text-secondary-light p-4 rounded-lg mt-4 w-full"
            onClick={handleNextStep}
          >
            A’zo bo‘lish
          </button>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <div className="w-full py-4 px-1 flex items-start gap-2">
            <input
              id="laws"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-[2px] accent-secondary-dark"
            />
            <label htmlFor="laws" className="text-xs">
              Foydalanishni davom ettirish orqali siz Maxfiylik siyosatimizga
              rozilik bildirasiz.
            </label>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl text-center font-bold text-secondary-dark">
            Profilingizni yaratish
          </h1>
          <p className="text-center text-sm jetbrains text-secondary-dark mt-2">
            Ma’lumotlaringiz platformada sizga yaxshiroq xizmat ko‘rsatish uchun
            kerak.
          </p>
          <input
            className="border outline-none bg-bg-secondary text-secondary-dark placeholder-secondary-dark p-3 w-full rounded-lg mt-5"
            type="text"
            placeholder="To‘liq ism"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className="border outline-none bg-bg-secondary text-secondary-dark placeholder-secondary-dark p-3 w-full rounded-lg mt-5"
            type="text"
            placeholder="Taxallus"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            onClick={handleRegister}
          >
            A’zo bo‘lish
          </button>
        </>
      )}
      <Link
        href="/login"
        className="absolute w-full bottom-10 flex items-center text-secondary-light underline underline-offset-4 justify-center"
      >
        Kirish
      </Link>
    </div>
  );
};

export default RegisterScreen;
