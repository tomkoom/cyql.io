// https://github.com/id-daniel-mccoy/burn-calc
import { useState, useEffect } from "react";
import * as cyclesIDL from "../../../idl/cycles/cycles";
import { HttpAgent, Actor } from "@dfinity/agent";

const useIcpBurnCalc = () => {
  const [icpBurnTime, setIcpBurnTime] = useState({ minutes: "", seconds: "" });
  const [secToBurn, setSecToBurn] = useState();
  const [minToBurn, setMinToBurn] = useState();

  const agent = new HttpAgent({
    host: "https://ic0.app",
  });

  const calculateSecondsToBurnICP = async () => {
    const conversionRate = await getConversionRate();
    const burnRate = await getBurnRate();
    if (!burnRate) {
      console.log("Can't get burn rate.");
      return;
    }
    const secondsToBurnICP = conversionRate / burnRate;
    const minutesToBurnICP = Number((secondsToBurnICP / 60).toFixed(2));
    const minutesRemainderDecimal = Number((minutesToBurnICP % 1).toFixed(2));
    const decimalToSeconds = Number((minutesRemainderDecimal * 60).toFixed(0)).toString();
    const minutesToBurnICPFormatted = minutesToBurnICP.toString().split(".")[0];

    console.log(minutesToBurnICPFormatted, typeof minutesToBurnICPFormatted);
    console.log(decimalToSeconds, typeof decimalToSeconds);

    setSecToBurn(decimalToSeconds);
    setMinToBurn(minutesToBurnICPFormatted);
  };

  const getBurnRate = async () => {
    const burnRateAPI = "https://ic-api.internetcomputer.org/api/v3/metrics/cycle-burn-rate";
    function httpGet(url) {
      let xmlHttpReq = new XMLHttpRequest();
      xmlHttpReq.open("GET", url, false);
      xmlHttpReq.send(null);
      return xmlHttpReq.responseText;
    }
    const result = httpGet(burnRateAPI);
    const jsonResponse = JSON.parse(result);
    const finalResponse = Number(jsonResponse.cycle_burn_rate[0][1]).toFixed(0);
    return Number(finalResponse);
  };

  const getConversionRate = async () => {
    const mainnetCyclesCanister = "rkp4c-7iaaa-aaaaa-aaaca-cai";
    const cyclesMintingActor = Actor.createActor(cyclesIDL.idlFactory, {
      agent: agent,
      canisterId: mainnetCyclesCanister,
    });
    const conversionRate = await cyclesMintingActor.get_icp_xdr_conversion_rate();
    const actualRate = conversionRate.data.xdr_permyriad_per_icp.toString();
    const requiredZeros = "00000000";
    const finalRate = Number(actualRate + requiredZeros);
    return finalRate;
  };

  useEffect(() => {
    calculateSecondsToBurnICP();
    const interval = setInterval(() => {
      calculateSecondsToBurnICP();
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return [minToBurn, secToBurn];
};

export default useIcpBurnCalc;
