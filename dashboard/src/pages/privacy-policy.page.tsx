import Editor from "../components/editor";
import {useEffect, useState} from "react";
import {useCustom, useUpdate} from "@refinedev/core";

function PrivacyPolicyPage() {
    const [privacyPolicyValue, setPrivacyPolicyValue] = useState("")
    const {data} = useCustom<{data: {id: string, content: string}}>({
        url: "/policy",
        method: "get"
    })

    const { mutate } = useUpdate()

    useEffect(() => {
        if (data?.data?.data?.content) {
            setPrivacyPolicyValue(data.data.data.content);
             console.log('t',privacyPolicyValue)
        }
    }, [data]);

    const updateHandler = () => {
        if (!privacyPolicyValue) return;

        mutate({
            resource: "policy",
            id: "68e34f9367cb96aad7bea93a",
            values: {
                content: privacyPolicyValue,
            },
        });
    };


    return <div className={"flex gap-2 flex-col pb-10"}>
        <Editor value={privacyPolicyValue} onChange={setPrivacyPolicyValue}/>
        <div className={"flex justify-end"}>
            <button
                onClick={updateHandler}
                className={" bg-[#002454] !text-white !w-[192px] !h-[56px] !rounded-[12px] !font-[700] !font-['shatoshi']"}>
                Edit
            </button>
        </div>
    </div>;
}


export default PrivacyPolicyPage;