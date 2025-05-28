import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base'; 
import * as strings from 'SpFxWebpartSalesToolsWebPartStrings';
import SpFxWebpartSalesTools from "./components/SpFxWebpartSalesTools";
import { ISpFxWebpartSalesToolsProps } from "./components/ISpFxWebpartSalesToolsProps";
 
export interface ISpFxWebpartSalesToolsWebPartProps {
  description: string;
  lp_id: string;
}
 
 
type PropertyPaneFieldValue = string | boolean | number | undefined;
export default class ISpFxWebpartSalesToolsWebPart extends BaseClientSideWebPart<ISpFxWebpartSalesToolsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpFxWebpartSalesToolsProps> =
      React.createElement(SpFxWebpartSalesTools, {
        description: this.properties.description || "Sales Tools & Processes",
        lp_id: this.properties.lp_id,
      });
 
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
 
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: PropertyPaneFieldValue, newValue: PropertyPaneFieldValue): void {
 
    if (propertyPath === "description") {
      this.render();
    }
    if (propertyPath === "backend_app_id") {
      this.onInit().catch(err => console.error(err));
    }
    if (propertyPath === "backend_url") {
      this.onInit().catch(err => console.error(err));
    }
 
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
            {
              groupName: strings.BasicGroupName,
              groupFields: [
              ]
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('lp_id', {
                  label: "Please enter learning path id"
                }),
              ]
            },
 
          ]
        }
      ]
    };
  }
}