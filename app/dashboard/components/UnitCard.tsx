"use client";
import {Assignment, Course} from 'types';
import {Menu, Transition} from '@headlessui/react'
import React, {Fragment} from 'react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {formatDistance} from "date-fns";
import {useRouter} from "next/navigation";

const UnitCard = ({
                        id,
                      title,
                      course,
                      assignments,
                      teacher
                  }: { id: number; title: string; description?: string; assignments: Assignment[]; course: Course, teacher: boolean }) => {

    const router = useRouter();

    const delete_unit = async () => {
        const res = await fetch(`/api/v1/courses/${course.id}/units/${id}`, {
            method: 'DELETE'
        });
        if (res.status === 200) {
            console.log('deleted unit');
            router.refresh();
        } else {
            console.log('failed to delete unit');
        }
    }

    const edit_unit = async () => {
        const res = await fetch(`/api/v1/courses/${course.id}/units/${id}`, {
            method: 'PUT'
        });
        if (res.status === 200) {
            console.log('edited unit', res);
             router.refresh();
        } else {
            console.log('failed to edit unit', res);
        }


    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-row">
                <h2 className="text-xl font-extrabold flex-grow">{title}</h2>
                {/* Delete Button */}
                {teacher &&
                    <Menu as="div" className={"relative inline-block text-left"}>

                        <div>
                            <Menu.Button
                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                <span>Actions</span>
                                <ChevronDownIcon
                                    className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                                    aria-hidden="true"
                                />

                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className={"absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"}>
                                <div className="px-1 py-1 ">
                                    <Menu.Item>
                                        {({active}) => (
                                            <button
                                                className={`${
                                                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                onClick={edit_unit}
                                            >
                                                {active ? (
                                                    <EditActiveIcon
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <EditInactiveIcon
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Edit
                                            </button>
                                        )}
                                    </Menu.Item>

                                </div>
                                <div className="px-1 py-1">


                                    <Menu.Item>
                                        {({active}) => (
                                            <button
                                                className={`${
                                                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                onClick={delete_unit}
                                            >
                                                {active ? (
                                                    <DeleteActiveIcon
                                                        className="mr-2 h-5 w-5 text-violet-400"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <DeleteInactiveIcon
                                                        className="mr-2 h-5 w-5 text-violet-400"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Delete
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                }
            </div>
            {
                <table className="mt-1 w-full">
                    <thead>
                    <tr>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Due Date</th>
                        {!teacher &&
                            <th className="px-4 py-2">Submission</th>
                        }
                        {teacher &&
                            <th className="px-4 py-2">Manage</th>
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {assignments.map(assignment => (
                        <tr key={assignment.id} className="border-t text-center">
                            <td className="px-4 py-2">{assignment.name}</td>
                            {/* @ts-ignore */}
                            <td className="px-4 py-2" >{formatDistance(new Date(Date.parse(assignment.due_date)), new Date(), { addSuffix: true })}</td>
                            {!teacher && <td className="px-4 py-2">
                                <a className="bg-primary hover:bg-primary/75 text-white px-4 py-2 rounded-3xl"
                                   href={`/d/courses/${course.id}/proxy-svc/${assignment.id}`}>
                                    Start
                                </a>
                            </td>}
                            {teacher &&
                                <td className="px-4 py-2">
                                    <a className="bg-primary/75 text-white py-2 px-4 rounded-full ml-3"
                                       href={`/d/courses/${course.id}/assignments/${assignment.id}/edit`}>
                                        Edit
                                    </a>
                                    <a className="bg-red-500/75 text-white py-2 px-4 rounded-full ml-3"
                                       href={`/d/courses/${course.id}/assignments/${assignment.id}/delete`}>
                                        Delete
                                    </a>
                                </td>
                            }
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </div>
    );
};

function EditInactiveIcon(props: any) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}

function EditActiveIcon(props: any) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}

function DeleteInactiveIcon(props: any) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2"/>
            <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2"/>
        </svg>
    )
}

function DeleteActiveIcon(props: any) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2"/>
            <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2"/>
        </svg>
    )
}

export default UnitCard;