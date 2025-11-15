import React from 'react';
import {useDelete} from "@refinedev/core";
import {Trash} from "lucide-react";

interface Props {
    id: string;
}

const DeleteActions: React.FC<Props> = ({id}) => {
    const {mutate} = useDelete()
    const deleteHandler = () => {
        mutate({
            resource: "payment",
            id,
        })
    }
    return (
        <div className={"flex gap-6"} onClick={deleteHandler}>
            <button className={"bg-transparent size-10 rounded-lg border-2 flex justify-center items-center border-black"}><Trash /></button>
        </div>
    );
};

export default DeleteActions;