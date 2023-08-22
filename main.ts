import fs from "fs";
import path from "path";
import { getScoreData } from "./lib/getScoreData";
import { DDClient } from "./lib/ddClient";

interface Metrics {
  [metric: string]: number;
}

interface APIClient {
  sendMetrics: (metrics: Metrics) => void;
}

// Output directory of lighthouse ci result
const directoryPath = path.join(__dirname, ".lighthouseci");
const jsonFileRegExp = /lhr.*\.json/;

const main = (client: APIClient) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(err);
      process.exitCode = 1;
      return;
    }

    files
      .filter((file) => jsonFileRegExp.test(file))
      .map((file) => {
        const data = JSON.parse(
          fs.readFileSync(path.join(directoryPath, file), "utf-8")
        );
        const metrics = getScoreData(data);
        // Datadogにメトリクスを送信
        client.sendMetrics(metrics);
      });
  });
};

const [_0, _1, ...option] = process.argv;
const dryRun = option.includes("-d");
const client = new DDClient(dryRun);
main(client);
