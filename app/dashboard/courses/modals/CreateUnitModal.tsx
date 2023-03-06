"use client";
import {Dialog, Transition} from "@headlessui/react";
import {FormEvent, Fragment, useState} from "react";
import * as Label from "@radix-ui/react-label";

const CreateUnitModal = ({
                             closeModal,
                             create,
                             show
                         }: { closeModal: () => void; create: (e: FormEvent, {unit_name}: {unit_name: string}) => void; show: boolean }) => {
    const [unit_name, setUnitName] = useState<string>("");
    return <Transition appear show={show} as={Fragment}>
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
                            as={"form"}
                            onSubmit={(e: FormEvent<Element>) => create(e, {unit_name})}
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
                                    type="submit"
                                    disabled={unit_name === ""}

                                    className="inline-flex justify-center rounded-3xl border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/75 disabled:pg-primary/75 disabled:hover:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all ease-in-out duration-300"
                                >
                                    Create
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>;
}

export default CreateUnitModal;