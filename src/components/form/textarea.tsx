import type { FieldError } from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

type TextareaFieldProps = {
  id?: string;
  label: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  className?: string;
  error?: FieldError | string;
};
const CustomTextarea = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  className,
  error,
  ...props
}: TextareaFieldProps) => {
  return (
    <div className="space-y-2 max-w-full">
      <Label htmlFor={id} className="text-text-dark">
        {label}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "focus:border-none max-w-full min-h-30 break-after-all resize-none",
          error && "border border-red-500",
          className,
        )}
        {...props}
      />
      {error && (
        <p className="font-medium text-red-500 text-xs">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
};

export default CustomTextarea;
