import {Roboto} from "@next/font/google";
import Sidebar from './navigation/sidebar';
import type {FC, ReactNode} from 'react';

type Props = { children: ReactNode; };

const roboto = Roboto({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
});

const DashboardLayout: FC<Props> = ({ children }) => {
    return (<>
        <div className="flex flex-col h-screen bg-white font-roboto">
            <Sidebar />
            <div className="flex flex-1 flex-col lg:ml-[calc(13%_+_7rem)] sm:ml-[calc(13%_+_7rem)] md:lg:ml-[calc(13%_+_7rem)] ml-0 w-auto py-6" style={roboto.style}>
                {children}
            </div>
        </div></>);
};

export default DashboardLayout;