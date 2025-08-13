import * as z from "zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export const aadhaarSchema = z.object({
  aadhaarnumber: z
    .string()
    .regex(/^\d{12}$/, "Aadhaar number must be 12 digits."),
  name: z.string().min(2, "Name must be at least 2 characters."),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must give your consent."),
});

export const panSchema = z.object({
  organisationtype: z
    .string({ required_error: "Please select an organisation type." })
    .min(1, "Please select an organisation type."),
  pannumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format."),
  panTerms: z.boolean().optional(),
});

export const addressSchema = z.object({
  pincode: z.string().regex(/^\d{6}$/, "PIN code must be 6 digits."),
  state: z.string().min(1, "State is required."),
  city: z.string().min(1, "City is required."),
});

export type FieldConfig = {
  name: any;
  label: string | React.ReactNode;
  type: "text" | "checkbox" | "radio";
  placeholder?: string;
  options?: { value: string; label: string }[];
  className?: string;
  gridSpan?: number;
};

export const formSchema = {
  steps: [
    {
      title: "1. Aadhaar Verification With OTP",
      gridCols: 2,
      fields: [
        {
          name: "aadhaarnumber",
          label: "Aadhaar Number/ आधार संख्या",
          type: "text",
          placeholder: "Your Aadhaar No",
        },
        {
          name: "name",
          label: "Name of Entrepreneur / उद्यमी का नाम",
          type: "text",
          placeholder: "Name as per Aadhaar",
        },
      ] as FieldConfig[],
      description: [
        "Aadhaar number shall be required for Udyam Registration.",
        "The Aadhaar number shall be of the proprietor in the case of a proprietorship firm, of the managing partner in the case of a partnership firm and of a karta in the case of a Hindu Undivided Family (HUF).",
        'In case of a Company or a Limited Liability Partnership or a Cooperative Society or a Society or a Trust, the organisation or its authorised signatory shall provide its GSTIN(As per applicablity of CGST Act 2017 and as notified by the ministry of MSME <a href="#" class="text-primary hover:underline">vide S.O. 1055(E) dated 05th March 2021</a>) and PAN along with its Aadhaar number.',
      ],
      terms: {
        name: "terms",
        label:
          "I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number as alloted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India, have informed me that my aadhaar data will not be stored/shared. / मैं, आधार धारक, इस प्रकार उद्यम पंजीकरण के लिए यूआईडीएआई के साथ अपने आधार संख्या का उपयोग करने के लिए सू०ल०म०उ० मंत्रालय, भारत सरकार को अपनी सहमति देता हूं। एनआईसी / सू०ल०म०उ० मंत्रालय, भारत सरकार ने मुझे सूचित किया है कि मेरा आधार डेटा संग्रहीत / साझा नहीं किया जाएगा।",
        type: "checkbox",
      } as FieldConfig,
      submitButtonText: "Validate & Generate OTP",
    },
    {
      title: "2. PAN Verification",
      gridCols: 1,
      fields: [
        {
          name: "organisationtype",
          label: "Type of Organisation / संगठन का प्रकार",
          type: "radio",
          options: [
            { value: "1", label: "Proprietary" },
            { value: "2", label: "Partnership" },
            { value: "3", label: "HUF" },
            { value: "5", label: "Private Limited Company" },
            { value: "4", label: "Limited Liability Partnership" },
            { value: "6", label: "Public Limited Company" },
            { value: "7", label: "Self Help Group" },
            { value: "9", label: "Society/Club/Trust/AOP/BOI" },
            { value: "8", label: "Co-operative" },
          ],
        },
        {
          name: "pannumber",
          label: (
            <>
              <span>PAN Number</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="link"
                      size="icon"
                      className="h-4 w-4 ml-1"
                      type="button"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      PAN of Organisation in case of Co-Operative/Pvt Ltd/Public
                      Ltd/LLP. In case of Proprietor firm, PAN of Proprietor
                      shall be mentioned.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ),
          type: "text",
          placeholder: "Your PAN No",
          className: "w-full md:w-1/2",
        },
      ] as FieldConfig[],
      terms: {
        name: "panTerms",
        label:
          "I hereby agree to share my PAN details with the Income Tax Department for verification.",
        type: "checkbox",
      } as FieldConfig,
      submitButtonText: "Validate PAN",
    },
    {
      title: "3. Address Details",
      gridCols: 2,
      fields: [
        {
          name: "pincode",
          label: "PIN Code",
          type: "text",
          placeholder: "Enter 6-digit PIN",
          gridSpan: 1,
        },
        {
          name: "spacer",
          label: "",
          type: "text",
          gridSpan: 1,
          className: "hidden md:block",
        },
        {
          name: "state",
          label: "State",
          type: "text",
          placeholder: "State (auto-filled)",
          className: "bg-gray-100",
        },
        {
          name: "city",
          label: "City",
          type: "text",
          placeholder: "City (auto-filled)",
          className: "bg-gray-100",
        },
      ] as FieldConfig[],
      submitButtonText: "Submit Registration",
    },
  ],
};
