"use server";

import { z } from "zod";
import { aadhaarSchema, panSchema, addressSchema } from "@/lib/form-schema";
import { createClient } from "@/lib/supabase-client";

interface PinCodeDetail {
  city: string;
  state: string;
}

const fullFormSchema = aadhaarSchema.merge(panSchema).merge(addressSchema);
type FormValues = z.infer<typeof fullFormSchema>;

export async function submitRegistration(data: FormValues) {
  const parsedData = fullFormSchema.safeParse(data);

  if (!parsedData.success) {
    console.error("Server-side validation failed:", parsedData.error);
    return { success: false, message: "Invalid data submitted." };
  }

  const { panTerms, terms, ...dataToInsert } = parsedData.data;

  const supabase = createClient();
  const { error } = await supabase.from("registrations").insert([dataToInsert]);

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, message: `Database error: ${error.message}` };
  }

  return { success: true, message: "Registration submitted successfully!" };
}

export async function getPinCodeDetails(
  pincode: string
): Promise<PinCodeDetail | null> {
  if (!pincode || pincode.length !== 6) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    if (!response.ok) {
      console.error("Failed to fetch from postal code API");
      return null;
    }

    const data = await response.json();

    if (
      data &&
      data[0] &&
      data[0].Status === "Success" &&
      data[0].PostOffice.length > 0
    ) {
      const postOffice = data[0].PostOffice[0];
      return {
        city: postOffice.District,
        state: postOffice.State,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching PIN code details:", error);
    return null;
  }
}
