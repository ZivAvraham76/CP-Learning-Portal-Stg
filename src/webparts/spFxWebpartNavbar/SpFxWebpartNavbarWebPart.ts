import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SpFxWebpartNavbarWebPartStrings';
import SpFxWebpartNavbar from './components/SpFxWebpartNavbar';
import { ISpFxWebpartNavbarProps, ListData } from './components/ISpFxWebpartNavbarProps';
import { Item } from './components/ISpFxWebpartNavbarProps';

export interface ISpFxWebpartNavbarWebPartProps {
  description: string;

}

export default class SpFxWebpartNavbarWebPart extends BaseClientSideWebPart<ISpFxWebpartNavbarWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private servicesList: Item[];
  private categoriesList: Item[];

  public render(): void {
    const element: React.ReactElement<ISpFxWebpartNavbarProps> = React.createElement(
      SpFxWebpartNavbar,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        servicesList: this.servicesList,
        categoriesList: this.categoriesList

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(async message => {
      this._environmentMessage = message;
      const siteName = "CPLearningPortalStg";

  const [servicesData, categoriesData] = await Promise.all([
    this.fetchListData("Services", siteName),
    this.fetchListData("Categories", siteName, ),
  ]);

  this.servicesList = servicesData?.value || [];
  this.categoriesList = categoriesData?.value || [];


  this.render(); 

    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected fetchListData = async (listName: string, siteName: string): Promise<ListData | undefined> => {
    const currSite = `https://mosh12.sharepoint.com/sites/${siteName}`;
    const currList = listName;
    try {
      const response = await fetch(`${currSite}/_api/web/lists/getbytitle('${currList}')/items`, {
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

