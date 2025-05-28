import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SpFxWebpartOnboardingWebPartStrings';
import SpFxWebpartOnboarding from './components/SpFxWebpartOnboarding';
import { ISpFxWebpartOnboardingProps } from './components/ISpFxWebpartOnboardingProps';

export interface ISpFxWebpartOnboardingWebPartProps {
  description: string;
  onboardingId: string;
}

export default class SpFxWebpartOnboardingWebPart extends BaseClientSideWebPart<ISpFxWebpartOnboardingWebPartProps> {
  private onboardingId: string;


  public async render(): Promise<void> {
    await this.getUserOnboardingId()
      .then(onboardingId => {
        if (!onboardingId) {
          this.domElement.innerHTML = `<p>User not found in onboarding list</p>`;
          return;
        }
        this.onboardingId = onboardingId;
      });

    const element: React.ReactElement<ISpFxWebpartOnboardingProps> = React.createElement(
      SpFxWebpartOnboarding,
      {
        description: this.properties.description,
        onboardingId: this.onboardingId,
      }
    );
    ReactDom.render(element, this.domElement);
  }

  private async getUserOnboardingId(): Promise<string | null> {
    const siteUrl = `https://mosh12.sharepoint.com/sites/CPLearningPortalStg`;

    try {
      const userRes = await fetch(`${siteUrl}/_api/web/currentuser`, {
        method: "GET",
        headers: { "Accept": "application/json;odata=nometadata" }
      });
      const currentUser = await userRes.json();

      const listRes = await fetch(`${siteUrl}/_api/web/lists/getbytitle('New Hires assigned')/items?$top=5000`, {
        method: "GET",
        headers: { "Accept": "application/json;odata=nometadata" }
      });
      const list = await listRes.json();

      const matched = list.value.find((item: any) => {
        if (!currentUser?.UserPrincipalName || !item.Email) return false;
        const userPrefix = currentUser.UserPrincipalName.split('@')[0].toLowerCase();
        const itemPrefix = item.Email.split('@')[0].toLowerCase();
        return userPrefix === itemPrefix;
      });

      return matched?.OnboardingId || null;

    } catch (error) {
      console.error("Error checking onboarding list:", error);
      return null;
    }
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

  protected onPropertyPaneFieldChanged(propertyPath: string): void {
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

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;

    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty("--bodyText", semanticColors.bodyText || null);
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty("--linkHovered", semanticColors.linkHovered || null);
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
            description: strings.PropertyPaneDescription
          },
          groups: [
          ]
        }
      ]
    };
  }
}
