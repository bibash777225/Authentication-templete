import { Button } from "@/components/ui/button";

import PasswordField from "@/components/ui/password-field";
import { Loader2 } from "lucide-react";
import { useLogin } from "./hooks/useLogin";
import InputField from "@/components/ui/input-field";

export default function Login() {
  const { form, handleLoginFormSubmit } = useLogin();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;
  return (
    <div className="relative place-items-center grid p-12 w-screen h-screen overflow-auto">
      {/* background pattern */}
      <div className="-z-10 absolute inset-0 bg-[repeating-linear-gradient(45deg,#ececec_0_2px,transparent_2px_40px)] dark:bg-[repeating-linear-gradient(45deg,#2a2a2a_0_2px,transparent_2px_40px)] opacity-20 w-full h-full" />
      <div className="-z-10 absolute inset-0 bg-[repeating-linear-gradient(-45deg,#ececec_0_2px,transparent_2px_40px)] dark:bg-[repeating-linear-gradient(45deg,#2a2a2a_0_2px,transparent_2px_40px)] opacity-20 w-full h-full" />

      {/* main container */}
      <div className="flex flex-col justify-center items-center space-y-6 size-full">
        <div className="bg-background dark:bg-neutral-900 shadow-lg p-8 3xl:p-10 border border-border/50 rounded-2xl w-full max-w-100 3xl:max-w-[480px]">
          <h1 className="font-semibold text-xl 3xl:text-2xl text-center">
            Welcome to Law Remedy
          </h1>

          <form onSubmit={handleLoginFormSubmit} className="space-y-6 pt-8">
            <InputField
              label="email"
              error={errors.email}
              {...register("email")}
            />
            <PasswordField
              label="Password"
              error={errors.password}
              {...register("password")}
            />

            {/* <p className="text-muted-foreground text-xs leading-relaxed">
              By signing up, you agree to our{" "}
              <Link
                to="#"
                target="_blank"
                className="font-medium text-primary underline"
              >
                Privacy Policy
              </Link>{" "}
              &amp;{" "}
              <Link
                to="#"
                target="_blank"
                className="font-medium text-primary underline"
              >
                Terms and Conditions
              </Link>
            </p> */}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  Signing In
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
