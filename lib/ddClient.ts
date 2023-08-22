interface Metrics {
  [metric: string]: number;
}

export class DDClient {
  private apiUrl: string;
  private dryRun: boolean;

  constructor(dryRun: boolean) {
    this.dryRun = dryRun;
    this.apiUrl = this.getApiUrl();
  }

  async sendMetrics(data: Metrics) {
    // https://docs.datadoghq.com/ja/api/latest/metrics/#submit-metrics
    const requestBody = JSON.stringify({
      series: Object.entries(data).map(([metric, value]) => ({
        metric,
        points: [[`${Math.floor(Date.now() / 1000)}`, value]],
        tags: ["source:lighthouse_ci"],
        type: "gauge",
      })),
    });

    this.post(requestBody);
  }

  private getApiUrl() {
    const apiKey = process.env.DD_API_KEY;
    if (apiKey === undefined && !this.dryRun) {
      throw new Error("env: DD_API_KEY is not set.");
    }
    return `https://api.datadoghq.com/api/v1/series?api_key=${apiKey}`;
  }

  private async post(body: string) {
    const func = this.dryRun ? console.log : fetch;
    return func(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  }
}
