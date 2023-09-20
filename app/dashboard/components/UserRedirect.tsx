"use client"

import {User} from "@types";
import {useEffect} from "react";

const UserRedirect = ({user}: {user?: User}) => {
    useEffect(() => {
        if (!user) {
            window.location.href = "/login";
        }
    }, [user]);

    return null;
}

export default UserRedirect;