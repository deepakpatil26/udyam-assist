import { aadhaarSchema, panSchema, addressSchema } from "../form-schema";

describe("Form Schemas", () => {
  describe("aadhaarSchema", () => {
    it("should validate a correct aadhaar form submission", () => {
      const validData = {
        aadhaarnumber: "123456789012",
        name: "Test User",
        terms: true,
      };
      const result = aadhaarSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should invalidate an incorrect aadhaar number", () => {
      const invalidData = {
        aadhaarnumber: "12345",
        name: "Test User",
        terms: true,
      };
      const result = aadhaarSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        "Aadhaar number must be 12 digits."
      );
    });

    it("should require consent", () => {
      const invalidData = {
        aadhaarnumber: "123456789012",
        name: "Test User",
        terms: false,
      };
      const result = aadhaarSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        "You must give your consent."
      );
    });
  });

  describe("panSchema", () => {
    it("should validate a correct pan form submission", () => {
      const validData = {
        organisationtype: "1",
        pannumber: "ABCDE1234F",
        panTerms: true,
      };
      const result = panSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should invalidate an incorrect PAN number format", () => {
      const invalidData = {
        organisationtype: "1",
        pannumber: "INVALIDPAN",
        panTerms: true,
      };
      const result = panSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        "Invalid PAN number format."
      );
    });

    it("should require an organisation type", () => {
      const invalidData = {
        pannumber: "ABCDE1234F",
        panTerms: true,
      };
      const result = panSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        "Please select an organisation type."
      );
    });
  });

  describe("addressSchema", () => {
    it("should validate a correct address submission", () => {
      const validData = {
        pincode: "110001",
        state: "Delhi",
        city: "New Delhi",
      };
      const result = addressSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should invalidate an incorrect pincode", () => {
      const invalidData = {
        pincode: "123",
        state: "Delhi",
        city: "New Delhi",
      };
      const result = addressSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        "PIN code must be 6 digits."
      );
    });
  });
});
