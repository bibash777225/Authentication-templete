import { cn } from "@/lib/utils";
import { type FieldError } from "react-hook-form";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


interface Option {
  label: string;
  value: string;
}

interface ISelectProps extends Omit<
  React.ComponentProps<typeof Select>,
  "onValueChange"
> {
  label?: string;
  error?: string | FieldError;
  id?: string;
  options: Option[];
  value?: string;
  onChange: (d: string) => void;
  placeholder?: string;
  className?: string;
  position?: "item-aligned" | "popper";
}

const SelectDropdown = ({
  label,
  id,
  options,
  error,
  value,
  onChange,
  required,
  placeholder,
  className,
  position,
  ...props
}: ISelectProps) => {
  return (
    <Label
      htmlFor={id}
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

      <Select value={value} onValueChange={onChange} {...props}>
        <SelectTrigger
          id={id}
          className={cn(
            "py-5.5 border border-input w-full placeholder:text-muted-foreground/40",
            error && "border border-red-500",
            className,
          )}
        >
          <SelectValue
            className="placeholder:capitalize"
            placeholder={placeholder}
          />
        </SelectTrigger>
        <SelectContent position={position}>
          <SelectGroup>
            {/* <SelectLabel className="font-medium text-sm">{label}</SelectLabel> */}
            {options.map((option, idx) => (
              <SelectItem key={idx} value={option.value} className="capitalize">
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {error && (
        <p className="font-medium text-red-500 text-xs">
          {typeof error == "string" ? error : error.message}
        </p>
      )}
    </Label>
  );
};

export default SelectDropdown;
