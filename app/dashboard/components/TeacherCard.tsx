"use client";
import {AnalyticsIcon, PolygonIcon, TriangleIcon} from "../icons";
import {Dialog, Popover, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {Fragment, useState} from "react";
import Image from "next/image";
import * as Label from "@radix-ui/react-label";
import {Roboto} from "@next/font/google";

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

export function TeacherCard({course_id}: { course_id: number }) {
    let [dialog, setDialog] = useState<DialogType>("");

    const [unit_name, setUnitName] = useState<string>("");

    const closeModal = () => {
        setDialog("");
    }

    const openModal = (type: DialogType) => {
        return () => {
            setDialog(type);
        };
    }

    const create = (type: DialogType) => {
        return () => {
            if (type === "unit") {
                // create unit
                fetch(`/api/v1/courses/${course_id}/units`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: unit_name
                    })
                }).then(res => {
                    if (res.status === 200) {
                        // success
                        setDialog("");
                    } else {
                        // error
                        console.log("error", res);
                    }
                });
            }
            return closeModal();
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
                                            href="app/dashboard/courses/[id]##"
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
        <Transition appear show={dialog === "unit"} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto left-1/2 -translate-x-1/2">
                    <div className="min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Create Unit
                                </Dialog.Title>
                                <div className="mt-2 align-center flex flex-col">
                                    <div className={"flex flex-row"}>
                                        <Label.Root htmlFor={"unit_name"} className={"min-w-sm"}>
                                            Name
                                        </Label.Root>
                                        <input
                                            className={"w-full ml-3 inline-flex justify-center px-2 shadow-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary rounded-md bg-primary/10"}
                                            type={"text"} id={"unit_name"}
                                            onInput={(e) => {
                                                setUnitName((e.target as HTMLInputElement).value)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex w-full justify-end">
                                    <button
                                        type="button"
                                        disabled={unit_name === ""}
                                        className="inline-flex justify-center rounded-3xl border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/75 disabled:pg-primary/75 disabled:hover:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all ease-in-out duration-300"
                                        onClick={create("unit")}
                                    >
                                        Create
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
}