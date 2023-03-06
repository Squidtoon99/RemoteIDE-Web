"use client";
import {Questrial} from "@next/font/google";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

const title = Questrial({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
});

const Calendar = () => {
    const [sec, setSec] = useState(5);
    const {push} = useRouter();

    useEffect(() => {
        if (sec === 1) {
            push("/dashboard");
            return;
        }
        const id = setTimeout(() => setSec(sec - 1), 1000);
        return () => clearTimeout(id);
    }, [sec]);
    return <div className="flex flex-col">
        <div className="flex flex-row my-2">
            <div className="flex flex-col w-1/2">
                <h1 className="text-4xl font-extrabold" style={title.style}>Calendar is not ready yet</h1>
            </div>
            <div className="flex flex-col w-1/2">
                <input type="text" placeholder="Search" className="bg-light rounded-md max-w-lg p-2 min-w-fit w-1/4"/>
            </div>
        </div>
        <div className="flex flex-col gap-3">
            <div className="flex flex-col bg-light rounded-md p-4">
                <div className="flex flex-row">
                    <div className="flex flex-col w-1/2">
                        <h1 className="text-2xl font-extrabold text-primary">Sending you back to the dashboard... [{sec}]</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

// noinspection JSUnusedGlobalSymbols
export default Calendar;