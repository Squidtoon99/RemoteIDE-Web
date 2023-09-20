// Escaping the dashboard root to remove the default layout

import TinyBar from "@dash/navigation/TinyBar";
import IframeManager from "./IframeManager";
import WrappedToast from "@dash/WrappedToast";
import {getUser} from "@dash/components";
import UserRedirect from "@dash/components/UserRedirect";

type Props = { params: { id: number; assignment: number; }; searchParams: { mode?: "edit"; }; };
const Page = async ({params: {id, assignment}, searchParams: {mode}}: Props) => {
    const user = await getUser();

    return (<>
            <UserRedirect user={user}/>
            <div className="w-screen h-screen bg-primary/50 overflow-hidden">
                <TinyBar/>
                <IframeManager id={id}
                               assignment={assignment}
                               mode={mode}/>
                <WrappedToast/>
            </div>

        </>
    )
};

export default Page;