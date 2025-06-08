import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { LearningDataService } from "../../../services/LearningDataService";


const PointsAndBadges: React.FC = () => {
  const [badges, setBadges] = useState<{ Title: string; Icon: string, EarnedPoint: string }[] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const dataService: LearningDataService & { _events?: Record<string, unknown> } = LearningDataService.getInstance();
  const endpoint = "sp-data/4sp/badges";

  const handleBadgesResponse = (data: { Title: string; Icon: string, EarnedPoint: string }[]): void => {
    setBadges(data);
    setIsVisible(true);
    dataService.off(endpoint, handleBadgesResponse); // Clean up
  };

  const waitForProvider = (): void => {
    dataService.on(endpoint, handleBadgesResponse);
    dataService.emit("requestData", endpoint);
  };

  const handleClick = (): void => {
    if (dataService._events?.requestData) {
      waitForProvider();
    } else {
      dataService.once("ready", () => {
        waitForProvider();
      });
    }
  };



  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);
  //sum up points fro
  // m all badges
  const totalPoints = badges?.reduce((sum, badge) => {
    return sum + parseFloat(badge.EarnedPoint);
  }, 0);

  return (
    <div className="font-normal font-['Poppins']">
      <button
        onClick={handleClick}
      >
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 0.935791L5 4.93579L9 0.935791" stroke="#C9C2C8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </button>

      {isVisible && badges && (
        <div
          ref={popupRef}
          className="absolute w-48 h-52 right-2 mt-2 max-h-80 overflow-y-auto bg-white border-t-[3px] border-pink-500 rounded-bl-2xl rounded-br-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] z-10">
          <div className="flex flex-col justify-between items-center px-4 py-3 border-b border-black">
            <div className='flex items-stretch justify-between w-full'>
              {/* Total Points */}
              <div className="flex flex-col items-start w-1/2 pr-2">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <rect y="0.399902" width="34" height="32.64" fill="url(#pattern0_57867_444)" />
                  <defs>
                    <pattern id="pattern0_57867_444" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0_57867_444" transform="matrix(0.0096 0 0 0.01 0.02 0)" />
                    </pattern>
                    <image id="image0_57867_444" width="100" height="100" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAALyklEQVR4nO2da2wc1RXH/2d2vXbAa8fBZudhpyZKCyIB0gTKGxIiKIKUAGkCKu+0DZ/6VFWC1BapUhG0UkVLRZtQlZZHVUJFgCBAgpBCUT6UlBDktDyLcXbnTmInxPE6xM7OPf3gcZgd73p21+ud2Xh+kiXPua+z+9+5d+65d2aAiIiIiIiIiIiIiIiI2kIVlmtQVXUlEV0LYAmALgAnVs+tuiQLIA3g3wA2CyGeA3C03ErKFkTX9ZXM/CsAXyy37AzjAyL6kWmaz5VTKFZGXkXTtHsB/A7ASWW5NjM5CcCNyWSyMZvNbgPApRQqWRBHjPUVOjdTIQAXJ5PJhmw2+2qpBXxxuqnNnvwjADZIKf8KoGfv3r3DZbt7HJFKpU4EsJCIbiaidQASrmQmopWmaW7xq6cUQRo0TduN/DEjoyjK1ZlMZld5bs8MDMNYJKV8HoDhMr8vhFgIn4Fe8atcVdWVyBdjJBJjcjKZzNtE9DUAoy7zlzRNu8avrK8gzqWtmw2RGP6YprmTiB72mFf6lfMVBMDZ7gNmfqIcx2Yytm0/7jGd41emFEHc/SBs2/5POU7NZKSUPR6TUTCji1IEaXYf9Pf3Z8txaiZT4LtK+pUpRZDQM3/+/Mb58+c3Bu1HNYgH7UA1OHz48LVSSgawKWhfpspxIQgzryWi40KQuu+yDMPoBLAcwOW6rs8N2p+pUveC2La9FmMxOUVKeVvQ/kyVeheEiOg218HtqHyNJxTUtSCpVGoZgHku0zxVVZcG5E5VqGtBFEVZ67UR0QRbPVG3grS1tbUCuK5A0qru7u7ZtfanWtStII2Njd8AcEKBpFkjIyM31tqfalG3ghDRHZMk1223VZeCpFKpM5AfOZXO3zjnOHnqjroUpMBg/jKAVzx5JjuDQkvdCbJgwYIEgJvcNiJ6hIge8WS9tR4DjnUnyP79+68B0OEyHUgkEs+2tbU9DWDAZT9peHh4RW29mzp1J4h3nsHMT/T29h7ZvXv3KDP/zZO97gb3uhKks7PTAHCF26YoyrGuKh6Pe9ewr9R1vasWvlWLuhLEtu3bkb+57y3TNHeOH6TT6XcA7HSlK8x8S43cqwr1JAgx8+15hokDeSHbN1FHAce6EURV1UuJaL7LNArAO2ZAUZQnABxxmeapqnrJdPtXLepGEO/MnJmfNk1zwJsvnU4fYOZn3bZ6mpOEYQmX5s6dO3t0dLSVmZOxWCzJzElmbiGi2QCSRNTCzF93F3IP5l4URfkTM98wfszMq3Vd72XmQwCGmPkgER0ioiHbtoeIaCiRSAz29fUdRIm71KcL375V07Q8B4UQRct0d3c3jY6OXsfMrUTUysytzJxUFCXJzC0Y2wbThrEvOcnMSXi2GZVInxDiFOSHS9womqZ9DKCSJd0sEQ0x8xCAIQCfAhgiokNSyiEiGiKiQWYeJKLBRCKxube390ixysr5/oAqnyG9vb1HVFUdVBTl98zcCgBEBOaJP7pCtlJxBu5iYgCAJKI/M/PPKqi+mZmbAWhuIzODiI79DyDLzLdOJkYlVH0MsSzrBQDnAniv2nU7cC6Xe8wvk5TST7Sp8D8p5flCiM3VrnhaxhDTNN8zDONCZt7EzJeVUOQgxrqHQ+PdBREdHO/ziWjI6S4GmTmzb9++j/wqtCyrV1XVa4jIYOZWp9tM4vMxabar2xzvTn0XtojoVSJaI4TYX8LnKpuqjiEFiKuq+msi+k6BtDfi8fgNe/bsMcuob9rp6urSc7nckwAu8qYx84OWZf0QQK7U+sr9/qb7sjdnWdZ3AdyC/LkBAFxk2/ZLqVRqXoFygaDrelcul9uCiWKMEtG3nc9SshiVUJN5iBDicSJaDsBy25n5DEVR3jQMY3kt/JgMTdMuZuYdABZ7kgaY+aumaf6xFn7UbGJomub2WCx2NoA3PUlzpJQv6bp+V6188aJp2joi2grgZE/SLgBnW5b1j1r5UtOZejqdzjQ2Nl4CwHuVFGfm+zRNe9hZgKoVcVVVHwSwgZkb3AlEtImILhBCfFJDf6Z9UC/arq7rP2bmezHxR7E9l8ut6u/vtwoVrBa6rrcz81MAlnqSmJl/aVnW3ajCrD1sg3ox2DTN+5l5BRENetIuiMfjO1RV9b39q1IMwziLmd/ERDGyRHS9ZVnrEVAIJdDgomVZLxLRVwC860kyiOh1TdOqvpahqupqKeV2AN1uOxF9xMznmab5TLXbLIfAo72ZTOb9WCx2IcZ2jrhpAvAXVVXvQ3X8JF3X7yKiJzFxg93rUsrzLcvaXYV2pkTgggBjIXMhxFUAHvAkERHdpev6mqm2oev6Dcx8HyaOmw8IIZZbltU/1TaqQSgEccgJIX4A4M4JCbmc91K5/MoL13Gn0+a0TvbKIUyCAACklB96TH2lxK78cOrodduY+YOp1lttQieIoijL3MfM/EqxvOXCzNsmaysMhE4QAHnRYSLaVixjuXjrKjESXVNCJUhHR0czEeXNP2KxWNUEicfjWz2mc9vb231v5q8loRIkFotd4glhvJtOpzN+5QzDWF5KgNIJ9bvnPPF4PH5xBa5OG6ESxNunOwG/orS1tbVqmrZBSvmylPIVXdc3GYYx6eMHiSjvyW6Koiyt1N/pIFSCMPNyz3HR7kpV1aubmpp6AKyDM7dg5tVSyh5N01YVKyel9I4jgYf+3YRGkM7OzjkAznKZJBG95s2XSqVO1jTtUSJ6HkBngapUAH/XdX2Lsxc4D2dMcq+1L9J1vX2K7leN0Ahi2/Yy5Puzy7sRTlXV1Yqi7MbYCuSkMPMK27Z7NE07dgYBQCaT2Q/gHVdWhZlDs7MxNIIQkXf8ONbX67o+V9O0F4loE4B2T76jRPRz58/7PMPZADZomvaC+7Eb3rGJiEJz+RsaQbxzAinlqwBI07R1zNwD4MoCxXYBOM80zXtM07zHtu3FAP5VIN+VzPxfZ1VSKTCOhGaCGApB2tvbNQCnuUw5RVGErutbAWzAxAd/fUZE64UQS0zTfGvcuHfv3h4hxPkYi4d5H1t7grMq+U8A+zxn0+ldXV169T5R5YRCkEQisQz5UdijzLy9yC/3tVgsdqZpmvcDsAukSyHExlgstgjAhIsCABcQ0evMnBdQtG17aaX+V5NQCFIghDELY+shbg4B+L4Q4rJ0Ou0NQE4gnU5/KIRYxsy3ATjgSW5y2nD7EIpuKxSCwBO/KsCLRHSGEOI3KG97KFuW9ejRo0cXAvDb9hmKgT1wQTRN+wKAU4okf4qxNYurTNPsq7SNgYEBIYS4npnXACi2EDUvlUoV86NmBC4IEV1exP4UM58qhNhYrbYsy3qqoaHhVAAF64zFYoGfJYEL4u27iUgAWGWa5prpWFbt6+v7VAhxJzNfDWDPZL4EQRgEWTr+L4DHFEVZKIR4errbtSzrhZGRkYUAfgtnXHImiIHeIBqoIKqqnk5EOoCPiegKIcSt6XTae0U0bRw4cOCQEOJ7RHQpgPeYWdM07TTfgtNI0GfIUgAbc7ncmaZpVm2ptlxM03wjFot9mZnvBxBoXCvQmz5zudxjAwMDDwXpwzjpdPozAOuDXkEM9AwZGBgYCrL9QgTtU9BdVoSHSJCQEQkSMkoRJK9P7ejoqORG/xnJnDlzWjymQ35lShEk7y5ZRVEWlOPUTGbWrFne78r3juNSBNnhPiCim4pljMiHmW/2mHw3jfsKwsx5N7AQ0TrDMBaV6duMQ9f1xcz8LY/Z92agqbxYckUmk3m7HCdnCrquL5ZSbnHCQuOU9GLJUt6FK1taWj4BcCM+F7CFmdc2NzenWltbDzY1NR08fPjw6CR1HPd0dHQ0t7W1LUkmk3cz80POo6XGYSnlHcPDw95b9yZQcmTTeTnx3ZU4G4FfCCF+UkrGkt8Wnc1mtyWTyQTGHjtRN88wDBgGcK8Q4qelFijnfeqczWa3trS07ASwBNE71f14X0p5h2VZfyinUKW/9AbnRbsrMfZq1i5U9mS444ksxlYgdwB4RgixBT4DeERERERERERERERERBj4P5pFcRdKMXqwAAAAAElFTkSuQmCC" />
                  </defs>
                </svg>

                <span className="text-[8px] font-medium font-Poppins">{totalPoints} Points</span>
              </div>
              <div className="w-px bg-black" />
              {/* Total Badges */}
              <div className="flex flex-col  items-end w-1/2 pl-2">
                <svg width="39" height="34" viewBox="0 0 39 34" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <rect y="0.399902" width="39" height="32.64" fill="url(#pattern0_57892_190)" />
                  <defs>
                    <pattern id="pattern0_57892_190" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0_57892_190" transform="matrix(0.00836923 0 0 0.01 0.0687179 0)" />
                    </pattern>
                    <image id="image0_57892_190" width="100" height="100" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                  </defs>
                </svg>

                <span className=" text-[8px] font-medium font-Poppins">{badges.length} Badges</span>
              </div>
            </div>
          </div>
          {/* Badge List */}
          <div className="flex px-4 py-2 border-t border-black">
            {/* Left column: points */}
            <div className="flex flex-col space-y-3 w-1/2 items-start">
              {badges.map((badge, index) => (
                <span key={index} className="text-sm">{parseFloat(badge.EarnedPoint)}</span>
              ))}
            </div>
            <div className="w-px bg-black h-full absolute left-1/2 transform -translate-x-1/2" />

            {/* Right column: icons */}
            <div className="flex flex-col space-y-3 w-1/2 items-end">
              {badges.map((badge, index) => (
                <img
                  key={index}
                  src={badge.Icon}
                  alt={badge.Title}
                  className="w-5 h-5 object-contain"
                />
              ))}
            </div>
          </div>


          {/* <div className="p-4">
            <ul className="space-y-2">
              {badges.map((badge, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <img src={badge.Icon} alt={badge.Title} className="w-6 h-6 object-contain" />
                  <h3>{badge.EarnedPoint}</h3>
                  <h3>{badge.Title}</h3>
                </li>
              ))}
            </ul>
          </div> */}

        </div>
      )}
    </div>
  );
};

export default PointsAndBadges;