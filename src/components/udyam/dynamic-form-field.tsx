"use client";

import { ControllerProps, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldConfig } from "@/lib/form-schema";
import { cn } from "@/lib/utils";

type DynamicFormFieldProps<T extends FieldValues> = {
  control: ControllerProps<T>["control"];
  fieldConfig: FieldConfig;
};

export function DynamicFormField<T extends FieldValues>({
  control,
  fieldConfig,
}: DynamicFormFieldProps<T>) {
  const { type, name, label, placeholder, options, className, gridSpan } =
    fieldConfig;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        if (name === "spacer") {
          return (
            <div
              className={className}
              style={{ gridColumn: `span ${gridSpan || 1}` }}
            />
          );
        }
        switch (type) {
          case "text":
            return (
              <FormItem style={{ gridColumn: `span ${gridSpan || 1}` }}>
                <FormLabel className="font-bold">{label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    {...field}
                    className={cn(className)}
                    readOnly={!!className?.includes("bg-gray-100")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          case "checkbox":
            return (
              <FormItem
                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm"
                style={{ gridColumn: `span ${gridSpan || 2}` }}
              >
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">{label}</FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            );
          case "radio":
            return (
              <FormItem
                className="space-y-3"
                style={{ gridColumn: `span ${gridSpan || 2}` }}
              >
                <FormLabel className="font-bold">{label}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    {options?.map((option) => (
                      <FormItem
                        key={option.value}
                        className="flex items-center space-x-2 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          default:
            return null;
        }
      }}
    />
  );
}
