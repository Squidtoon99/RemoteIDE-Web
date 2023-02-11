import {getAssignment, getCourse, getUser} from "@dash/components";
import {Questrial} from "@next/font/google";

const title = Questrial({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
});

const Assignment = async ({params: {id, assignment_id}}: { params: {id: number; assignment_id: number;} }) => {
    console.log(id, assignment_id);
    const user = await getUser();
    const course = await getCourse({id});
    const assignment = await getAssignment({assignment_id, course_id: id});
    return <div className={"flex flex-col"}>
        <div>
            <h2 className="text-3xl font-extrabold" style={title.style}>
                {assignment.name}
            </h2>
            <p className="text-base font-bold" style={title.style}>
                {course.name}
            </p>
        </div>
    </div>
};

export default Assignment;