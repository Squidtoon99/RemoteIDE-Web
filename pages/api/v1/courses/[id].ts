// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Course } from 'types';

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<any>
) {
    res.status(200).json({
        id: 1,
        name: "AP CSA",
        join_code: "Hello World",
        assignments: [],
        school: {
            id: 1,
            name: "Coppell High SChool"
        },
        featured_teacher: {
            id: 1,
            name: "Mr. Smith",
            email: "msmigth@gmail.com",
            image: "http://placehold.it/100x100"
        }
    });
}