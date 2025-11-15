import React from 'react';
import {MenuIcon} from "lucide-react";
import {useApiUrl, useGetIdentity} from "@refinedev/core";
import {SessionResponse} from "../../pages/settings";


interface Props {
    onChange: () => void;
}

const Header: React.FC<Props> = ({onChange}) => {
    const apiUrl = useApiUrl()
    const {data } = useGetIdentity<SessionResponse>()


    const avatar = data?.data.account.user.avatar
    const name = data?.data.account.user.name

    return (
        <header className={"h-[90px] py-5 flex justify-between md:justify-end w-full bg-[#002454] m-0 p-0 border-0"}>
            <div className={"flex h-full w-20 md:hidden justify-center items-center "}>
                <MenuIcon className={"text-white cursor-pointer"} onClick={onChange} />
            </div>
            <div>
                <div className={"flex gap-1 items-center border border-gray-300 rounded-full px-5"}>
                    <div className={"size-7 rounded-full overflow-hidden"}>
                        {
                            avatar &&  <img src={avatar} alt="logo" className={"w-full h-full"}/>
                        }
                    </div>
                    <h1 className={"text-white text-sm my-4"}>{name ?? ""}</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;