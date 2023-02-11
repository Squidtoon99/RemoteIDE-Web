import UnitCard from "app/dashboard/components/UnitCard";
import {Course} from "types";
import {getAssignments, getCourse, getUser} from "../../components";
import {Questrial} from "@next/font/google";
import {TeacherCard} from "../../components/TeacherCard";

const title = Questrial({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
});

const Page = async ({params: {id}}: { params: { id: number; }; }) => {
    const user = await getUser();
    if (user === null) {
        return <div>Not logged in</div>;
    }
    const course: Course = await getCourse({id});
    const assignments = await getAssignments({course_id: id});
    // categorize assignments by unit
    course.units = course.units || [];
    const units = course.units.map(unit => {
        const unitAssignments = assignments.filter(assignment => assignment.unit_id === unit.id);
        return <UnitCard id={unit.id} title={unit.name} description={unit.description} course={course} assignments={unitAssignments}
                         teacher={user.is_teacher} key={unit.name}/>;
    });

    // const me: User = await getUser();
    // const teacher = course.featured_teacher;

    return <div className="flex flex-col">
        <div className="flex flex-row my-2">
            <div className="flex flex-col w-1/2">
                <h1 className="text-4xl font-extrabold" style={title.style}>{course.name}</h1>
            </div>
            <div className="flex flex-col w-1/2">
                <input type="text" placeholder="Search" className="bg-light rounded-md max-w-lg p-2 min-w-fit w-1/4"/>
            </div>
        </div>

        {user.is_teacher && <div className="flex flex-col w-1/2">
            <TeacherCard course_id={id}/>
        </div>}
        <div className="flex flex-col gap-3">
            {units}
        </div>
    </div>;
}

export const dynamic = 'force-dynamic';

export default Page;