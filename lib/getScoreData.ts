type Metrics = {
  "lighthouse.fcp": number;
  "lighthouse.lcp": number;
  "lighthouse.si": number;
  "lighthouse.tti": number;
  "lighthouse.tbt": number;
  "lighthouse.cls": number;
  "lighthouse.fid": number;
  "lighthouse.initialResponse": number;
};

export const getScoreData = (data: any): Metrics => {
  const {
    "first-contentful-paint": fcp,
    "largest-contentful-paint": lcp,
    "speed-index": si,
    interactive: tti,
    "total-blocking-time": tbt,
    "cumulative-layout-shift": cls,
    "max-potential-fid": fid,
    "server-response-time": initialResponse,
  } = data.audits;

  return {
    "lighthouse.fcp": Math.round(fcp.numericValue),
    "lighthouse.lcp": Math.round(lcp.numericValue),
    "lighthouse.si": Math.round(si.numericValue),
    "lighthouse.tti": Math.round(tti.numericValue),
    "lighthouse.tbt": Math.round(tbt.numericValue),
    "lighthouse.cls": Math.round(cls.numericValue),
    "lighthouse.fid": Math.round(fid.numericValue),
    "lighthouse.initialResponse": Math.round(initialResponse.numericValue),
  };
};
