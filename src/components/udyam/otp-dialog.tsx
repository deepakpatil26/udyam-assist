"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface OtpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isConfirming: boolean;
}

export function OtpDialog({
  open,
  onOpenChange,
  onConfirm,
  isConfirming,
}: OtpDialogProps) {
  const [otp, setOtp] = React.useState("");
  const [error, setError] = React.useState("");

  const handleConfirm = () => {
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      setError("");
      onConfirm();
    } else {
      setError("Please enter a valid 6-digit OTP.");
    }
  };

  React.useEffect(() => {
    if (open) {
      setOtp("");
      setError("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogDescription>
            An OTP has been sent to your Aadhaar linked mobile number. Please
            enter it below to proceed.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="otp" className="text-right">
              OTP
            </Label>
            <Input
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              className="col-span-3"
            />
          </div>
          {error && (
            <p className="text-sm text-center text-destructive">{error}</p>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isConfirming}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isConfirming || otp.length !== 6}
          >
            {isConfirming && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Validate OTP
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
