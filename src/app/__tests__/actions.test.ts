import { submitRegistration, getPinCodeDetails } from "../actions";

// Mocking fetch for getPinCodeDetails
global.fetch = jest.fn();

describe("Server Actions", () => {
  describe("submitRegistration", () => {
    it("should return success for valid data", async () => {
      const validData = {
        aadhaarnumber: "123456789012",
        name: "Test User",
        terms: true,
        organisationtype: "1",
        pannumber: "ABCDE1234F",
        panTerms: true,
        pincode: "110001",
        state: "Delhi",
        city: "New Delhi",
      };
      const result = await submitRegistration(validData);
      expect(result.success).toBe(true);
      expect(result.message).toBe("Registration submitted successfully!");
    });

    it("should return failure for invalid data", async () => {
      const invalidData = {
        aadhaarnumber: "123",
        name: "Test",
        terms: false,
        organisationtype: "1",
        pannumber: "INVALID",
        panTerms: false,
        pincode: "123",
        state: "",
        city: "",
      };
      const result = await submitRegistration(invalidData as any);
      expect(result.success).toBe(false);
      expect(result.message).toBe("Invalid data submitted.");
    });
  });

  describe("getPinCodeDetails", () => {
    beforeEach(() => {
      (fetch as jest.Mock).mockClear();
    });

    it("should return city and state for a valid pincode", async () => {
      const mockSuccessResponse = [
        {
          Status: "Success",
          PostOffice: [
            {
              District: "New Delhi",
              State: "Delhi",
            },
          ],
        },
      ];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuccessResponse,
      });

      const result = await getPinCodeDetails("110001");
      expect(result).toEqual({ city: "New Delhi", state: "Delhi" });
      expect(fetch).toHaveBeenCalledWith(
        "https://api.postalpincode.in/pincode/110001"
      );
    });

    it("should return null for an invalid pincode", async () => {
      const result = await getPinCodeDetails("123");
      expect(result).toBeNull();
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should return null if API returns no success", async () => {
      const mockErrorResponse = [
        {
          Status: "Error",
          Message: "No details found",
        },
      ];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockErrorResponse,
      });
      const result = await getPinCodeDetails("000000");
      expect(result).toBeNull();
    });
  });
});
