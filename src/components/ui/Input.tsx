import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, hint, leftElement, rightElement, className, id, ...props },
    ref,
  ) => {
    const inputId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium font-poppins text-gray-700"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftElement && (
            <span className="absolute left-3 text-primary">{leftElement}</span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-xl bg-white border",
              "border-gray-300",
              "px-4 py-2.5 text-sm text-gray-900",
              "placeholder:text-gray-400",
              "transition-all duration-200",
              "focus:outline-none focus:border-primary focus:ring-2 focus:ring-secondary/40",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error &&
                "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              leftElement && "pl-10",
              rightElement && "pr-10",
              className,
            )}
            {...props}
          />

          {rightElement && (
            <span className="absolute right-3 text-gray-500">
              {rightElement}
            </span>
          )}
        </div>

        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

        {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
