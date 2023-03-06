// Escaping the dashboard root to remove the default layout

"use client";
import useSWR from "swr";
import TinyBar from "app/dashboard/navigation/TinyBar";
import {useState} from "react";
import Loader from "@dash/components/Loader";
//
const fetcher = (url: string) => fetch(url).then(r => r.json());
const Page = ({params: {id, assignment}}: { params: { id: number; assignment: number; }; }) => {
    const [refreshInterval, setRefreshInterval] = useState(1500);
    const {data, isLoading} = useSWR(`/api/v1/apps/quick-deploy/${id}/${assignment}`, fetcher, {
        refreshInterval
    });

    const [actualLoading, setLoading] = useState(true);

    return (
        <div className="w-screen h-screen bg-primary/50 overflow-hidden">
            <TinyBar/>
            {actualLoading && <Loader isLoading={!(isLoading || data?.fs_path)}/>}
            {<div className="h-screen w-screen fixed z-[14] right-0">
                <iframe src={`/app/1/?folder=${encodeURIComponent("/home/coder" + (data?.fs_path ? data?.fs_path : "/"))}`}
                        className="z-[14] h-full w-[96.5%] max-w-full fixed left-[2.5rem]"
                        onLoad={() => {
                            setTimeout(() => {
                                setLoading(false);
                                setRefreshInterval(10000);
                            }, 750)
                        }
                        }
                />
            </div>}
        </div>
    );
};

export default Page;