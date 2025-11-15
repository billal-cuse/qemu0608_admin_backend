import React from "react";
import Input from "../../components/Input";
import { useCustomMutation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { ChangePasswordSchema, ChangePasswordSchemaType } from "./auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router";
import { Loader } from "lucide-react";

const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);
  const { isPending: isLoading, mutate } = useCustomMutation({});

  const form = useForm({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordSchemaType> = (data) => {
    console.log(data);
    console.log(token);
    if (token)
      mutate(
        {
          url: `/auth/reset-password/${token}`,
          method: "post",
          values: {
            password: data.password,
          },
        },
        {
          onSuccess: () => {
            navigate("/auth/login");
          },
        },
      );
  };

  return (
    <div className={"w-full flex justify-center h-screen items-center"}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"max-w-[580px] px-5 w-full flex flex-col gap-3 "}
      >
        <div
          className={"flex gap-2 xl:hidden items-center justify-center pt-20"}
        >
          <img className={"w-16"} src={"/img.png"} alt="logo" />
          <h1 className={"text-5xl text-[#002454] font-bold"}>PassRate</h1>
        </div>

        <h1 className={"text-[36px]"}>Change Password</h1>
        <Input {...form.register("password")} label={"Password"} />
        <Input
          {...form.register("confirmPassword")}
          label={"Conform Password"}
        />
        <div className={"flex justify-between w-full"}>
          <div className={"flex items-center gap-2"}></div>
        </div>
        <button
          type="submit"
          className={
            "w-full bg-[#002454] text-white font-[400] text-sm rounded p-2.5"
          }
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className={"animate-spin inline"} />
          ) : (
            "Change Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
