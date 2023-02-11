// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type User from '../../../../types/user';

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const featured_teacher = {
        id: 1,
        name: "Mr. Smith",
        email: "a@gmai.com",
        image: "http://placehold.it/100x100"
    };
    res.status(200).json({
        id: 1,
        name: "John Doe",
        email: "arjun@g.coppellisd.com",
        image: "https://i.pravatar.cc/300",
        is_teacher: false,
        courses: [
            {
                id: 1,
                name: "CS III",
                join_code: "32323",
                school: {
                    id: 1,
                    name: "CISD"
                },
                featured_teacher,
                assignments: [
                    {
                        id: 1,
                        name: "Assignment 1",
                        due_date: "2021-09-01",
                        completed: false,
                        description: "Abc",
                        is_published: true,
                        unit_id: 1
                    },
                    {
                        id: 2,
                        name: "Assignment 2",
                        due_date: "2021-09-02",
                        completed: false,
                        description: "XYz",
                        is_published: true,
                        unit_id: 1
                    }
                ],
                units: []
            },
            {
                id: 2,
                name: "CS IV",
                join_code: "Hai World",
                assignments: [],
                featured_teacher,
                school: {
                    id: 1,
                    name: "Coppell High School"
                }
            },
            {
                id: 3,
                name: "AP CS A",
                join_code: "1234",
                assignments: [],
                featured_teacher,
                school: {
                    id: 1,
                    name: "Coppell High School"
                }
            }
        ],
        school: {
            id: 1,
            name: "Coppell High School",
        },
        projects: [
            {
                id: 1,
                assignment_id: 0
            },
            {
                id: 2,
                assignment_id: 2
            },
            {
                id: 3,
                assignment_id: 0
            }
        ]
    });
}
