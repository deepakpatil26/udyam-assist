"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { CheckCircle2, Loader2, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { OtpDialog } from "@/components/udyam/otp-dialog";
import { ProgressTracker } from "@/components/udyam/progress-tracker";
import { useToast } from "@/hooks/use-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  aadhaarSchema,
  panSchema,
  addressSchema,
  formSchema,
} from "@/lib/form-schema";
import { DynamicFormField } from "./dynamic-form-field";
import { getPinCodeDetails, submitRegistration } from "@/app/actions";

const combinedSchema = aadhaarSchema.merge(panSchema).merge(addressSchema);
type FormValues = z.infer<typeof combinedSchema>;

export function UdyamAssistForm() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isOtpOpen, setIsOtpOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      aadhaarnumber: "",
      name: "",
      terms: false,
      organisationtype: "",
      pannumber: "",
      panTerms: false,
      pincode: "",
      state: "",
      city: "",
    },
    mode: "onTouched",
  });

  const pinCodeValue = useWatch({
    control: form.control,
    name: "pincode",
  });

  React.useEffect(() => {
    const fetchPinDetails = async () => {
      if (pinCodeValue && /^\d{6}$/.test(pinCodeValue)) {
        try {
          const details = await getPinCodeDetails(pinCodeValue);
          if (details) {
            form.setValue("city", details.city, { shouldValidate: true });
            form.setValue("state", details.state, { shouldValidate: true });
          } else {
            form.setValue("city", "");
            form.setValue("state", "");
          }
        } catch (error) {
          console.error("Failed to fetch PIN code details:", error);
          form.setValue("city", "");
          form.setValue("state", "");
        }
      }
    };
    fetchPinDetails();
  }, [pinCodeValue, form]);

  const handleAadhaarSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsOtpOpen(true);
    setIsSubmitting(false);
  };

  const handleOtpConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsOtpOpen(false);
      setCurrentStep(2);
      setIsSubmitting(false);
      toast({
        variant: "default",
        title: "OTP Validated Successfully",
        description: "Please proceed with PAN verification.",
      });
    }, 1000);
  };

  const handlePanSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentStep(3);
    setIsSubmitting(false);
    toast({
      variant: "default",
      title: "PAN Validated Successfully",
      description: "Please fill in your address details.",
    });
  };

  const handleFinalSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const result = await submitRegistration(data);
    setIsSubmitting(false);

    if (result.success) {
      setCurrentStep(4);
      toast({
        variant: "default",
        title: "Registration Submitted",
        description: "Your registration has been processed successfully.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: result.message,
      });
    }
  };

  const goToNextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ["aadhaarnumber", "name", "terms"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["organisationtype", "pannumber", "panTerms"];
    }

    const isValid = await form.trigger(fieldsToValidate);

    if (!isValid) {
      return;
    }

    if (currentStep === 1) {
      handleAadhaarSubmit();
    } else if (currentStep === 2) {
      handlePanSubmit();
    }
  };

  const currentFormSchema = formSchema.steps[currentStep - 1];

  if (currentStep > formSchema.steps.length) {
    return (
      <Card className="w-full animate-in fade-in-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-green-600">
            <CheckCircle2 className="h-8 w-8" />
            Submission Successful!
          </CardTitle>
          <CardDescription className="text-center">
            Thank you for your submission. Your Udyam registration has been
            processed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => window.location.reload()}>Start Over</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">
          <div className="flex justify-center md:justify-start">
            <ProgressTracker currentStep={currentStep} />
          </div>
          <Alert
            variant="destructive"
            className="mt-4 bg-yellow-50 border-yellow-200 text-yellow-800"
          >
            <AlertTriangle className="h-4 w-4 !text-yellow-500" />
            <AlertTitle className="font-bold">Demonstration Only</AlertTitle>
            <AlertDescription>
              This is a demo application. Please do not enter real Aadhaar or
              PAN numbers. All functionality, including OTP, is simulated.
            </AlertDescription>
          </Alert>
          <Card className="w-full shadow-lg border-t-4 border-t-primary mt-4">
            <CardHeader className="bg-primary/10 p-2">
              <CardTitle className="text-lg font-semibold text-primary">
                {currentFormSchema.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleFinalSubmit)}
                  className="space-y-6"
                >
                  <div
                    className={`grid grid-cols-1 ${
                      currentFormSchema.gridCols === 2 ? "md:grid-cols-2" : ""
                    } gap-x-8 gap-y-4`}
                  >
                    {currentFormSchema.fields.map((field) => (
                      <DynamicFormField
                        key={field.name}
                        control={form.control}
                        fieldConfig={field}
                      />
                    ))}
                  </div>

                  {currentFormSchema.description && (
                    <ul className="list-disc list-inside space-y-2 text-xs text-muted-foreground">
                      {currentFormSchema.description.map((item, index) => (
                        <li
                          key={index}
                          dangerouslySetInnerHTML={{ __html: item }}
                        ></li>
                      ))}
                    </ul>
                  )}

                  {currentFormSchema.terms && (
                    <DynamicFormField
                      control={form.control}
                      fieldConfig={currentFormSchema.terms}
                    />
                  )}

                  <div className="flex justify-center md:justify-start">
                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={goToNextStep}
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        {isSubmitting && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {currentFormSchema.submitButtonText}
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        {isSubmitting && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {currentFormSchema.submitButtonText}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-1/4">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-base text-primary font-bold">
                Note:
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-3 text-gray-700">
              <p>
                Udyam Registration is free of cost. No fee is charged for this
                process.
              </p>
              <p>For Registration, Aadhaar number is mandatory.</p>
              <p>
                The Aadhaar number should be of the Proprietor for a
                Proprietorship firm, the Managing Partner for a Partnership
                firm, or the Karta for a Hindu Undivided Family (HUF).
              </p>
              <p>
                In case of a Company, LLP, Co-operative Society, Society, or
                Trust, the authorised signatory must provide the organization's
                GSTIN and PAN along with their Aadhaar number.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <OtpDialog
        open={isOtpOpen}
        onOpenChange={setIsOtpOpen}
        onConfirm={handleOtpConfirm}
        isConfirming={isSubmitting}
      />
    </TooltipProvider>
  );
}
