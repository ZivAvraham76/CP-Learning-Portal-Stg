import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'SpFxWebpartTechnicalTrainingWebPartStrings';
import SpFxWebpartTechnicalTraining from './components/SpFxWebpartTechnicalTraining';
import { ISpFxWebpartTechnicalTrainingProps } from './components/ISpFxWebpartTechnicalTrainingProps';
import { ListData } from './components/ISpFxWebpartTechnicalTrainingProps';

export interface ISpFxWebpartTechnicalTrainingWebPartProps {
  description: string;
  type: string;
}

export default class SpFxWebpartTechnicalTrainingWebPart extends BaseClientSideWebPart<ISpFxWebpartTechnicalTrainingWebPartProps> {

  // Function to fetch data from SharePoint list and return it to the server
  private fetchListData = async (): Promise<ListData | undefined> => {
    const siteName = `https://mosh12.sharepoint.com/sites/CPLearningPortalStg`;
    const listName = 'Technical Training Data';
    try {
      const response = await fetch(`${siteName}/_api/web/lists/getbytitle('${listName}')/items`, {
        method: "GET",
        headers: {
          "Accept": "application/json;odata=nometadata",
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching list data: ${response.statusText}`);
      }

      const data: ListData = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching list data:", error);
    }
    return undefined;
  };

  public render(): void {
    const element: React.ReactElement<ISpFxWebpartTechnicalTrainingProps> = React.createElement(
      SpFxWebpartTechnicalTraining,
      {
        description: this.properties.description || "Technical Training",
        type: this.properties.type,
        fetchListData: this.fetchListData,
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then((message) => {
    });
  }


  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app
        .getContext()
        .then((context) => {
          let environmentMessage: string = "";
          switch (context.app.host.name) {
            case "Office": // running in Office
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case "Outlook": // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case "Teams": // running in Teams
            case "TeamsModern":
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            
          ]
        }
      ]
    };
  }
}