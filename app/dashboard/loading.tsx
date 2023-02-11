const Loading = () => {
    return (
        <div className="p-4">
            <div className="flex flex-row gap-4">
                <div className="flex flex-col w-1/2">
                    <h1 className="text-4xl font-extrabold animate-pulse space-x-4 w-full h-10 bg-primary/50 rounded-full"></h1>
                </div>
                <div className="flex flex-col w-1/2">
                    <h1 className="text-4xl font-extrabold animate-pulse space-x-4 w-2/3 h-10 bg-primary/50 rounded-full"></h1>
                </div>
            </div>
            <div className="flex flex-row gap-4 my-8">
                <div className="flex flex-col w-1/2 gap-4">
                    <div className="flex animate-pulse flex-row space-x-4 w-full h-24 bg-primary/50 rounded-3xl"></div>
                    <div className="flex animate-pulse flex-row space-x-4 w-full h-24 bg-primary/50 rounded-3xl"></div>
                </div>
                <div className="flex flex-col w-1/2 gap-4">
                    <div className="flex animate-pulse flex-row space-x-4 w-full h-32 bg-primary/50 rounded-3xl"></div>
                    <div className="flex animate-pulse flex-row space-x-4 w-full h-32 bg-primary/50 rounded-3xl"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;