// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type User from '../../../../types/user';

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<User>
) {
    res.status(200).json({
        id: 1,
        name: "John Doe",
        email: "[...]",
        image: "https://i.pravatar.cc/100",
        is_teacher: true,
        courses: [],
        school: {
            id: 1,
            name: "Coppell High School",
        },
        projects: []
    });
}