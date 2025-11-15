import React, {ReactNode} from 'react';
import {X} from "lucide-react";

interface Props {
    children: ReactNode;
    open: boolean;
    onClose: () => void;
}

const Dialog = ({open, children, onClose}: Props) => {
    return (
        <div className={`fixed ${open ? "scale-1" : "scale-0"} duration-100 transition-transform inset-0 bg-black/50 min-h-screen`}>
            <div className={"flex justify-center items-center h-full w-full"}>
                <div className={"bg-white rounded-lg relative p-5 shadow-lg"}>
                    <div className={"flex justify-end absolute -top-3 -right-3"}>
                        <button
                            onClick={onClose}
                            className={"rounded-full border bg-[#002454] border-[#002454] size-8 flex justify-center items-center"}>
                            <X className={"text-white"}/>
                        </button>
                    </div>
                    {
                        children
                    }
                </div>
            </div>
        </div>
    );
};

export default Dialog;