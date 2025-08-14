"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Accessibility,
  Type,
  Link as LinkIcon,
  EyeOff,
  MousePointer2,
  RefreshCcw,
  Sun,
  Moon,
  Text,
  CaseSensitive,
  Pilcrow,
  Eraser,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { textToSpeech } from "@/ai/flows/tts-flow";
import { useToast } from "@/hooks/use-toast";

// Import the reset styles
import "./accessibility-reset.css";

type AccessibilityOptions = {
  textSize: number;
  textSpacing: number;
  lineHeight: number;
  dyslexiaFriendly: boolean;
  highlightLinks: boolean;
  hideImages: boolean;
  bigCursor: boolean;
};

const AccessibilityOptionButton = ({
  icon: Icon,
  label,
  onClick,
  isActive,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}) => (
  <Button
    variant="outline"
    className={cn(
      "accessibility-option-button",
      isActive && "accessibility-option-active"
    )}
    onClick={onClick}
  >
    <Icon className="accessibility-option-icon" />
    <span className="accessibility-option-label">{label}</span>
  </Button>
);

export function AccessibilityWidget() {
  const { theme, setTheme } = useTheme();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const { toast } = useToast();

  const [options, setOptions] = React.useState<AccessibilityOptions>(() => {
    if (typeof window !== "undefined") {
      const savedOptions = localStorage.getItem("accessibilityOptions");
      return savedOptions
        ? JSON.parse(savedOptions)
        : {
            textSize: 0,
            textSpacing: 0,
            lineHeight: 0,
            dyslexiaFriendly: false,
            highlightLinks: false,
            hideImages: false,
            bigCursor: false,
          };
    }
    return {
      textSize: 0,
      textSpacing: 0,
      lineHeight: 0,
      dyslexiaFriendly: false,
      highlightLinks: false,
      hideImages: false,
      bigCursor: false,
    };
  });

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const cycleOption = (
    option: keyof Pick<
      AccessibilityOptions,
      "textSize" | "textSpacing" | "lineHeight"
    >
  ) => {
    setOptions((prev) => ({
      ...prev,
      [option]: (prev[option] + 1) % 4 === 0 ? 0 : (prev[option] + 1) % 4,
    }));
  };

  const toggleOption = (
    option: keyof Pick<
      AccessibilityOptions,
      "dyslexiaFriendly" | "highlightLinks" | "hideImages" | "bigCursor"
    >
  ) => {
    setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const resetSettings = () => {
    setOptions({
      textSize: 0,
      textSpacing: 0,
      lineHeight: 0,
      dyslexiaFriendly: false,
      highlightLinks: false,
      hideImages: false,
      bigCursor: false,
    });
    setTheme("light");
    localStorage.removeItem("accessibilityOptions");
  };

  const handleTextToSpeech = async () => {
    if (isSpeaking) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      return;
    }

    try {
      setIsSpeaking(true);
      const pageText = document.body.innerText;

      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(pageText);
        utterance.onend = () => {
          setIsSpeaking(false);
          window.speechSynthesis.cancel();
        };
        utterance.onerror = (event) => {
          console.error("SpeechSynthesis error:", event);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not read text aloud. Please try again.",
          });
          setIsSpeaking(false);
        };
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      } else {
        const audioData = await textToSpeech(pageText);
        const audio = new Audio(audioData);
        audioRef.current = audio;
        audio.play().catch((error) => {
          console.error("Audio playback failed:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description:
              "Please interact with the page first to enable audio playback.",
          });
          setIsSpeaking(false);
        });
        audio.onended = () => {
          setIsSpeaking(false);
          audioRef.current = null;
        };
        audio.onerror = () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to play audio.",
          });
          setIsSpeaking(false);
          audioRef.current = null;
        };
      }
    } catch (error) {
      console.error("Text-to-speech failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not process text-to-speech. Please try again.",
      });
      setIsSpeaking(false);
    }
  };

  // Apply accessibility options
  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Text size
    html.classList.remove("text-size-1", "text-size-2", "text-size-3");
    if (options.textSize > 0) {
      html.classList.add(`text-size-${options.textSize}`);
    }

    // Text spacing
    html.classList.remove("text-spacing-1", "text-spacing-2", "text-spacing-3");
    if (options.textSpacing > 0) {
      html.classList.add(`text-spacing-${options.textSpacing}`);
    }

    // Line height
    const lineHeights = [2.0, 3.0, 4.0, 5.0];
    const lineHeightValue = lineHeights[options.lineHeight];
    html.style.setProperty("--accessibility-line-height", `${lineHeightValue}`);

    // Other toggles
    html.classList.toggle("accessibility-dyslexia", options.dyslexiaFriendly);
    html.classList.toggle(
      "accessibility-highlight-links",
      options.highlightLinks
    );
    html.classList.toggle("accessibility-hide-images", options.hideImages);
    html.classList.toggle("accessibility-big-cursor", options.bigCursor);

    // Save to localStorage
    localStorage.setItem("accessibilityOptions", JSON.stringify(options));
  }, [options]);

  // Clean up effects on unmount
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const accessibilityActions = [
    {
      icon: isSpeaking ? Loader2 : Text,
      label: isSpeaking ? "Speaking..." : "Text To Speech",
      onClick: handleTextToSpeech,
      isActive: isSpeaking,
    },
    {
      icon: CaseSensitive,
      label: "Bigger Text",
      onClick: () => cycleOption("textSize"),
      isActive: options.textSize > 0,
    },
    {
      icon: Type,
      label: "Text Spacing",
      onClick: () => cycleOption("textSpacing"),
      isActive: options.textSpacing > 0,
    },
    {
      icon: Pilcrow,
      label: "Line Height",
      onClick: () => cycleOption("lineHeight"),
      isActive: options.lineHeight > 0,
    },
    {
      icon: LinkIcon,
      label: "Highlight Links",
      onClick: () => toggleOption("highlightLinks"),
      isActive: options.highlightLinks,
    },
    {
      icon: Eraser,
      label: "Dyslexia Friendly",
      onClick: () => toggleOption("dyslexiaFriendly"),
      isActive: options.dyslexiaFriendly,
    },
    {
      icon: EyeOff,
      label: "Hide Images",
      onClick: () => toggleOption("hideImages"),
      isActive: options.hideImages,
    },
    {
      icon: MousePointer2,
      label: "Big Cursor",
      onClick: () => toggleOption("bigCursor"),
      isActive: options.bigCursor,
    },
    {
      icon: theme === "light" ? Moon : Sun,
      label: theme === "light" ? "Dark Mode" : "Light Mode",
      onClick: toggleTheme,
      isActive: theme === "dark",
    },
  ];

  return (
    <div className="accessibility-widget-container">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="accessibility-trigger"
            aria-label="Accessibility settings"
          >
            <Accessibility className="accessibility-icon" />
          </Button>
        </SheetTrigger>
        <SheetContent className="accessibility-sheet">
          <SheetHeader>
            <SheetTitle className="accessibility-sheet-title">
              Accessibility Options
            </SheetTitle>
          </SheetHeader>
          <div className="accessibility-options-grid">
            {accessibilityActions.map((action) => (
              <AccessibilityOptionButton
                key={action.label}
                icon={action.icon}
                label={action.label}
                onClick={action.onClick}
                isActive={action.isActive}
              />
            ))}
          </div>
          <div className="accessibility-reset-container">
            <Button
              onClick={resetSettings}
              variant="outline"
              className="accessibility-reset-button"
            >
              <RefreshCcw className="accessibility-reset-icon" />
              Reset All Settings
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
