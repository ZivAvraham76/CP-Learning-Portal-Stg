import { AadHttpClient } from "@microsoft/sp-http";
import * as React from "react";
import { useEffect } from "react";
import { LearningDataService } from "../../../services/LearningDataService";
 
interface LearningProvider {
  Client: AadHttpClient;
}
 
const LearningProvider: React.FC<LearningProvider> = ({ Client }) => {
  const dataService = LearningDataService.getInstance();
 
  useEffect(() => {
    console.log("Provider listening for requests");
 
    const handleDataRequest = async (endpoint: string,  options?: any) => {
      console.log(`Provider received a request for:${endpoint}`);
      try {
        const data = await dataService.fetchData(Client, endpoint,  options?.listOfTrainingData);
        console.log("Provider fetched data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
 
    // Listen for requests from consumers
    dataService.on(`requestData`, handleDataRequest);

    dataService.emit("ready")
 
    // Cleanup listener on unmount
    return () => {
      console.log("Provider stopped listening for requests");
      dataService.off("requestData", handleDataRequest);
    };
  }, []);
 
  return (
    <div>
      <h2 className="text-white">Learning Data Provider (Functional Component)</h2>
      <p className="text-white">Listening for data requests...</p>
    </div>
  );
};
 
export default LearningProvider;