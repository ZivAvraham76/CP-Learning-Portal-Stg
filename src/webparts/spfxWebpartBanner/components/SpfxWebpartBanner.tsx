import * as React from 'react';
import type { ISpfxWebpartBannerProps } from './ISpfxWebpartBannerProps';
import '../../../../assets/dist/tailwind.css';
import { useState, useEffect } from 'react';

interface IListItem {
  Id: number;
  Title: string;
  banner_text: string;
  Attachments: boolean;
  AttachmentFiles: { ServerRelativeUrl: string }[];
  Active: boolean;
}

interface IUser {
  Title: string;
}

const SpfxWebpartBanner: React.FC<ISpfxWebpartBannerProps> = (props) => {

  
  const [listItems, setListItems] = React.useState<IListItem[]>([]);
  // State to track the current index of the active item
  const [currentIndex, setCurrentIndex] = React.useState(0);
  currentIndex; 
  // Filtration for active items
  const activeItems = listItems.filter(item => item.Active);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    // Fetch the current user
    const fetchCurrentUser = async (): Promise<void> => {
      const siteUrl = "https://mosh12.sharepoint.com";
  
      try {
        const response = await fetch(`${siteUrl}/_api/web/currentuser`, {
          method: "GET",
          headers: {
            "Accept": "application/json;odata=nometadata"
          }
        });
  
        const data = await response.json();
        setCurrentUser(data);
  
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    
    useEffect(() => {
      // eslint-disable-next-line no-void
      void fetchCurrentUser();
    }, []);
    const getFirstName = (fullName: string): string => {
      const nameParts = fullName.trim().split(/\s+/); // Splits by one or more spaces
      return nameParts[0] || ''; // Returns the first part (first name)
    };

  // fetch the list and its attachments
  React.useEffect(() => {
    const fetchListData = async (): Promise<void> => {
      const currSite = `https://mosh12.sharepoint.com/sites/CPLearningPortalStg`;
      const currList = "banner_photos";
      try {
        const response = await fetch(`${currSite}/_api/web/lists/getbytitle('${currList}')/items`, {
          method: "GET",
          headers: {
            "Accept": "application/json;odata=nometadata"
          }
        });

        const data = await response.json();

        if (data.value) {    
          const updatedItems = await Promise.all(data.value.map(async (item: IListItem) => {
            let attachmentFiles = item.AttachmentFiles || [];
            if (item.Attachments) {
              const attachmentResponse = await fetch(`${currSite}/_api/web/lists/getbytitle('${currList}')/items(${item.Id})/AttachmentFiles`, {
                method: "GET",
                headers: {
                  "Accept": "application/json;odata=nometadata"
                }
              });
              const attachmentData = await attachmentResponse.json();
              if (attachmentData.value && attachmentData.value.length > 0) {
                attachmentFiles = attachmentData.value;
              }
            }
            return{
              ...item,
              AttachmentFiles: attachmentFiles
            }
          }));
          setListItems(updatedItems);
        }
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };

    // eslint-disable-next-line no-void
    void fetchListData();
  }, []);

  // next image every x minutes
  React.useEffect(() => {
    if (activeItems.length === 0) return;

    // If there's only one active item, no need for the interval logic
    if (activeItems.length === 1) {
      setCurrentIndex(0); // Display the single active item
      return;
    }

    // If there are multiple active items, we proceed with the usual logic for changing the image
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activeItems.length); 
    }, 1000 * 5);

    return () => clearInterval(interval); 
  }, [listItems, 5]);
  return (
    <div className="relative w-[1051px]  mx-auto p-8">
      {/* Hello text positioned outside/above the banner */}
      <div className="mb-4">
        <div className="text-stone-700 text-xl font-semibold font-Poppins">
          Hello {currentUser ? getFirstName(currentUser.Title) : ''},
        </div>
      </div>
      
      {/* Main banner container */}
      <div className="w-full h-36 bg-gradient-to-r from-white rounded-3xl border border-zinc-800 flex items-center justify-center">
        <div className="text-center text-stone-700 text-4xl font-bold font-Poppins">
          Let's learn something new!
        </div>
      </div>
    </div>
  );
};

export default SpfxWebpartBanner;
