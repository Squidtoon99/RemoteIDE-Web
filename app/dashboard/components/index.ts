import {Assignment, Course, User} from 'types';
import {redirect} from "next/navigation";
import {cookies} from 'next/headers';

export { default as Classes } from './Courses';
export { default as Calendar } from './Calendar';
export { default as Tasks } from './Tasks';
export { default as Analytics } from './Analytics';
export { default as Teacher } from './Teacher';

const getUser: () => Promise<User> = async () => {
    const nextCookies = cookies();
    const  cookie = nextCookies.getAll().map((a => {
        return a.name + '=' + a.value;
    })).join('; ');
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/users/@me`, {
        headers: {
            'Cookie': cookie
        }
    });

    return res.json().catch((err) => {
        console.log(err);
        redirect('/login');
    }).then((data) => {
        if (data.error) {
            redirect('/login');
        }
        return data;
    });
};

const getCourse: ({ id }: { id: number; }) => Promise<Course> = async ({ id }) => {
    const nextCookies = cookies();
    const  cookie = nextCookies.getAll().map((a => {
        return a.name + '=' + a.value;
    })).join('; ');
    console.log("fetching: ", id);
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/courses/${id}`, {
        headers: {
            'Cookie': cookie
        }
    })
    return res.json().catch((err) => {
        console.log(err);
        return null;
    });
}

const getAssignments: ({ course_id }: { course_id: number; }) => Promise<Assignment[]> = async ({ course_id }) => {
    const nextCookies = cookies();
    const  cookie = nextCookies.getAll().map((a => {
        return a.name + '=' + a.value;
    })).join('; ');
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/courses/${course_id}/assignments`, {
        headers: {
            'Cookie': cookie
        }
    });
    return res.json().catch((err) => {
        console.log(err);
        return null;
    });
}

const getAssignment: ({ course_id, assignment_id }: { course_id: number; assignment_id: number; }) => Promise<Assignment> = async ({ course_id, assignment_id }) => {
    const nextCookies = cookies();
    const  cookie = nextCookies.getAll().map((a => {
        return a.name + '=' + a.value;
    })).join('; ');
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/courses/${course_id}/assignments/${assignment_id}`, {
        headers: {
            'Cookie': cookie
        }
    });
    return res.json().catch((err) => {
        console.log(err);
        return null;
    });
}

const getProjects = async () => {
    const nextCookies = cookies();
    const  cookie = nextCookies.getAll().map((a => {
        return a.name + '=' + a.value;
    })).join('; ');
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/users/@me/projects`, {
        headers: {
            'Cookie': cookie
        }
    });
    return res.json().catch((err) => {
        console.log(err);
        return null;
    });
}
export { getUser, getCourse, getAssignments, getAssignment, getProjects };