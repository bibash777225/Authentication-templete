import { cn } from "@/lib/utils";
import { type FieldError } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  error?: string | FieldError;
}

const InputField = ({
  label,
  error,
  className,
  required,
  ...props
}: InputProps) => {
  return (
    <Label
      htmlFor={props.id}
      className="flex flex-col items-start gap-y-[0.38rem] text-text-dark has-disabled:text-text-helper has-disabled:cursor-not-allowed"
    >
      {label && (
        <p className="font-medium text-sm capitalize">
          {label}
          {required && (
            <span className="inline-block ml-1 text-red-500">*</span>
          )}
        </p>
      )}
      <Input
        type={props.type}
        className={cn(
          "py-5.5 focus:border-transparent! placeholder:text-muted-foreground/40",
          error && "border border-red-500",
          className,
        )}
        {...props}
      />
      {error && (
        <p className="font-medium text-red-500 text-xs">
          {typeof error == "string" ? error : error.message}
        </p>
      )}
    </Label>
  );
};

export default InputField;
