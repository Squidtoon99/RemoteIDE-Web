import {Questrial} from "@next/font/google";
import {Analytics, Calendar, Classes, getUser, Tasks} from './components';
import Teacher from "./components/Teacher";
import JoinClassPage from "@dash/components/JoinClassPage";
// E-Learning Dashboard Home Page

const title = Questrial({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
});
// Make a grid of the following components: Classes, Calendar, Teacher, Tasks, Analytics
// Classes, Calendar, and Teacher should be in a row and Tasks and Analytics should be in a row
// Classes and Calendar should take up 2/3 of the row and Teacher should take up 1/3 of the row
// Tasks and Analytics should take up 1/2 of the row each
const Dashboard = async () => {
    const user = await getUser();

    if (user === null) {
        return <div>Redirecting...</div>
    }

    let topSplit: string;

    if (user.is_teacher) {
        topSplit = "w-1/2";
    } else {
        topSplit = "w-1/3";
    }

    if (user.courses.length === 0) {
        return <JoinClassPage/>
    } else {
        console.log("courses: ", user.courses);
    }

    return (
        <>
            <div className="flex flex-row">
                <div className="flex flex-col w-1/2">
                    <h1 className="text-4xl font-extrabold" style={title.style}>My Classes</h1>
                </div>
                <div className="flex flex-col w-1/2">
                    <input type="text" placeholder="Search" className="bg-light rounded-md max-w-lg p-2 min-w-fit w-1/4" />
                </div>
            </div>
            <div className="flex flex-row">
                <div className={topSplit} style={title.style}>
                    {/* @ts-expect-error Server Component */}
                    <Classes />
                </div>
                <div className={topSplit}>
                    <Calendar />
                </div>
                {!user.is_teacher && <div className="1/4">
                    {/* @ts-expect-error Server Component */}
                    <Teacher/>
                </div>}
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col w-1/2">
                    <Tasks />
                </div>
                <div className="flex flex-col w-1/2">
                    <Analytics />
                </div>
            </div>
        </>
    );
};

export default Dashboard;