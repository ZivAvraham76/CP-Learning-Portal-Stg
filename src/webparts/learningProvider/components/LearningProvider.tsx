import { AadHttpClient } from "@microsoft/sp-http";
import * as React from "react";
import { useEffect } from "react";
import { LearningDataService } from "../../../services/LearningDataService";
import { ListData } from "../../spFxWebpartTechnicalTraining/components/ISpFxWebpartTechnicalTrainingProps";
interface LearningProvider {
  Client: AadHttpClient;
}
interface listOfTrainingData {
  listOfTrainingData: ListData | undefined;
}
 
const LearningProvider: React.FC<LearningProvider> = ({ Client}) => {
  const dataService = LearningDataService.getInstance();
 
  useEffect(() => {
    console.log("Provider listening for requests");
 
    const handleDataRequest = async (endpoint: string,  options?: listOfTrainingData) :Promise<void> => {
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

    dataService.emit("ready");
    dataService.emit("ready");
 
    // Cleanup listener on unmount
    return () => {
      console.log("Provider stopped listening for requests");
      dataService.off("requestData", handleDataRequest);
    };
  }, []);
 
  return (
    null
  );
};
 
export default LearningProvider;