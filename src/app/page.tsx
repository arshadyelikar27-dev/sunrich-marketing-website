import { Navbar }             from "@/components/layout/Navbar";
import { Footer }             from "@/components/layout/Footer";
import { HeroSection }        from "@/components/sections/HeroSection";
import { ProblemSection }     from "@/components/sections/ProblemSection";
import { ProductSection }     from "@/components/sections/ProductSection";
import { FeaturesSection }    from "@/components/sections/FeaturesSection";
import { LifestyleSection }   from "@/components/sections/LifestyleSection";
import { QualitySection }     from "@/components/sections/QualitySection";
import { TestimonialsSection} from "@/components/sections/TestimonialsSection";
import { CTASection }         from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <ProductSection />
        <FeaturesSection />
        <LifestyleSection />
        <QualitySection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
