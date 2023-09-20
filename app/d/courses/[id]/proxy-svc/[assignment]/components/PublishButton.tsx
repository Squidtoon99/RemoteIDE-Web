"use client";
import * as HoverCard from "@radix-ui/react-hover-card";


const PublishIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
        </svg>


    )
}

const UnPublishIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
        </svg>

    )
}

const PublishButton = ({is_published, publish, unpublish}: { is_published: boolean, publish: () => void; unpublish: () => void; }) => {
    return (
        <div className={"fixed bottom-6 right-6 z-[30] opacity-70"}>
            <HoverCard.Root>
                <HoverCard.Trigger asChild>
                    <button
                        className={`bg-accent-orange text-white-primary rounded-2xl p-3 ${is_published ? "opacity-50" : ""} cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all ease-in-out duration-500`}
                        onClick={is_published ? unpublish : publish}
                    >
                        {!is_published ? <PublishIcon/> : <UnPublishIcon/>}
                    </button>
                </HoverCard.Trigger>
                <HoverCard.Content sideOffset={5} className="bg-white rounded-2xl p-4 shadow-lg opacity-70">
                    {is_published ?
                        <>
                            <p className="font-bold">Unpublish</p>
                            <p className="text-white-sm">Unpublishing assignments prevents your students from viewing them.
                                You must unpublish to update assignments.</p>
                        </>

                        :
                        <>
                            <p className="font-bold">Publish</p>
                            <p className="text-white-sm">Publishing will make your assignment available to students and sync the code with your environment</p>
                        </>
                    }
                </HoverCard.Content>
            </HoverCard.Root>
        </div>

    )
}

export default PublishButton;