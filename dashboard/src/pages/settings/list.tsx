import React, {useEffect, useState} from "react";
import Input from "../../components/Input";
import {useForm} from "@refinedev/react-hook-form";
import {type SubmitHandler} from "react-hook-form";
import {UpdatePasswordSchema, UpdatePasswordSchemaType, UpdateUserSchema, UpdateUserSchemaType} from "./user.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import Dialog from "../../components/dialog";
import {useApiUrl, useCustomMutation, useGetIdentity} from "@refinedev/core";
// import AvatarUploader from "./AvatarUploader";
import {Loader2} from "lucide-react";
import toast from "react-hot-toast";
import AvatarUploader from "./AvatarUploader";

interface UserDetails {
    id: string;
    name: string;
    role: "USER" | "ADMIN" | string;
    avatar: string | null;
    address: string | null;
    dateOfBirth: string | null;
    language: string | null;
}

interface Account {
    id: string;
    userId: string;
    email: string;
    password: string;
    isVerified: boolean;
    verifyToken: string | null;
    verifyOtp: number | null;
    verifyExpiry: string | null;
    forgottenToken: string | null;
    forgottenOtp: number | null;
    forgottenExpiry: string | null;
    user: UserDetails;
}

 interface SessionData {
    account: Account;
}

export interface SessionResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: SessionData;
}


const SettingsPage: React.FC = () => {
    const [avatarUpdating, setAvatarUpdating] = useState(false)
    const [preview, setPreview] = useState<File | null>(null)
    const apiUrl = useApiUrl()
    const [open, setOpen] = React.useState(false);
    const { data, isLoading } = useGetIdentity<SessionResponse>()
    const {mutate} = useCustomMutation()


    const {register, handleSubmit, setValue} = useForm({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: {
            name: "",
            email: "",
        }
    })

    const PasswordForm = useForm({
        resolver: zodResolver(UpdatePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        }
    })

    const onSubmit: SubmitHandler<UpdateUserSchemaType>  = async (data) => {
        mutate({
            url: `${apiUrl}/profile`,
            method: "patch",
            values: data,
        }, {
            onSuccess: () => {
                toast.success("Profile updated successfully")
            },
            onError: (error) => {
                toast.error("Unknown error occurs")
            }
        })
    }

    const changePassword: SubmitHandler<UpdatePasswordSchemaType> = async values => {
        mutate({
            url: `${apiUrl}/profile/change-password`,
            method: "patch",
            values
        }, {
            onSuccess: () => {
                toast.success("Password changed successfully")
            }
        })
    }

    useEffect(() => {
        if(data) setValue("name", data.data.account.user.name)
        if(data) setValue("email", data.data.account.email)
    }, [data, setValue]);

    return (
<>
    <AvatarUploader setPreview={setPreview} setAvatarUpdating={setAvatarUpdating}/>
    <form onSubmit={handleSubmit(onSubmit)} className={"h-full bg-[#f6f6f6] flex justify-center"}>
        <div className={"inline-flex flex-col p-10 gap-5 items-center border border-black"}>
            <div className={"size-[158px] border border-gray-400 justify-center items-center flex rounded-full overflow-hidden"}>
                {
                    (isLoading || avatarUpdating) &&
                    <Loader2 className={"w-10 h-10 animate-spin"}/>
                }

                {
                    preview &&
                        <img src={URL.createObjectURL(preview)} alt="logo" className={"w-full h-full"}/>
                }

                {
                    preview === null && data?.data.account.user.avatar &&
                    <img src={data.data.account.user.avatar} alt="logo" className={"w-full h-full"}/>
                }
            </div>
            {
                avatarUpdating && <p className={"text-sm text-[#002454]"}>
                    Avatar updating...
                </p>
            }
            <div className={"flex gap-4"}>
                <label htmlFor={"image-uploader"} className={"border rounded border-black font-[400] text-sm bg-transparent p-2.5"}>Change Photo</label>
                <button onClick={() => setOpen(true)} className={"border rounded border-[#24A584] font-[400] text-sm text-[#24A584] bg-transparent p-2.5"}>Change Password</button>
            </div>
            <div className={"flex flex-col gap-4"}>
                <Input
                    {...register("name", {required: true})}
                    className={'w-80'}
                    label={"Name"}
                />
                <Input
                    {...register("email", {required: true})}
                    label={"Email"}
                />
                <button className={"bg-[#24A584] text-white font-[400] text-sm rounded p-2.5"}>
                    Edit Profile
                </button>
            </div>
        </div>
    </form>
    <Dialog open={open} onClose={() => {setOpen(false)}} >
        <form onSubmit={PasswordForm.handleSubmit(changePassword)} className={""}>
            <div className={"flex flex-col gap-4"}>
                <Input
                    {...PasswordForm.register("oldPassword", {required: true})}
                    label={"Old password"}
                />
                <Input
                    {...PasswordForm.register("newPassword", {required: true})}
                    label={"New password"}
                />
                <button className={"bg-[#24A584] text-white font-[400] text-sm rounded p-2.5"}>
                    Change Password
                </button>
            </div>
        </form>
    </Dialog>
</>
    );
};

export default SettingsPage;
