import {format} from "date-fns";
import {Questrial} from "@next/font/google";
import Link from "next/link";

const quint = Questrial({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
});

const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];

const bg = (day: Date) => {
    let cls = [];
    if (day.getDate() === new Date().getDate()) {
        cls.push(...["bg-primary",
            "text-white",
            "p-1 sm:p-0",
            "rounded-full"]);
    } else if (day.getMonth() === new Date().getMonth()) {
        cls.push("text-primary");
    } else {
        cls.push("text-gray-200");
    }

    return cls.join(" ");
};

const Calendar = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayIndex = firstDay.getDay();
    const startIndex = new Date(firstDay.getFullYear(), firstDay.getMonth(), -firstDayIndex + 1);
    const weeks: Date[][] = Array.from(Array(42).keys()).map((i) => {
        return new Date(startIndex.getFullYear(), startIndex.getMonth(), startIndex.getDate() + i);
    }).reduce((acc, day, i) => {
        if (i % 7 === 0) {
            acc.push([]);
        }
        acc[acc.length - 1].push(day);
        return acc;
    }, [] as Date[][]).filter((week) => {
        return week.some(day => day.getMonth() === date.getMonth())
    });


    return (
        <div className="md:p-8 p-5 bg-white rounded-xl max-w-md" style={quint.style}>
            <div className="px-4 flex items-center justify-between">
                <span
                    className="focus:outline-none text-base font-bold text-gray-800 tracking-wide">{format(date, "MMMM yyyy")}</span>
            </div>
            <div className="flex items-center justify-between pt-4 overflow-x-auto">
                <table className="w-full" style={quint.style}>
                    <thead>
                    <tr>
                        {days.map((day, i) => {
                            return (
                                <th key={i}>
                                    <div className="w-full flex justify-center">
                                        <p className="text-base font-light text-center text-gray-800">{day}</p>
                                    </div>
                                </th>
                            );
                        })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {weeks.map((week, i) => {
                        return (
                            <tr key={i}>
                                {week.map((day, i) => {
                                    return (
                                        <td key={i}>
                                            <Link href={`/dashboard/calendar/?day=${day.getTime()}`}>
                                                <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                    <p className={`text-base ${bg(day)}`}>{format(day, "d")}</p>
                                                </div>
                                            </Link>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calendar;