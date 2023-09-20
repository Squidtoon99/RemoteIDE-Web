import {Course} from "@types";
import {FormEvent, Fragment, useRef, useState} from "react";
import type {AssignmentDataType, Template} from "@dash/courses/types";
import {Combobox, Dialog, Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon, ExclamationTriangleIcon} from '@heroicons/react/20/solid'
import {DateField} from "@dash/components/DatePicker";
import {CalendarDate, getLocalTimeZone, today} from "@internationalized/date";
import {useDatePickerState} from "react-stately";
import {useDatePicker} from "react-aria";
import {DateValue} from "@react-types/datepicker";

const languages: Template[] = [{
    name: "Java",
    icon: "https://cdn.iconscout.com/icon/free/png-256/java-43-569305.png"
}, {
    name: "Python",
    icon: "https://cdn.iconscout.com/icon/free/png-256/python-2-226051.png"
}, // {name: "JavaScript", icon: "https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png"}
]

const CreateAssignmentModal = ({
                                   course, show, create, closeModal
                               }: { course: Course, show: boolean, create: (e: FormEvent, data: AssignmentDataType) => void, closeModal: () => void }) => {

    const [data, setData] = useState<AssignmentDataType>({
        name: "",
        description: "",
        unit: course.units[0] || "",
        template: languages[0],
        due_date: today(getLocalTimeZone()),
    });

    const keys = Object.keys(data);
    console.log(data);
    // remove the description key
    keys.splice(keys.indexOf("description"), 1);
    // @ts-ignore
    const valid =  keys.length > 0 && keys.every((key) => (data[key] as string) !== "");


    const [unitQuery, setUnitQuery] = useState<string>("");

    const filteredUnits = unitQuery === '' ? course.units : course.units.filter((unit) => unit.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(unitQuery.toLowerCase().replace(/\s+/g, '')));

    const handleChange = (e: FormEvent) => {
        const target = e.target as HTMLInputElement;
        const name = target.name;
        const value = target.value;
        setData((prev) => ({...prev, [name]: value}));
    }

    // noinspection JSUnusedGlobalSymbols
    let date_props = {
        label: "Due Date",
        minValue: today(getLocalTimeZone()),
        onChange: (value: DateValue) => {

            setData((prev) => ({...prev, due_date: value as CalendarDate}));
        },
        value: data.due_date
    }

    let state = useDatePickerState(date_props);
    let ref = useRef();

    let {
        groupProps,
        fieldProps // @ts-ignore
      } = useDatePicker(date_props, state, ref);




    // @ts-ignore
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
                            onSubmit={(e: FormEvent<Element>) => create(e, data as AssignmentDataType)}
                            className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Create Assignment
                            </Dialog.Title>
                            <div className="mt-2 align-center flex flex-col gap-2">
                                <div className={"flex flex-row gap-2"}>
                                    <div className={"flex w-full"}>
                                        <input
                                            className={"w-full inline-flex justify-center px-2 shadow-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary rounded-md bg-primary/10"}
                                            type={"text"} id={"assignment_name"}
                                            placeholder={"Name"}
                                            name={"name"}
                                            onInput={handleChange}
                                        />
                                    </div>
                                    <div className={"w-full align-end"}>
                                        <Listbox value={data.template}
                                                 onChange={(value: Template) => setData((prev) => ({
                                                     ...prev, template: value
                                                 }))}>
                                            <div className="relative mt-1">
                                                <Listbox.Button
                                                    className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm">
                                                    <span
                                                        className={"absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"}>

                                              <img src={data.template.icon} alt={""} className={"h-5 w-5"}/>
                                          </span>
                                                    <span
                                                        className="block truncate ml-3 lg:ml-6">{data.template.name}</span>
                                                    <span
                                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                                                </Listbox.Button>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options
                                                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {languages.map((person, personIdx) => (<Listbox.Option
                                                            key={personIdx}
                                                            className={({active}) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`}
                                                            value={person}
                                                        >
                                                            {({selected}) => (<>
                                                                          <span
                                                                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                                                          >
                                                                            {person.name}
                                                                          </span>
                                                                <span
                                                                    className={"absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"}>

                                                                          <img src={person.icon} alt={person.name}
                                                                               className={"h-5 w-5"}/>
                                                                      </span>
                                                            </>)}
                                                        </Listbox.Option>))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </Listbox>
                                    </div>
                                </div>
                                <div className={"flex flex-row mb-2"}>
                                    <textarea
                                        className={"w-full inline-flex justify-center px-2 shadow-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary rounded-md bg-primary/10"}
                                        id={"assignment_description"}
                                        name={"description"}
                                        placeholder={"Description"}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={"flex flex-row gap-2 justify-around"}>
                                    <Combobox value={data?.unit || ""}
                                              onChange={(value) => setData((prev) => ({...prev, unit: value}))}>
                                        <div className="relative mt-1">
                                            <div
                                                className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm">
                                                <Combobox.Input
                                                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                                    displayValue={(unit: { name: string; }) => unit.name}
                                                    placeholder={"Unit"}
                                                    onChange={(event) => setUnitQuery(event.target.value)}
                                                />
                                                <Combobox.Button
                                                    className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <ChevronUpDownIcon
                                                        className="h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                </Combobox.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                                afterLeave={() => setUnitQuery('')}
                                            >
                                                <Combobox.Options
                                                    className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {filteredUnits.length === 0 && unitQuery !== '' ? (<div
                                                        className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                        Nothing found.
                                                    </div>) : (filteredUnits.map((unit) => (<Combobox.Option
                                                        key={unit.id}
                                                        className={({active}) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary text-white' : 'text-gray-900'}`}
                                                        value={unit}
                                                    >
                                                        {({selected, active}) => (<>
                        <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {unit.name}
                        </span>
                                                            {selected ? (<span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-primary'}`}
                                                            >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>) : null}
                                                        </>)}
                                                    </Combobox.Option>)))}
                                                </Combobox.Options>
                                            </Transition>
                                        </div>
                                    </Combobox>
                                    {/*    Date Picker */}
                                    <div className="relative inline-flex flex-col text-left">
                                        {/* @ts-ignore */}
                                        <div {...groupProps} ref={ref} className="flex group">
                                            <div
                                                className="rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm bg-white group-hover:border-gray-400 transition-colors pr-2 group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600 p-2 relative flex items-center">
                                                <DateField {...fieldProps} />
                                                {state.validationState === "invalid" && (
                                                    <ExclamationTriangleIcon className="w-6 h-6 text-red-500 absolute right-1"/>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex w-full justify-end">
                                <button
                                    type="submit"
                                    disabled={!valid}

                                    className="inline-flex justify-center rounded-3xl border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/75 disabled:bg-primary/75 disabled:hover:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all ease-in-out duration-300"
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

export default CreateAssignmentModal;