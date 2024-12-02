import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Input } from "@nextui-org/input";
import { CiSaveDown2 } from "react-icons/ci";
import { ImportantType } from "@/app/types/important";

const CardExample = () => {
  const [localTime, setLocalTime] = useState<string>(
    new Date().toLocaleTimeString().substring(0, 5)
  );

  const [infoObj, setInfoObj] = useState<ImportantType>();
  const [weight, setWeight] = useState<boolean>(false);
  const [newCarType, setNewCarType] = useState<string[]>([
    "NACZEPA",
    "FIRMA",
    "BUS",
  ]);

  const [clickedCarType, setClickedCarType] = useState<string[]>([]);
  const [newRampType, setNewRampType] = useState<string[]>([]);
  const [newTime, setNewTime] = useState<string>(
    new Date().toLocaleTimeString().substring(0, 5)
  );

  const [switchButtonClicked, setSwitchButtonClicked] = useState(true);

  const isSwitchClicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchButtonClicked(e.target.checked);
    setWeight(e.target.checked);
  };

  const updateCarType = (isNewState: boolean, type: string) => {
    setClickedCarType((prevType) => {
      if (isNewState) {
        return prevType.includes(type) ? prevType : [...prevType, type];
      } else {
        return prevType.filter((t) => t !== type);
      }
    });
  };

  const updateRampType = (isNewState: boolean, type: string) => {
    setNewRampType((prevType) => {
      if (isNewState) {
        return prevType.includes(type) ? prevType : [...prevType, type];
      } else {
        return prevType.filter((t) => t !== type);
      }
    });
  };

  const [isTrailerButtonClicked, setIsTrailerButtonClicked] = useState(false);
  const [isCompanyButtonClicked, setIsCompanyButtonClicked] = useState(false);
  const [isBusButtonClicked, setIsBusButtonClicked] = useState(false);

  const [alldata, setAllData] = useState<ImportantType[]>([]);

  const onTrailerChangeButton = () => {
    setIsTrailerButtonClicked((prevState) => {
      const newState = !prevState;
      updateCarType(newState, "NACZEPA");
      return newState;
    });
  };

  const onCompanyChangeButton = () => {
    setIsCompanyButtonClicked((prevState) => {
      const newState = !prevState;
      updateCarType(newState, "FIRMA");
      return newState;
    });
  };

  const onBusChangeButton = () => {
    setIsBusButtonClicked((prevState) => {
      const newState = !prevState;
      updateCarType(newState, "BUS");
      return newState;
    });
  };

  const [isFirstRampButtonON, setisFirstRampButtonON] = useState(false);
  const [isSecondRampButtonON, setIsSecondRampButtonON] = useState(false);
  const [isThirdRampButtonON, setIsThirdRampButtonON] = useState(false);

  const onFirstRampChangeButton = () => {
    setisFirstRampButtonON((prevState) => {
      const newState = !prevState;
      updateRampType(newState, "RĘCZNY");
      return newState;
    });
  };

  const onSecondRampChangeButton = () => {
    setIsSecondRampButtonON((prevState) => {
      const newState = !prevState;
      updateRampType(newState, "WÓZEK");
      return newState;
    });
  };

  const onThirdRampChangeButton = () => {
    setIsThirdRampButtonON((prevState) => {
      const newState = !prevState;
      updateRampType(newState, "GÓRĄ");
      return newState;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //setSwitchButtonClicked(switchButtonClicked);
    // if(switchButtonClicked){
    const storedData: ImportantType = {
      weight: switchButtonClicked,
      carType: clickedCarType,
      rampType: newRampType,
      time: localTime,
    };

    setAllData((prevData) => {
      const updatedData = [...prevData, storedData];
      localStorage.setItem("allData", JSON.stringify(updatedData));
      return updatedData;
    });

    //setWeight(switchButtonClicked);
    //setNewTime(localTime);
    // }
  };

  useEffect(() => {
    const localData = localStorage.getItem("allData");
    if (localData) {
      const retArray = JSON.parse(localData);
      //localStorage.removeItem("allData");
      setAllData(retArray);
    }
  }, []);

  // useEffect(() => {
  //   console.log("JAKI switch: ", switchButtonClicked);
  //   console.log("Zapisany", weight);
  //   console.log("Czas", newTime);
  //   console.log("AUTO", newCarType);
  // }, [switchButtonClicked, weight, newTime, newCarType]);

  useEffect(() => {
    console.log("PO ZMIANIE AUTA", clickedCarType);
    console.log("PO ZMIANIE ZAŁ", newRampType);
  }, [clickedCarType, newRampType]);

  return (
    <Card className="max-w-[600px] bg-slate-400 m-4 p-4">
      <form onSubmit={handleSubmit}>
        <CardHeader className="flex flex-row gap-3 justify-between">
          <p className="font-[16px]">INFORMACJE O FIRMIE </p>
          <Button type="submit">
            <CiSaveDown2 size={30} />
          </Button>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row bg-white p-4 justify-between">
              <div className="flex justify-start items-center w-[50%]">
                <p className="text-black">Czy firma waży towar?</p>
              </div>

              <Switch
                color="secondary"
                isSelected={switchButtonClicked}
                onChange={isSwitchClicked}
                checked={switchButtonClicked}
              >
                {switchButtonClicked ? "TAK" : "NIE"}
              </Switch>
            </div>
            <div className="flex flex-row bg-white p-4 justify-between">
              <div className="flex justify-start items-center w-[30%] ">
                <p className="text-black   ">Samochody w firmie</p>
              </div>

              <div className="flex flex-row  p-2 gap-1 w-[60%]">
                <Button
                  size={"sm"}
                  radius="none"
                  className={`flex ${
                    isTrailerButtonClicked
                      ? "bg-red-700 text-white"
                      : "bg-slate-100 text-red-600"
                  }  p-1 w-1/3 h-[20px] justify-center items-center`}
                  onClick={onTrailerChangeButton}
                >
                  Naczepa
                </Button>
                <Button
                  size={"sm"}
                  radius="none"
                  className={`flex ${
                    isCompanyButtonClicked
                      ? "bg-red-700 text-white"
                      : "bg-slate-100 text-red-600"
                  }  p-1 w-1/3 h-[20px] justify-center items-center`}
                  onClick={onCompanyChangeButton}
                >
                  Firma
                </Button>
                <Button
                  size={"sm"}
                  radius="none"
                  className={`flex ${
                    isBusButtonClicked
                      ? "bg-red-700 text-white"
                      : "bg-slate-100 text-red-600"
                  }  p-1 w-1/3 h-[20px] justify-center items-center`}
                  onClick={onBusChangeButton}
                >
                  Bus
                </Button>
              </div>
            </div>
            <div className="flex flex-row bg-white p-4 justify-between">
              <div className="flex justify-start items-center w-[30%] ">
                <p className="text-black">Załadunek w firmie</p>
              </div>
              <div className="flex flex-row  p-2 gap-1 w-[60%]">
                <Button
                  size={"sm"}
                  radius="none"
                  className={`flex ${
                    isFirstRampButtonON
                      ? "bg-red-700 text-white"
                      : "bg-slate-100 text-red-600"
                  }  p-1 w-1/3 h-[20px] justify-center items-center`}
                  onClick={onFirstRampChangeButton}
                >
                  Ręczny
                </Button>
                <Button
                  size={"sm"}
                  radius="none"
                  className={`flex ${
                    isSecondRampButtonON
                      ? "bg-red-700 text-white"
                      : "bg-slate-100 text-red-600"
                  }  p-1 w-1/3 h-[20px] justify-center items-center`}
                  onClick={onSecondRampChangeButton}
                >
                  Wózek
                </Button>
                <Button
                  size={"sm"}
                  radius="none"
                  className={`flex ${
                    isThirdRampButtonON
                      ? "bg-red-700 text-white"
                      : "bg-slate-100 text-red-600"
                  }  p-1 w-1/3 h-[20px] justify-center items-center`}
                  onClick={onThirdRampChangeButton}
                >
                  Górą
                </Button>
              </div>
            </div>
            <div className="flex flex-row bg-white p-4 justify-between items-center">
              <div className="flex justify-start items-center w-[40%] ">
                <p className="text-black">Możliwe godziny rozładunku</p>
              </div>
              <div className="flex flex-col  p-3 items-center">
                <Popover placement="bottom" color="primary">
                  <PopoverTrigger>
                    <Button>Wybierz godzinę</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <Input
                        type="time"
                        value={localTime}
                        onChange={(e) => setLocalTime(e.target.value)}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <p>Czas: {localTime}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </form>
      <div>
        <h2>All Data:</h2>
        {alldata.map((data, index) => (
          <div key={index}>
            <p>Weight: {data.weight ? "Yes" : "No"}</p>
            <p>Car Types: {data.carType.join(", ")}</p>
            <p>Ramp Types: {data.rampType.join(", ")}</p>
            <p>Time: {data.time}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CardExample;
