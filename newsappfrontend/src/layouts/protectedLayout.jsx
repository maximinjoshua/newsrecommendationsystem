import { Outlet, useLoaderData } from "react-router";

export const ProtectedLayout = () => {

    const loaderData = useLoaderData()

    return (<>
        <Outlet context={{loaderData}}/>
    </>)
}