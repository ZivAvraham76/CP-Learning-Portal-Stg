import * as React from 'react';
import '../../../../assets/dist/tailwind.css';
import { useEffect, useState } from 'react';

interface IUser {
  Title: string;
}

const Acronyms: React.FC = () => {
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

  const getInitials = (fullName: string): string => {
    const nameParts = fullName.trim().split(/\s+/); // Splits by one or more spaces

    const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
    const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : '';

    return `${firstNameInitial}${lastNameInitial}`;
  };


  return (
    <div className="ml-auto w-9 h-9 rounded-full flex items-center justify-center border-2 borderv-zinc-90 text-xl">
      {currentUser ? getInitials(currentUser.Title) : ''}
    </div>
  );
};

export default Acronyms;