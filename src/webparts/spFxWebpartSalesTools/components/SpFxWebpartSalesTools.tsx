import * as React from "react";
import { LearningDataService } from "../../../services/LearningDataService";
import { useEffect, useState } from "react";
import type { ISpFxWebpartSalesToolsProps } from './ISpFxWebpartSalesToolsProps';
import '../../../../assets/dist/tailwind.css';
import '../../../../assets/dist/tailwind.css';
import Carousel from './Carousel';
import Filters from './Filters';
import DropDownProducts from './DropDownProducts';
 
const SpFxWebpartSalesTools: React.FC<ISpFxWebpartSalesToolsProps> = (props) => {
  const dataService = LearningDataService.getInstance();
  const [data, setData] = useState<any>(null);
  const { lp_id } = props;
 
  useEffect(() => {
    const handleDataResponse = (responseData: any) => {
      setData(responseData);
    };
 
    const waitForProvider = () => {
    console.log(`Registering listener for sp-data/4sp/${lp_id}`);
    // Listen for data responses
    dataService.on(`sp-data/4sp/${lp_id}`, handleDataResponse);
 
    console.log(`Emitting event: requestData for sp-data/4sp/${lp_id}`);
    // Request for data from the provider
    dataService.emit(`requestData`, `sp-data/4sp/${lp_id}`);
    }
 
    if ((dataService as any)._events?.requestData) {
      waitForProvider();
    } else {
      dataService.once("ready", () => {
        waitForProvider();
      });
    }
 
    // Cleanup listener on unmount
    return () => {
      console.log("Removing listener for sp-data/4sp/${lp_id}");
      dataService.off(`sp-data/4sp/${lp_id}`, handleDataResponse);
    };
  }, []);
 
 
  const { description } = props;
  const [selectedFilter, setSelectedFilter] = useState('Tool');
  const [selectedProduct, setSelectedProduct] = useState('All');
  const uniqueAdsm = ["Prospect", "Qualify", "Validate", "Prove", "Proposal", "Agreement", "Closed Won", "Closed Lost"];
  const uniqueRoles = ["Account Manager", "Channel Manager", "Security Engineer", "SDR", "Renewal"]
 
  // Get unique courses from the training data
  const uniqueCourses = Array.from(new Set(data?.modules?.map((item: { course: string }) => item.course)));
 
  // Function to reset the selected product to all
  const onProductReset = (): void => {
    setSelectedProduct('All');
  };
 
  return (
    <>
    {/*loading spinner*/}
      {!data ? (
        <div className="flex justify-center items-center h-full w-full">
          <button disabled type="button" className="text-white bg-[#41273c]  hover:bg-[#896f85] hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            Loading...
          </button>
        </div>
      ) : (
        <div className="w-[960px] mx-auto relative overflow-visible m-8">
 
          {/* description */}
          <h1 className="text-[#ee0c5d] text-[22px] mb-8 font-Poppins font-semibold">{description}</h1>
 
          {/* filters and products controls */}
          <div className="flex items-center justify-start space-x-4 max-w-full mb-8 overflow-visible">
            <Filters selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} onProductReset={onProductReset} />
            <DropDownProducts selectedProduct={selectedProduct} onProductChange={setSelectedProduct} selectedFilter={selectedFilter} uniqueCourses={uniqueCourses} uniqueAdsm={uniqueAdsm} uniqueRoles={uniqueRoles} />
          </div>
 
          {/* Carousel displaying the courses */}
          <div id="carousel" className="flex gap-4 overflow-visible scrollbar-hide scroll-smooth"
            style={{ scrollSnapType: 'x mandatory', width: '100%', display: 'flex', flexWrap: 'nowrap' }}>
            <Carousel courses={data?.modules} selectedProduct={selectedProduct} selectedFilter={selectedFilter} uniqueRoles={uniqueRoles} />
          </div>
        </div>
 
      )}
 
    </>
  );
};
 
export default SpFxWebpartSalesTools;