import React from 'react';
import Input from "../../components/Input";
import {useForgotPassword} from "@refinedev/core";
import {useForm} from "@refinedev/react-hook-form";
import {Loader} from "lucide-react";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

const ForgottenPage: React.FC = () => {
    const {isPending: isLoading, mutate: sendMail} = useForgotPassword()

    const form = useForm({
        resolver: zodResolver(z.object({
            email: z.email(),
        }))
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        sendMail(data)
    }

    return (
        <div className={"w-full flex justify-center h-screen items-center"}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"max-w-[580px] px-5 w-full flex flex-col gap-3 "}>
                <div className={"flex gap-2 xl:hidden items-center justify-center pt-20"}>
                    <img className={'w-16'} src={"/img.png"} alt="logo"/>
                    <h1 className={"text-5xl text-[#002454] font-bold"}>PassRate</h1>
                </div>

                <h1 className={"text-[36px]"}>Forgot password</h1>
                <Input {...form.register("email")} label={"Email"}/>

                <button
                    disabled={!form.formState.isValid}
                    className={`w-full font-[400] text-sm rounded p-2.5 ${form.formState.isValid ? "bg-[#002454] text-white cursor-pointer" : ""}`}>
                    {
                        isLoading ? <Loader className={"animate-spin inline"}/> : "Send Mail"
                    }
                </button>

            </form>
        </div>
    );
};

export default ForgottenPage;