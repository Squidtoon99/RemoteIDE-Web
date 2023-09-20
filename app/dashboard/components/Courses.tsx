import { Lexend } from "@next/font/google";
import Link from "next/link";
import { getUser } from ".";

const title = Lexend({
    weight: "600",
    style: "normal",
    subsets: ["latin"],
});

const getClasses = async () => {
    return getUser().then(u => (u.courses || []).slice(0, 3));
};

const Classes = async () => {
    const colors = ['bg-accent-first', 'bg-accent-second', 'bg-accent-third'];
    const classes: any[] = await getClasses();
    return <div className="max-w-xs h-56 flex flex-col gap-4 mt-8">
        {classes.map((c: any, i: number) => {
            return <Link key={i} href={`dashboard/courses/${c.id}`}>
                <div className={`flex text-primary flex-row ${colors[i]} rounded-2xl p-3 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all ease-in-out duration-500`} key={c.id}>
                    <div className="flex flex-col flex-grow">
                        <h3 style={title.style} className="text-base font-bold flex-grow">{c.name}</h3>
                        <p className="font-base text-sm"><strong>81</strong> Assignments</p>
                    </div>
                    <div className="h-8 w-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                        </svg>
                    </div>
                </div>
            </Link>;
        })}
    </div>;
};

export default Classes;