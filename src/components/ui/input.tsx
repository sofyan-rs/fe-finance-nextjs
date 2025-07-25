import { CURRENCY_LIST } from "@/constants/curency";
import { useUserData } from "@/hooks/use-user-data";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Input({
  className,
  type,
  icon,
  isCurrency,
  ...props
}: React.ComponentProps<"input"> & {
  icon?: React.ReactNode;
  isCurrency?: boolean;
}) {
  const { setting } = useUserData();
  const [showPassword, setShowPassword] = useState(false);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const paddingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCurrency) {
      setPaddingLeft(paddingRef.current?.offsetWidth || 0);
    }
  }, [isCurrency]);

  return (
    <div className="relative flex items-center">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
      )}
      {isCurrency && (
        <div
          className="absolute inset-y-0 left-0 flex items-center pl-3"
          ref={paddingRef}
        >
          <span className="text-muted-foreground border-r border-input pr-3">
            {setting.currency
              ? CURRENCY_LIST.find(
                  (currency) => currency.name === setting.currency
                )?.symbol
              : "Rp"}
          </span>
        </div>
      )}
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
          icon ? "pl-10" : ""
        )}
        style={{ paddingLeft: isCurrency ? paddingLeft + 12 : undefined }}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );
}

export { Input };
