import { Suspense } from "react";
import PrimaryHero from "@/components/Home/PrimaryHero";
import SecondaryHero from "@/components/Home/SecondaryHero";
import clientPromise from "@/lib/mongodb";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getHeroControlSettings() {
  try {
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    const heroControl = await db.collection("heroControl").findOne({ id: "main" });
    
    return heroControl || { 
      primaryHeroVisible: true, 
      secondaryHeroVisible: true,
      primaryHeroOrder: 1,
      secondaryHeroOrder: 2
    };
  } catch (error) {
    console.error("Error fetching hero control settings:", error);
    // Default fallback if there's an error
    return { 
      primaryHeroVisible: true, 
      secondaryHeroVisible: true,
      primaryHeroOrder: 1,
      secondaryHeroOrder: 2
    };
  }
}

export default async function Home() {
  const heroSettings = await getHeroControlSettings();
  
  // Create an array of hero components based on their order
  const heroComponents = [];
  
  if (heroSettings.primaryHeroVisible) {
    heroComponents[heroSettings.primaryHeroOrder - 1] = (
      <Suspense fallback={<div className="h-screen animate-pulse bg-muted/20"></div>}>
        <PrimaryHero />
      </Suspense>
    );
  }
  
  if (heroSettings.secondaryHeroVisible) {
    heroComponents[heroSettings.secondaryHeroOrder - 1] = (
      <Suspense fallback={<div className="h-screen animate-pulse bg-muted/20"></div>}>
        <SecondaryHero />
      </Suspense>
    );
  }
  
  // Filter out any null entries (in case there are gaps in the order)
  const filteredHeroComponents = heroComponents.filter(Boolean);
  
  return (
    <main>
      {/* Render hero sections based on visibility and order */}
      {filteredHeroComponents.length > 0 ? (
        filteredHeroComponents.map((component, index) => (
          <div key={index}>{component}</div>
        ))
      ) : (
        // Show a placeholder with option to restore hero sections when both are hidden
        <div className="py-20 flex flex-col items-center justify-center bg-muted/10">
          <h2 className="text-2xl font-bold mb-4">Hero Sections Hidden</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            All hero sections are currently hidden. Visit the admin panel to make them visible again.
          </p>
          <Link href="/admin/hero-control">
            <Button variant="outline">
              Manage Hero Sections
            </Button>
          </Link>
        </div>
      )}
      
      {/* Rest of your page content */}
      {/* ... */}
    </main>
  );
}
