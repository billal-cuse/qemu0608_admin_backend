import {AddIcon} from "../../icon";
import Dialog from "../../components/dialog";
import React, {useRef, useState} from "react";
import {useCreate, useList} from "@refinedev/core";
import toast from "react-hot-toast";
import AssessmentOptions from "../../components/AssessmentOptions";

interface Props {
    id: string;
    name: string;
}

const AirlinesList: React.FC = () => {
    const [addOpen, setAddOpen] = useState(false)
    const [airlines, setAirlines] = useState("")
    const inputRef = useRef<HTMLInputElement | null>(null)

    const {data: userList} = useList<Props>({
        resource: "assessments"
    })

    const {mutate: createAirlines} = useCreate<Props>({
        resource: "assessments",
        successNotification: () => {
            toast.success("Airlines created successfully")
            return false
        },
        errorNotification: (error) => {
            console.log(error)
            toast.error("Unknown error occurs")
            return false
        }
    })

    const handleCreateAirlines = () => {
        createAirlines({
            values: {
                name: airlines
            },
        })
        setAirlines("")
    }

    const addButtonHandler = () => {
        setAddOpen(true)
        inputRef.current?.focus()
    }

    return (
        <>
            <div className={"flex flex-wrap gap-4 bg-[#f6f6f6] h-full p-5"}>
                <button onClick={addButtonHandler} className={"bg-[#002454] gap-3 h-[56px] w-[391px] rounded flex items-center justify-center"}>
                    <AddIcon />
                    <h1 className={"text-lg text-white font-[500]"}>Add Airlines</h1>
                </button>
                {
                    userList?.data.map( e =>
                        <AssessmentOptions
                            key={e.id}
                            fieldKey={e.id}
                            airlines={e.name}
                        />
                    )
                }
            </div>
            <Dialog open={addOpen} onClose={() => setAddOpen(prev => !prev)}>
                <div className={""}>
                    <input
                        ref={inputRef}
                        value={airlines}
                        onChange={e => setAirlines(e.target.value)}
                        className={"border-0 outline-none"}
                        placeholder={"Airline name"}
                    />
                    <button
                        onClick={handleCreateAirlines}
                        className={"bg-[#002454] text-white px-5 py-2 rounded"}>Add</button>
                </div>
            </Dialog>
        </>
    );
};

export default AirlinesList;
