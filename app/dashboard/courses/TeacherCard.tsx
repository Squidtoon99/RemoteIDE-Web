"use client";
import {AnalyticsIcon, PolygonIcon, TriangleIcon} from "../icons";
import {Popover, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {FormEvent, Fragment, useState} from "react";
import Image from "next/image";
import {Roboto} from "@next/font/google";

import {useRouter} from 'next/navigation';
import CreateUnitModal from "@dash/courses/modals/CreateUnitModal";
import CreateAssignmentModal from "@dash/courses/modals/CreateAssignmentModal";
import {Course} from "@types";
import {toast} from "react-toastify";
import {AssignmentDataType, CreateDataType, UnitDataType} from "@dash/courses/types";

type DialogType = "" | "unit" | "assignment" | "notebook";

const title = Roboto({
    weight: "700",
    subsets: ["latin"],
})

const create_options: ({ name: string; icon: any; description: string; modal: DialogType })[] = [
    {
        name: "Unit",
        description: "Create a new unit",
        modal: "unit",
        icon: PolygonIcon
    },
    {
        name: "Assignment",
        description: "Create a new assignment",
        modal: "assignment",
        icon: TriangleIcon
    },
    {
        name: "Live Notebook",
        description: "Interactive coding documents",
        modal: "notebook",
        icon: AnalyticsIcon
    }
]

export function TeacherCard({course}: { course: Course }) {
    let [dialog, setDialog] = useState<DialogType>("");

    const router = useRouter();

    const closeModal = () => {
        setDialog("");
        router.refresh();
    }

    const openModal = (type: DialogType) => {
        return () => {
            setDialog(type);
        };
    }

    const create = (type: DialogType) => {
        return (e: FormEvent, data: CreateDataType) => {
            e.preventDefault();
            if (type === "unit") {
                data = data as UnitDataType;
                if (!data?.unit_name) {
                    return;
                }

                fetch(`/api/v1/courses/${course.id}/units`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.unit_name
                    })
                }).then(res => {
                    if (res.status === 200) {
                        // success
                        closeModal();
                        toast("Unit created", {
                            type: "success",
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                        })
                    } else {
                        // error
                        console.error(res);
                    }
                });
            } else if (type === "assignment") {
                data = data as AssignmentDataType;
                if (!data?.name || !data?.template || !data?.unit || !data?.due_date) {
                    return;
                }
                console.log(data.due_date.toString());
                fetch(`/api/v1/courses/${course.id}/assignments`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        description: data.description,
                        template: data.template,
                        unit_id: data.unit.id,
                        due_date: data.due_date.toString()
                    })
                }).then(res => {
                    if (res.status === 200) {
                        // success
                        closeModal();
                    } else {
                        // error
                        console.error(res);
                        let msg: string;

                        // create a toast of the error content using react-toastify
                        res.json().then((data) => {
                                if (data?.message) {
                                    msg = data.message;
                                }
                            }
                        ).catch(() => {
                            msg = "An unknown error occurred";
                        }).finally(() => {
                                toast(msg, {
                                    type: "error",
                                    position: "bottom-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                });

                            }
                        );

                    }
                });
            }
        }
    }
    return <>
        <div className="flex-row gap-2 max-w-sm px-4 w-full">
            <Popover className="relative">
                {({open}) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-3xl bg-primary px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition ease-in-out duration-150`}
                        >
                            <span style={title.style}>Create</span>
                            <ChevronDownIcon
                                className={`${open ? '' : 'text-opacity-70 rotate-90'}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                                aria-hidden="true"
                            />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid gap-8 bg-white p-7">
                                        {create_options.map((item) => (
                                            <a
                                                key={item.name}
                                                onClick={openModal(item.modal)}
                                                className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-primary/25 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 hover:cursor-pointer"
                                            >
                                                <div
                                                    className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                                    <Image {...item.icon} alt={"icon"}/>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    <div className="bg-gray-50 p-4">
                                        <a
                                            href="/dashboard/courses/[id]##"
                                            className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                        >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          Documentation
                        </span>
                      </span>
                                            <span className="block text-sm text-gray-500">
                        Start integrating products and tools
                      </span>
                                        </a>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
        {/*    Various Modals for configuration */}
        <CreateUnitModal show={dialog === "unit"} create={create("unit")} closeModal={closeModal}/>
        <CreateAssignmentModal course={course} show={dialog === "assignment"} create={create("assignment")}
                               closeModal={closeModal}/>
    </>
}