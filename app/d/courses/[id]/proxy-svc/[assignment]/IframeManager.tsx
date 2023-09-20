"use client";
import {useState} from "react";
import useSWR from "swr";
import Loader from "@dash/components/Loader";
import PublishButton from "./components/PublishButton";
import {toast} from "react-toastify";

const fetcher = (url: string) => fetch(url).then(r => r.json());
const IframeManager = ({id, assignment, mode }: {id: number; assignment: number; mode?: "edit";}) => {
    const [refreshInterval, setRefreshInterval] = useState(1500);
    const {data, isLoading} = useSWR(`/api/v1/apps/quick-deploy/${id}/${assignment}`, fetcher, {
        refreshInterval
    });

    const [actualLoading, setLoading] = useState(true);

    const [isPublished, setPublished] = useState(data?.assignment?.is_published);

    const publish = async () => {

        const res = await fetch(`/api/v1/assignments/${assignment}/publish`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "publish"
            })
            }).then(r => r.json());

        if (res.success) {
            setPublished(true);
            toast("Published", {
                type: "success",
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true
            })
        } else {
            console.error(res);
            toast(`Failed to publish (${res.statusText}` , {
                type: "error",
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true
            })
        }
    }

    const unPublish = async () => {
            const res = await fetch(`/api/v1/assignments/${assignment}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "un-publish"
                })
                }).then(r => r.json());

            if (res.success) {
                setPublished(false);
                toast("Unpublished", {
                    type: "success",
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true
                })
            } else {
                toast(`Failed to un-publish (${res.statusText}` , {
                    type: "error",
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true
                })
                console.error(res);
            }
    }
    const iframe =
        <>
            <iframe src={`/app/1/?folder=${encodeURIComponent("/home/coder" + (data?.project?.fs_path ? data.project.fs_path : "lost+found"))}`}
                        className="z-[14] h-full w-[96.5%] max-w-full fixed left-[2.5rem]"
                        onLoad={() => {
                            setTimeout(() => {
                                setLoading(false);
                                setRefreshInterval(10000);
                            }, 750)
                        }
                        }
                />
        </>;

    if (actualLoading) {
        return (<>
            <Loader isLoading={!isLoading}/>
            {iframe}
        </>);
    } else {
        toast("Loaded")
        return (<>
            {iframe}
            {mode === "edit" && <PublishButton is_published={isPublished} publish={publish} unpublish={unPublish}/>}
        </>);
    }
}

export default IframeManager;