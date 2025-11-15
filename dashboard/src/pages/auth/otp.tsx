import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { LoginSchema } from "./auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import OTPInput from "react-otp-input";
import { useCustomMutation } from "@refinedev/core";
import { useNavigate, useSearchParams } from "react-router";

const OtpPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState<string>("");
  const { mutate, data, isPending: isLoading } = useCustomMutation();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
  });

  if (data?.data.data.token) {
    navigate("/auth/reset?token=" + data.data.data.token);
  }

  const email = searchParams.get("email");

  const onSubmit = () => {
    if (email)
      mutate({
        url: "/auth/forgot-password/otp",
        method: "post",
        values: {
          otp,
          email,
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
        <h1 className={"text-[36px]"}>Verify</h1>
        <div className={""}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            inputStyle={{ width: "100%", height: "100px", margin: "10px" }}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <button
          onClick={onSubmit}
          type={"submit"}
          className={
            "w-full bg-[#002454] text-white font-[400] text-sm rounded p-2.5"
          }
        >
          {isLoading ? <Loader className={"animate-spin inline"} /> : "verify"}
        </button>
      </form>
    </div>
  );
};

export default OtpPage;
