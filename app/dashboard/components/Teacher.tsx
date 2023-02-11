import { getUser } from ".";

const Teacher = async () => {
    const user = await getUser();
    console.log(user);
    const teacher = (user.courses[0] || [])?.featured_teacher;
    return (
        <div className="flex flex-col p-6 bg-light text-center rounded-3xl">
            <img src={teacher.image} alt={teacher.name} className="w-24 h-24 rounded-3xl mx-auto" />
            <h3 className="text-xl font-extrabold mx-4 my-2">{teacher.name}</h3>
            <p className="text-base mx-4 my-2">{(user.courses[0]?.name || "featured ")} teacher</p>
            <a className="bg-primary text-white px-4 py-2 rounded-md" href={`mailto:${teacher.email}`}>Contact</a>
        </div>
    );
};

export default Teacher;