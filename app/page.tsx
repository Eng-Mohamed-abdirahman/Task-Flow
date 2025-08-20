import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <div
      className="
    min-h-screen w-full
    bg-gradient-to-br from-primary/10 via-teal-50 to-purple-100
    dark:bg-gradient-to-br dark:from-[#18181b] dark:via-[#232336] dark:to-[#232336]
    relative
  "
    >
      {/* Top Fade Grid Background */}
      <div
        className="absolute inset-0 z-0"
        
      />
      <HeroSection />
    </div>
  );
}
