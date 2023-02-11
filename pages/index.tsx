// noinspection JSIgnoredPromiseFromCall

import type {NextPage} from 'next'
import {useRouter} from 'next/router';
import useSWR from "swr";

const Home: NextPage = () => {
    const router = useRouter();
    const {data: user, isLoading} = useSWR("/api/v1/users/@me");

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user || user.error) {
        router.push('/login');
    } else {
        console.log(user);
        router.push('/dashboard');
    }
    return <div className="bg-primary h-screen w-full">Hello World</div>
}

export default Home;
