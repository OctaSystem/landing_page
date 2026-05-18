import Hero from '../components/Hero';
import TechStack from '../components/TechStack';
import Services from '../components/Services';
import HowWeWork from "../components/HowWeWork.tsx";

export default function Home() {
    return (
        <>
            <Hero/>
            <HowWeWork/>
            <TechStack/>
            <Services/>
        </>
    );
}