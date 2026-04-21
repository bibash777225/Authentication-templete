import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { type FieldError } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | FieldError;
}

const PasswordField = ({
  label,
  error,
  className,
  ...props
}: Omit<InputProps, "type">) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Label
      htmlFor={props.id}
      className="flex flex-col items-start gap-y-[0.38rem] text-text-dark has-disabled:text-text-helper has-disabled:cursor-not-allowed"
    >
      {label && (
        <p className="font-medium text-sm capitalize">
          {label}
          {props.required && <span className="text-red-500">*</span>}
        </p>
      )}
      <div className="relative w-full">
        <Input
          type={isVisible ? "text" : "password"}
          className={cn(
            "py-5.5 pr-10 focus:border-transparent! placeholder:text-muted-foreground/40",
            error && "border border-red-500",
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setIsVisible((p) => !p)}
          className="top-1/2 right-2 absolute text-text-helper -translate-y-1/2"
        >
          {isVisible ? (
            <EyeClosed className="starting:opacity-0 transition" />
          ) : (
            <Eye className="starting:opacity-0 transition" />
          )}
        </button>
      </div>
      {error && (
        <p className="font-medium text-red-500 text-xs">
          {typeof error == "string" ? error : error.message}
        </p>
      )}
    </Label>
  );
};

export default PasswordField;
