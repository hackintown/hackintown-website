import React from "react";
import { ProcessData } from "./constant";
import Image from "next/image";
import TextWithLines from "../TextWithLines";

const OurProcess = () => {
    return (
        <div className="py-12 lg:pb-20 xl:pb-24">
            <div className="container px-4">
                <div className="flex flex-col justify-center items-center mb-10">
                    <TextWithLines
                        text="OUR PROCESS"
                        className="mb-4"
                    />
                    <h2 className="title">
                        OUR&nbsp;
                        <span className="text-primary">PROCESS</span>
                    </h2>
                    <p className="sub-title">
                        We have worked with startups as well as established companies in
                        diverse sectors of the economy.
                    </p>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-6">
                    {ProcessData.map((item, index) => (
                        <div key={index} className="relative md:mb-0">
                            <div
                                className={`max-w-[236px] w-full h-[272px] bg-card hover:bg-card/90 transition-colors flex items-center justify-center border border-border`}
                                style={{ clipPath: item.shape }}
                            >
                                <div className="flex flex-col space-y-2 items-center justify-center p-6">
                                    <div className="bg-primary/10 p-3 rounded-lg">
                                        <Image
                                            src={item.icon}
                                            width={28}
                                            height={28}
                                            alt="process-icon"
                                            className="w-7 h-7 text-primary"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-base mb-0 text-center text-foreground">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs xl:text-sm text-center text-muted-foreground leading-tight">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurProcess;