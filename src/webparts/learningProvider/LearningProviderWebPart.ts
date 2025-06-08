import { AadHttpClient } from "@microsoft/sp-http";
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "LearningProviderWebPartStrings";
import LearningProvider from "./components/LearningProvider";
import { ILearningProviderProps } from "./components/ILearningProviderProps";

export interface ILearningProviderWebPartProps {
  description: string;
}

export default class LearningProviderWebPart extends BaseClientSideWebPart<ILearningProviderWebPartProps> {
  private Client: AadHttpClient;
  public render(): void {

    const controlZone = this.domElement.closest('.ControlZone');
    if (controlZone) {
      (controlZone as HTMLElement).style.setProperty('display', 'none', 'important');
    }
    const element: React.ReactElement<ILearningProviderProps> =
      React.createElement(LearningProvider, { Client: this.Client });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    // Executed once when the web part is first initialized in SharePoint.

    try {
      this.Client = await this.context.aadHttpClientFactory.getClient(
        "api://56214ef0-66f7-4e05-b871-eed7a16a7fb8/"
        
      );

      this.fetchUserDepartmentAndRegion();
    } catch (error) {
      console.error("Error initalizing API client:", error);
    }
  }

  // Fetch user department and region from Microsoft Graph
  private async fetchUserDepartmentAndRegion() {

    const graphClient = await this.context.aadHttpClientFactory.getClient("https://graph.microsoft.com");

    try {
      const response = await graphClient.get(
        "https://graph.microsoft.com/beta/me/profile/positions",
        AadHttpClient.configurations.v1
      );

      const userData = await response.json();
      console.log("🔍 User ID:", userData.id);


  
      if (response.ok) {
        const data = await response.json();
        const positions = data.value || [];
        console.log("Full Graph API Response:", JSON.stringify(data, null, 2));
        console.log("Graph Beta API response:", positions);
  
        positions.forEach((position: { detail?: { company?: { department?: string; address?: { state?: string } } } }) => {
          const department = position.detail?.company?.department || "N/A";
          const state = position.detail?.company?.address?.state || "N/A";
          console.log("Position Department:", department);
          console.log("Position State:", state);
        });
      } else {
        console.error("Graph Beta API returned error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching positions info:", error);
    }
  }
  
  
  

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
