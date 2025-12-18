import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { Categories } from "@/components/home/Categories";
import { Stats } from "@/components/home/Stats";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { CallToAction } from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Stats />
      <FeaturedCourses />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </>
  );
}
