import { Navbar } from "@/lib/navbar";
import { CashFlowComparison } from "./landingPageComponents/cash-flow camparison section";
import { HowItWorks } from "./landingPageComponents/how it works";
import { GreedyAlgorithmFeature } from "./landingPageComponents/greedy algorithm";
import { FlexibleSplitsFeature } from "./landingPageComponents/expense split feature";
import { SettlementEngineFeature } from "./landingPageComponents/suggestion settlement feature";
import { WhyBetterFeatures } from "./landingPageComponents/why it better feature";
import { Footer } from "./landingPageComponents/footer";
import { Hero } from "./landingPageComponents/HeroSection";


export default function LandingPage() {
  return (
    <>
    <Navbar />
    <Hero />
    <CashFlowComparison />
    <HowItWorks />
    <GreedyAlgorithmFeature />
    <FlexibleSplitsFeature />
    <SettlementEngineFeature />
    <WhyBetterFeatures />
    <Footer />
    </>
  )
}