// src/services/LearningDataService.ts
import { EventEmitter } from "events";
import { AadHttpClient, HttpClientResponse } from "@microsoft/sp-http";
import { ListData } from "../webparts/spFxWebpartTechnicalTraining/components/ISpFxWebpartTechnicalTrainingProps";

declare global {
  interface Window {
    LearningDataServiceInstance: LearningDataService;
  }
}

export class LearningDataService extends EventEmitter {

  // Private constructor to prevent instantiation
  private constructor() {
    super();
  }
  // Singleton instance
  public static getInstance(): LearningDataService {
    if (!window.LearningDataServiceInstance) {
      console.log("Creating global instance of LearningDataService");
      window.LearningDataServiceInstance = new LearningDataService();
    } else {
      console.log("Reusing global instance of LearningDataService");
    }
    return window.LearningDataServiceInstance;
  }
  // A method to save user's data to localStorage 
  private saveTrainingDataToCache(data: any, storageKey: string): void {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error caching training data:', error);
    }
  }

  // A method to retrieve user's data from localStorage
  private getCachedTrainingData(storageKey: string): { data: any } | null {
    try {
      const cacheTrainingDataItem = localStorage.getItem(storageKey);
      //prevents parsing null
      if (!cacheTrainingDataItem) {
        return null;
      }
      const parsedTrainingData: any = JSON.parse(cacheTrainingDataItem);
      return { data: parsedTrainingData };

    } catch (error) {
      console.error('Error retrieving cached training data:', error);
      return null;
    }
  }

  // Fetch data and cache it
  public async fetchData(
    Client: AadHttpClient,
    endpoint: string,
    listOfTrainingData: ListData | undefined = undefined,
    forceRefresh: boolean = false
  ): Promise<any> {
    try {
      const fullUrl = `https://sales-onboard-stg.checkpoint.com/${endpoint}`;
      let data: any;
      //If the endpoint is for Technical Training Data, we create a POST request
      if (endpoint === "sp-data/4sp") {

        // Check if data is already cached
        const cachedTrainingData = this.getCachedTrainingData("TechnicalTrainingCache");
        if (cachedTrainingData) {
          data = cachedTrainingData.data;
          this.emit(endpoint, data);
        }
        // Create a POST request to the API
        const postResponse: HttpClientResponse = await Client.post(
          fullUrl,
          AadHttpClient.configurations.v1,
          {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(listOfTrainingData?.value)
          }
        );

        if (!postResponse.ok) {
          throw new Error(`API POST error: ${postResponse.statusText}`);
        }

        data = await postResponse.json();
        this.saveTrainingDataToCache(data, "TechnicalTrainingCache");
        // Emit the event with the data for smother UI
        this.emit(endpoint, data);
        return data;
      }
      else {  //For TechnicalTraining Popup, Sales Tools and Onboarding, we create a GET request

        // Check if data is already cached
        const cachedTrainingData = this.getCachedTrainingData(endpoint);
        if (cachedTrainingData) {
          data = cachedTrainingData.data;
          this.emit(endpoint, data);
        }
        // Create a GET request to the API
        const getResponse: HttpClientResponse = await Client.get(
          fullUrl,
          AadHttpClient.configurations.v1
        );
        if (!getResponse.ok) {
          throw new Error(`API GET error: ${getResponse.statusText}`);
        }

        data = await getResponse.json();
        this.saveTrainingDataToCache(data, endpoint);
        // Emit the event with the data for smother UI
        this.emit(endpoint, data);
        return data;
      }
    } catch (error) {
      console.error("Error fetching training data:", error);
    }
  }
}
