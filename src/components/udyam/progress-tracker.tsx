"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressTrackerProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: "Aadhaar Validation" },
  { id: 2, name: "PAN Validation" },
  { id: 3, name: "Address Details" },
];

export function ProgressTracker({ currentStep }: ProgressTrackerProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn("relative", {
              "pr-8 sm:pr-20": stepIdx !== steps.length - 1,
            })}
          >
            {step.id < currentStep ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-primary" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Check className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <span className="block mt-2 text-xs text-primary font-semibold">
                  {step.name}
                </span>
              </>
            ) : step.id === currentStep ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white"
                  aria-current="step"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                </div>
                <span className="block mt-2 text-xs text-primary font-semibold">
                  {step.name}
                </span>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent"
                    aria-hidden="true"
                  />
                </div>
                <span className="block mt-2 text-xs text-gray-500">
                  {step.name}
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
