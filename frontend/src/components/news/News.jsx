"use client"
import { useEffect } from "react";
import { CountUp } from "countup.js";

const News = () => {
  useEffect(() => {
    const options = {
      duration: 2,
      suffix: '%', // Untuk Audit Score
    };

    const auditScore = new CountUp('auditScore', 80, options);
    if (!auditScore.error) {
      auditScore.start();
    } else {
      console.error(auditScore.error);
    }

    const activeCampaignOptions = {
      duration: 2,
      suffix: '+', // Untuk Active Campaign
    };

    const activeCampaign = new CountUp('activeCampaign', 100, activeCampaignOptions);
    if (!activeCampaign.error) {
      activeCampaign.start();
    } else {
      console.error(activeCampaign.error);
    }

    const userContributedOptions = {
      duration: 2,
      suffix: '+', // Untuk User Contributed
    };

    const userContributed = new CountUp('userContributed', 5000, userContributedOptions);
    if (!userContributed.error) {
      userContributed.start();
    } else {
      console.error(userContributed.error);
    }
  }, []);

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center gap-8 md:gap-20 border-[2px] border-color-neutral rounded-xl p-6 md:p-16">
      <div className="p-3 text-center md:text-left">
        <h1 id="auditScore" className="text-4xl md:text-5xl font-bold">0%</h1>
        <h1 className="text-lg md:text-2xl">Audit Score</h1>
      </div>
      <div className="p-3 text-center md:text-left md:border-l-2  border-gray-400">
        <h1 id="activeCampaign" className="text-4xl md:text-5xl font-bold">0+</h1>
        <h1 className="text-lg md:text-2xl">Active Campaign</h1>
      </div>
      <div className="p-3 text-center md:text-left md:border-l-2 border-gray-400">
        <h1 id="userContributed" className="text-4xl md:text-5xl font-bold">0+</h1>
        <h1 className="text-lg md:text-2xl">User Contributed</h1>
      </div>
    </div>
  );
};

export default News;
