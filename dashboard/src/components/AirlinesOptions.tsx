import React, {useCallback, useRef, useState} from 'react';
import {CircleX, PencilIcon, SendIcon, Trash} from "lucide-react";
import {useDelete, useUpdate} from "@refinedev/core";
import toast from "react-hot-toast";

interface Props {
    fieldKey: string;
    airlines: string;
}

const AirlinesOptions = ({fieldKey, airlines}: Props) => {
    const [isEdit, setIsEdit] = useState(false)
    const [airlinesName, setAirlines] = useState(airlines)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const editHandler = useCallback(() => {
        setIsEdit(true)
        inputRef.current?.focus()
    }, [])

    const {mutate: updateAirlines}  = useUpdate({
        resource: "airlines",
        successNotification: () => {
            toast.success("Airlines updated successfully")
            setIsEdit(false)
            return false
        },
        errorNotification: (error) => {
            console.log(error)
            toast.error("Unknown error occurs")
            return false
        }
    })

    const {mutate: deleteAirlines} = useDelete({})

    const handleUpdateAirlines = (id:string, name: string) => {
        updateAirlines({
            values: {
                name
            },
            id
        })
    }

    const handleDeleteAirlines = (id: string) => {
        deleteAirlines({
            resource: "airlines",
            id
        })
    }

    return (
            <div className={"rounded px-3 relative border border-[#002454] p-3 w-80"}>
                <span className={`absolute bg-[#f6f6f6] transform -translate-y-5 text-sm transition-all duration-300 font-[500] px-1 `}>
                    Airlines Name
                </span>
                <div className={"flex gap-3"}>
                    <input ref={inputRef}
                           disabled={!isEdit}
                           id={fieldKey}
                           value={airlinesName}
                           onChange={(e) => setAirlines(e.target.value)} className={"outline-none border-0 w-full bg-transparent"} />
                    {
                        !isEdit ? <div className={"flex gap-[6px]"}>
                            <button
                                onClick={editHandler}
                                className={"bg-transparent text-[#24A584] border-0 size-6"}>
                                <PencilIcon className={"cursor-pointer"}/>
                            </button>
                            <button
                                onClick={() => handleDeleteAirlines(fieldKey)}
                                className={"bg-transparent text-red-500 border-0 size-6"}><Trash /> </button>
                        </div> : (
                            <div className={"flex gap-3"}>
                                {
                                    airlines !== airlinesName && <button
                                        onClick={() => handleUpdateAirlines(fieldKey, airlinesName)}
                                        className={"bg-transparent text-[#24A584] border-0 size-6"}>
                                        <SendIcon className={"text-sky-500"}/>
                                    </button>
                                }
                                <button
                                    className={"bg-transparent border-0 size-6"} onClick={() => setIsEdit(false)}>
                                    <CircleX />
                                </button>
                            </div>
                        )
                    }
                </div>
        </div>
    );
};

export default AirlinesOptions;