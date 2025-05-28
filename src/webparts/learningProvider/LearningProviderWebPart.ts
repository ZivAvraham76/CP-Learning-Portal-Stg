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
    } catch (error) {
      console.error("Error initalizing API client:", error);
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
