// noinspection JSIgnoredPromiseFromCall

import type {NextPage} from 'next'
import {useRouter} from 'next/router';
import useSWR from "swr";
import Loader from "@dash/components/Loader";

const Home: NextPage = () => {
    const router = useRouter();
    const {data: user, isLoading} = useSWR("/api/v1/users/@me");

    if (isLoading) {
        return <Loader isLoading={false}/>;
    }

    if (!user || user.error) {
        router.push('/login');
    } else {
        console.log(user);
        router.push('/dashboard');
    }
    return <Loader isLoading={true}/>;
}

export default Home;
