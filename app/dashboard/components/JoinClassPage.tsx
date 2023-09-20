"use client";
import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {Course} from "@types";
import useDebounce from "@dash/hooks/useDebounce";

const JoinClassPage: React.FC = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [code, setCode] = useState<string[]>(["", "", "", "", "", "", ""]);
    const dCode = useDebounce(code, 200);
    const router = useRouter();

    useEffect(() => {
        if (code.join("").length === 6) {
            const code_str = code.join("");
            console.log("Attempting to join class with code: ", code_str);
            fetch("/api/v1/courses/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: code_str
                })
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((course: Course) => {
                        toast(`Joined ${course.name}`, {
                            type: "success",
                            position: "bottom-right",
                            autoClose: 3000,
                        })
                        router.push(`/dashboard/courses/${course.id}/`);
                        

                    });
                } else {
                    console.log("Failed to join class!");
                    toast(res.statusText + `: Class code invalid`, {
                        type: "error",
                        position: "bottom-right",
                        autoClose: 3000,
                    });
                }
            }).catch((err) => {
                console.log("Failed to join class!", err);
                toast(`Class code invalid`, {
                        type: "error",
                        position: "bottom-right",
                        autoClose: 3000,
                    });
            });
        }
    }, [dCode]);

  const handleInputChange = async (index: number, e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setCode((prev) => {
        const copy = [...prev];
        copy[index] = value;
        return copy;
    });
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">You are not in a class</h1>
      <p className="text-gray-500 mb-2">Enter class code</p>
      <div className="flex justify-center">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            className="w-12 h-12 border-gray-400 border-2 rounded-lg text-center mx-2"
            type="text"
            maxLength={1}
            ref={(ref) => (inputRefs.current[index] = ref)}
            onChange={(e) => handleInputChange(index, e)}
          />
        ))}
      </div>
    </div>
  );
};

export default JoinClassPage;
