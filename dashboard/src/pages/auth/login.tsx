import React from "react";
import Input from "../../components/Input";
import { useLogin } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "./auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage: React.FC = () => {
  const { isPending: isLoading, mutate: login } = useLogin<LoginSchemaType>();
  const navigtate = useNavigate();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    login(data, {
      onSuccess: () => {
        toast.success("Login successful");
      },
      onError: () => {
        toast.error("something went wrong");
      },
    });
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

        <h1 className={"text-[36px]"}>Login Now</h1>
        <Input {...form.register("email")} label={"Email"} />
        <Input {...form.register("password")} label={"Password"} />
        <div className={"flex justify-between w-full"}>
          <div className={"flex items-center gap-2"}>
            <input type={"checkbox"} />
            <span className={"text-sm"}>Remember me</span>
          </div>
          <p
            className={"underline cursor-pointer"}
            onClick={() => navigtate("/auth/forgotten")}
          >
            Forgot password?
          </p>
        </div>
        <button
          className={
            "w-full bg-[#002454] text-white font-[400] text-sm rounded p-2.5"
          }
        >
          {isLoading ? <Loader className={"animate-spin inline"} /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
