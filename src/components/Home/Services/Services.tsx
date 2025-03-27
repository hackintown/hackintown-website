import ServicesCard from "@/components/ui/ServicesCard";
import { homeServicesData } from "./constant";

export default function Services() {
    return (
        <div className="py-12">
            <ServicesCard {...homeServicesData} />
        </div>
    );
}   

