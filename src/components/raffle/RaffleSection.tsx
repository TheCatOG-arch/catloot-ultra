import { useState } from "react";
import { GameType, configLinks, gameDisplayNames } from "@/lib/config";
import { TabContent } from "./TabContent";
import { cn } from "@/lib/utils";

export function RaffleSection() {
  const [activeTab, setActiveTab] = useState<GameType>("freeFire");

  const tabs: { id: GameType; name: string; activeColor: string }[] = [
    { id: "freeFire", name: gameDisplayNames.freeFire, activeColor: "#FF4500" },
    { id: "roblox", name: gameDisplayNames.roblox, activeColor: "#00BFFF" },
    { id: "fortnite", name: gameDisplayNames.fortnite, activeColor: "#9400D3" },
  ];

  return (
    <section className="py-16 relative z-10" id="raffle">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-6 py-3 md:px-8 md:py-4 rounded-xl font-display font-bold text-sm md:text-lg transition-all duration-300",
                  isActive
                    ? "bg-card text-foreground"
                    : "bg-background border border-border text-muted-foreground hover:bg-card hover:border-primary/50"
                )}
                style={{
                  border: isActive ? `2px solid ${tab.activeColor}` : undefined,
                  boxShadow: isActive
                    ? `0 0 20px ${tab.activeColor}4D, inset 0 0 10px ${tab.activeColor}1A`
                    : undefined,
                  background: isActive ? `${tab.activeColor}1A` : undefined,
                }}
              >
                {tab.name.toUpperCase()}
              </button>
            );
          })}
        </div>

        <div className="min-h-[500px]">
          <TabContent
            key={activeTab}
            game={activeTab}
            links={configLinks[activeTab]}
          />
        </div>
      </div>
    </section>
  );
}
