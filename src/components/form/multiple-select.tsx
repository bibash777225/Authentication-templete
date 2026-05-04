import { ChevronDown, X } from "lucide-react";
import React from "react";

// Option type for select items
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Props for the Select component
export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string[] | undefined;
  onChange: (e: {
    target: { value: string[]; selectedOptions?: HTMLOptionElement[] };
  }) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  allowNone?: boolean;
  noneLabel?: string;
}

// Custom Select Input Props
interface CustomSelectInputProps {
  value?: string[] | undefined;
  onChange: (e: {
    target: { value: string[]; selectedOptions?: HTMLOptionElement[] };
  }) => void;
  options: SelectOption[];
  placeholder: string;
  // multiple: boolean;
  disabled: boolean;
  error?: string;
  allowNone: boolean;
  noneLabel: string;
}

const MultipleSelect: React.FC<SelectProps> = ({
  label,
  options = [],
  value,
  onChange,
  error,
  required = false,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  allowNone = true,
  noneLabel = "Select an option",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block capitalize mb-1 font-medium text-gray-700 text-sm">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <CustomSelectInput
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        // multiple={multiple}
        disabled={disabled}
        error={error}
        allowNone={allowNone}
        noneLabel={noneLabel}
      />

      {error && (
        <p className="flex items-center gap-1 mt-1 text-red-600 text-sm">
          <span className="flex justify-center items-center bg-red-100 rounded-full w-4 h-4 text-red-600 text-xs">
            !
          </span>
          {error}
        </p>
      )}
    </div>
  );
};

const CustomSelectInput: React.FC<CustomSelectInputProps> = ({
  value,
  onChange,
  options,
  placeholder,
  // multiple,
  disabled,
  error,
  allowNone,
  noneLabel,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<string>("");

  const handleSelect = (option: SelectOption): void => {
    if (option.disabled) return;
    const currentValue = (value as string[]) || [];
    const optionValue = option.value;
    const isSelected = currentValue.includes(optionValue);

    let newValues: string[];
    if (isSelected) {
      newValues = currentValue.filter((item) => item !== optionValue);
    } else {
      newValues = [...currentValue, optionValue];
    }

    const mockSelectedOptions = newValues.map((val) => ({
      value: val,
    })) as HTMLOptionElement[];

    onChange({
      target: {
        value: newValues,
        selectedOptions: mockSelectedOptions,
      },
    });
  };

  const handleNoneSelect = (): void => {
    onChange({
      target: {
        value: [""],
        selectedOptions: [] as HTMLOptionElement[],
      },
    });

    setIsOpen(false);
  };

  const removeItem = (valueToRemove: string, e: React.MouseEvent): void => {
    e.stopPropagation();
    const currentValue = (value as string[]) || [];
    const newValues = currentValue.filter((item) => item !== valueToRemove);

    const mockSelectedOptions = newValues.map((val) => ({
      value: val,
    })) as HTMLOptionElement[];

    onChange({
      target: {
        value: newValues,
        selectedOptions: mockSelectedOptions,
      },
    });
  };

  const isSelected = (option: SelectOption): boolean => {
    return ((value as string[]) || []).includes(option.value);
  };

  const getSelectedOptions = (): SelectOption[] => {
    const multiValue = (value as string[]) || [];
    return options.filter((opt) => multiValue.includes(opt.value));
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.select-dropdown`)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative select-dropdown`}>
      <div
        className={`
          w-full px-3 py-2 border rounded-md cursor-pointer
          flex items-center justify-between min-h-10
          ${
            disabled
              ? "bg-gray-100 cursor-not-allowed"
              : "lg:bg-white hover:border-gray-400"
          }
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-secondary"
          }
          ${isOpen ? "ring-2 ring-secondary border-secondary" : ""}
          transition-colors duration-200
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || (e.key === " " && e.ctrlKey)) {
            e.preventDefault();
            if (!disabled) setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex flex-wrap flex-1 items-center gap-1">
          {value && (value as string[]).length > 0 ? (
            <>
              {getSelectedOptions().map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 bg-blue-100 px-2 py-1 rounded text-primary text-sm"
                >
                  {option.label}
                  {!disabled && (
                    <button
                      type="button"
                      onClick={(e) => removeItem(option.value, e)}
                      className="hover:bg-blue-200 p-0.5 rounded transition-colors"
                      aria-label={`Remove ${option.label}`}
                    >
                      <X size={12} />
                    </button>
                  )}
                </span>
              ))}
            </>
          ) : (
            <></>
          )}
          <input
            onChange={(e) => {
              if (!isOpen) setIsOpen(true);
              setFilter(e.target.value);
            }}
            value={filter}
            type="text"
            placeholder={placeholder || "Search"}
            className={`px-2 border-none outline-none h-full grow `}
          />
        </div>

        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="z-50 absolute bg-white shadow-lg mt-1 border border-gray-300 rounded-md w-full max-h-60 overflow-auto">
          {allowNone && (
            <div
              className="flex justify-between items-center hover:bg-gray-100 px-3 py-2 border-gray-200 border-b text-gray-600 cursor-pointer"
              onClick={handleNoneSelect}
            >
              <span className="italic">{noneLabel}</span>
              {(!value || (Array.isArray(value) && value.length === 0)) && (
                <span className="font-medium text-blue-600">✓</span>
              )}
            </div>
          )}
          {options.length === 0 ? (
            <div className="px-3 py-2 text-gray-500 text-sm">
              No options available
            </div>
          ) : (
            options
              .filter((option) =>
                option.label.toLowerCase().includes(filter.toLowerCase()),
              )
              .map((option) => (
                <div
                  key={option.value}
                  className={`
                  px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between
                  ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}
                  ${
                    isSelected(option)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-900"
                  }
                `}
                  onClick={() => handleSelect(option)}
                >
                  <span>{option.label}</span>
                  {isSelected(option) && (
                    <span className="font-medium text-blue-600">✓</span>
                  )}
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export { MultipleSelect };
