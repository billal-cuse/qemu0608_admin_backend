import React from 'react';
import {Navigate, Outlet} from "react-router";
import {useIsAuthenticated} from "@refinedev/core";

const AuthLayout: React.FC = () => {
const { data: authenticated } = useIsAuthenticated();

if (authenticated?.authenticated) {
    return <Navigate to={"/"} />
}

    return (
        <div className={"w-full h-screen bg-[#f6f6f6] overflow-hidden"}>
            <div className={"flex"}>
                <Outlet />
                <div className={"hidden xl:flex relative justify-end"}>
                    <div className={"w-[561px] bg-[#002454] h-full"}>
                        <div className={"flex gap-2 items-center justify-center pt-20"}>
                            <img className={'w-[114px] '} src={"/img.png"} alt="logo"/>
                            <h1 className={"text-[74px] text-white font-bold"}>PassRate</h1>
                        </div>
                    </div>

                    <div className={"absolute top-80 -left-40 h-full"}>
                        <div className={"relative w-full"}>
                            <img className={"absolute"} src={"/dotted_world.png"} alt="logo"/>
                            <img className={""} src={"/airplane.png"} alt="logo"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;