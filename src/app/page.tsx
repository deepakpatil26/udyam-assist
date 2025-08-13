import { UdyamAssistForm } from "@/components/udyam/udyam-assist-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ChevronDown,
  Twitter,
  Facebook,
  Instagram,
  ChevronRight,
  ArrowUp,
  Download,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NavLinks = () => (
  <>
    <li>
      <Button
        variant="link"
        className="text-white p-0 h-auto hover:underline justify-start"
      >
        Home
      </Button>
    </li>
    <li>
      <Button
        variant="link"
        className="text-white p-0 h-auto hover:underline justify-start"
      >
        NIC Code
      </Button>
    </li>
    <li>
      <Button
        variant="link"
        className="text-white p-0 h-auto hover:underline justify-start"
      >
        Useful Documents <ChevronDown className="inline-block h-4 w-4" />
      </Button>
    </li>
    <li>
      <Button
        variant="link"
        className="text-white p-0 h-auto hover:underline justify-start"
      >
        Print / Verify <ChevronDown className="inline-block h-4 w-4" />
      </Button>
    </li>
    <li>
      <Button
        variant="link"
        className="text-white p-0 h-auto hover:underline justify-start"
      >
        Update Details
      </Button>
    </li>
    <li>
      <Button
        variant="link"
        className="text-white p-0 h-auto hover:underline justify-start"
      >
        Login <ChevronDown className="inline-block h-4 w-4" />
      </Button>
    </li>
  </>
);

export default function Home() {
  return (
    <div
      id="top"
      className="min-h-screen w-full bg-background text-sm text-[#333]"
    >
      <header className="bg-[#3f3c6c] py-2 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="https://placehold.co/60x60.png"
                alt="Ashoka Emblem"
                width={40}
                height={40}
                data-ai-hint="ashoka emblem"
              />
              <div>
                <h1 className="text-sm font-bold">
                  सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय
                </h1>
                <p className="text-xs">
                  Ministry of Micro, Small & Medium Enterprises
                </p>
              </div>
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="bg-[#3f3c6c] text-white border-none pt-12 w-3/4"
                >
                  <ul className="flex flex-col items-start gap-y-4 text-lg">
                    <NavLinks />
                  </ul>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <nav className="mt-2 hidden md:block">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <NavLinks />
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-4 flex flex-col items-center px-4 md:px-0">
        <h2 className="text-xl font-medium text-center text-[#3f3c6c]">
          UDYAM REGISTRATION FORM
        </h2>
        <p className="text-sm text-center">
          For New Enterprise who are not Registered yet as MSME and those who
          are registered as EM-II/UAM
        </p>

        <div className="mt-4 w-full max-w-5xl">
          <UdyamAssistForm />
        </div>
        <div className="mt-6 w-full overflow-hidden">
          <div className="inline-block w-full animate-marquee whitespace-nowrap">
            <Button variant="link" className="text-primary">
              Activities (NIC codes) not covered under MSMED Act, 2006 for Udyam
              Registration
            </Button>
          </div>
        </div>
      </main>

      <footer className="mt-8 bg-[#2c2a54] text-white">
        <div className="container mx-auto py-8 px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div>
              <h3 className="font-bold text-lg mb-4">UDYAM REGISTRATION</h3>
              <p className="text-sm">Ministry of MSME</p>
              <p className="text-sm">Udyog bhawan - New Delhi</p>
              <p className="mt-4 text-sm">Email: champions@gov.in</p>
              <p className="mt-4 text-sm font-bold">Contact Us</p>
              <p className="text-sm">For Grievances / Problems</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Our Services</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />{" "}
                  <span>CHAMPIONS</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />{" "}
                  <span>MSME Samadhaan</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />{" "}
                  <span>MSME Sambandh</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />{" "}
                  <span>MSME Dashboard</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />{" "}
                  <span>
                    Entrepreneurship Skill Development Programme (ESDP)
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Video</h3>
              <div className="bg-black border-4 border-gray-500 p-2 rounded-lg max-w-sm">
                <video
                  controls
                  className="w-full h-auto"
                  controlsList="nodownload"
                >
                  <source src="/videos/udyam-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <a
                href="/videos/udyam-video.mp4"
                download="udyam-registration-video.mp4"
              >
                <Button
                  variant="outline"
                  className="mt-2 text-white border-white hover:bg-white hover:text-black"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Video
                </Button>
              </a>
            </div>
            <a href="#top">
              <Button className="absolute -top-4 right-0 h-10 w-10 rounded-sm bg-[#3f3c6c] p-0 text-white shadow-lg hover:bg-[#3f3c6c]/90 hidden md:flex">
                <ArrowUp className="h-6 w-6" />
              </Button>
            </a>
          </div>
        </div>
        <div className="bg-[#1f1d3a] py-4">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 px-4 md:px-0">
            <div className="text-center md:text-left">
              <p>
                © Copyright Udyam Registration. All Rights Reserved, Website
                Content Managed by Ministry of Micro Small and Medium
                Enterprises, GoI
              </p>
              <p>
                Website hosted & managed by National Informatics Centre,
                Ministry of Communications and IT, Government of India
              </p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Twitter className="h-5 w-5" />
              <Facebook className="h-5 w-5" />
              <Instagram className="h-5 w-5" />
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-10">
        <Button className="h-14 w-14 rounded-full bg-blue-600 p-0 text-white shadow-lg hover:bg-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
