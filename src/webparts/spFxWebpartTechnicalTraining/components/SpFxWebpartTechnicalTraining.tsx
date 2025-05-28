import * as React from "react";
import { LearningDataService } from "../../../services/LearningDataService";
import { useEffect, useState, useRef } from "react";
import type { Course, ISpFxWebpartTechnicalTrainingProps } from './ISpFxWebpartTechnicalTrainingProps';
import '../../../../assets/dist/tailwind.css';
import CourseCarousel from './Carousel';
import Pillars from './Pillars';
import Products from './Products';
import { trainingObject } from './ISpFxWebpartTechnicalTrainingProps';
import CoursesBoard from './popup/CoursesBoard';

const SpFxWebpartTechnicalTraining: React.FC<ISpFxWebpartTechnicalTrainingProps> = (props) => {
  const { description, fetchListData } = props;
  const dataService = LearningDataService.getInstance();
  const [trainingData, setTrainingData] = useState<any>(null);

  // Effect to fetch training data when the component mounts
  useEffect(() => {
    const endpoint = "sp-data/4sp";
    const handleTrainingDataResponse = (responseData: any) => {
      setTrainingData(responseData);
    };

    // Fetch the list data and emit the event
    const startRequest = async () => {
      const listOfTrainingData = await fetchListData();
      dataService.on(endpoint, handleTrainingDataResponse);
      dataService.emit("requestData", endpoint, { listOfTrainingData });
    };

    // Check if the provider is ready and start the request
    const waitForProvider = () => {
      dataService.once("ready", () => {
        startRequest();
      });
    };

    // Check if the provider has already emitted the requestData event. If it has, we can start the request immediately
    if ((dataService as any)._events?.requestData) {
      startRequest();
    } else {
      waitForProvider();
    }

    // Cleanup listener on unmount
    return () => {
      dataService.off(`sp-data/4sp`, handleTrainingDataResponse);
    };
  }, []);

  // State for selected pillar 
  const [selectedPillar, setSelectedPillar] = useState('Quantum');

  // State for the selected product 
  const [selectedProduct, setSelectedProduct] = useState('Select Product');

  // State to manage the visibility of the CoursesBoard popup
  const [isCoursesBoardVisible, setIsCoursesBoardVisible] = useState(false);

  // State to manage the courses data for the selected training
  const [trainingDataCourses, setTrainingDataCourses] = useState<Course[] | null>(null);

  // State to manage the currently selected training object
  const [selectedTraining, setSelectedTraining] = useState<trainingObject>();

  // State to manage the loading state
  const [isLoading, setIsLoading] = useState(false);

  // ref to hold the popup element
  const popupRef = useRef<HTMLDivElement>(null);

  // Function to handle changes in the course subject pillar filter
  const handlePillarChange = (pillar: string): void => {
    setSelectedPillar(pillar);
    setSelectedProduct('Select Product');
  };

  // Function to handle changes in the product filter
  const handelProductChange = (product: string): void => {
    setSelectedProduct(product);
  };

  // Function to handle clicks outside the popup
  const handleClickOutside = (event: MouseEvent): void => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsCoursesBoardVisible(false);
    }
  };

  // Effect to add/remove the event listener based on the popup state
  useEffect(() => {
    if (isCoursesBoardVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCoursesBoardVisible]);

  // Function to handle the click event on a training card to show the popup
  const handleTrainingDataClick = async (trainingObject: trainingObject): Promise<void> => {

    if (!trainingObject?.Id) {
      console.warn("Training object ID is undefined. Ignoring click event.");
      return;
    }

    // Construct the course URL based on the training object ID and type
    const courseId = trainingObject.Id;
    const type = trainingObject.type;
    const courseUrl = `sp-data/4sp/courses/${courseId}/${type}`;

    // Reset the courses data and loading state
    setTrainingDataCourses(null);
    setIsLoading(true);
    setSelectedTraining(trainingObject);

    //Handle the response from the provider and set it in the courses data
    const responseHandler = (courseData: any) => {
      setTrainingDataCourses(courseData);
      setIsCoursesBoardVisible(true);
      setIsLoading(false);
      dataService.off(courseUrl, responseHandler); // Clean up
    };

    // Listen for the response from the provider
    dataService.on(courseUrl, responseHandler);
    dataService.emit("requestData", courseUrl);
  };

  return (
    // loading spinner
    <>{!trainingData ? (<div className="flex justify-center items-center h-full w-full">
      <button disabled type="button" className="text-white bg-[#41273c]  hover:bg-[#896f85] hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
        </svg>
        Loading...
      </button>
    </div>) : (
      <div className="w-full max-w-[960px] mx-auto relative overflow-visible m-8">
        {/* Loading indicator that matches the image */}
        {isLoading && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-[#896f8563]">
            <div className="bg-[#41273c] text-white py-2 px-4 rounded-full flex items-center space-x-2 shadow-lg">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              <span className="font-medium font-Poppins">Loading...</span>
            </div>
          </div>
        )}

        {/* Popup showing the CoursesBoard component */}
        {isCoursesBoardVisible && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50" onClick={() => setIsCoursesBoardVisible(false)} >
            <CoursesBoard
              ref={popupRef} // Attach the popupRef to the CoursesBoard component
              Courses={trainingDataCourses || []}
              handleTrainingDataClick={handleTrainingDataClick}
              selectedTraining={selectedTraining}
            /></div>
        )}
        {/* description */}
        <div className="text-[#ee0c5d] text-[22px] mb-8 font-Poppins font-semibold">{description}</div>
        {/* Pillars and products controls */}
        <div className="flex items-center justify-start space-x-4 max-w-full mb-8 overflow-visible">
          <Pillars selectedPillar={selectedPillar} onPillarChange={handlePillarChange} />
          <Products selectedProduct={selectedProduct} onProductChange={handelProductChange} courses={trainingData?.producttraining} selectedPillar={selectedPillar} />
        </div>
        {/* Carousel displaying the courses */}
        <div id="carousel" className="flex gap-4 overflow-visible scrollbar-hide scroll-smooth"
          style={{ scrollSnapType: 'x mandatory', width: '100%', display: 'flex', flexWrap: 'nowrap' }}>
          < CourseCarousel courses={trainingData?.producttraining} selectedPillar={selectedPillar} selectedProduct={selectedProduct}
            handleTrainingDataClick={(trainingObject: trainingObject) => handleTrainingDataClick(trainingObject)} />
        </div>
      </div>
    )
    }
    </>
  );
};

export default SpFxWebpartTechnicalTraining;