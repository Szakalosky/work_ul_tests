import { Input } from "@nextui-org/input";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { CheckboxGroup, Checkbox, Divider } from "@nextui-org/react";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import React, { use, useEffect, useState } from "react";
import { dataFromAPIType } from "@/app/types/important";
import axios from "axios";

const EditSite = ({
  sentUserId,
  setSentUserId,
  passedAllDataFromFetch,
  setPassedAllDataFromFetch,
}: {
  sentUserId?: string;
  setSentUserId?: (sentUserId: string) => void;
  passedAllDataFromFetch?: object[];
  setPassedAllDataFromFetch?: (passedAllDataFromFetch: object[]) => void;
}) => {
  const [radioValue, setRadioValue] = useState<string>();

  const [saveImportantData, setSaveImportantData] = useState<dataFromAPIType>({
    ...passedAllDataFromFetch,
  });

  const names = [
    { id: 0, name: "MSK" },
    { id: 1, name: "MST" },
    { id: 2, name: "KWS" },
    { id: 3, name: "SYS" },
  ];
  const positionLocal = [
    { id: 0, name: "Admin" },
    { id: 1, name: "Kierownik" },
    { id: 2, name: "Szef" },
    { id: 3, name: "Handlowiec" },
    { id: 4, name: "Handlowiec jeżdżący" },
  ];

  useEffect(() => {
    console.log("EDIT", sentUserId);
    console.log("Otrzymałem", passedAllDataFromFetch);
    //setSaveImportantData(passedAllDataFromFetch);
    console.log("Local", saveImportantData);
  }, [sentUserId, passedAllDataFromFetch, saveImportantData]);

  const {
    firstName,
    lastName,
    erpLogin,
    department,
    position,
    emails,
    phoneNumbers,
  } = saveImportantData;

  const [firstNameFromData, setFirstNameFromData] = useState<string>(firstName);
  const [lastNameFromData, setLastNameFromData] = useState<string>(lastName);
  const [erpLoginFromData, setErpLoginFromData] = useState<string>(erpLogin);

  const [emailsFromData, setEmailsFromData] = useState<string[] | undefined>(
    emails
  );
  const [phoneNumbersFromData, setPhoneNumbersFromData] = useState<
    string[] | undefined
  >(phoneNumbers);

  const [departmentFromData, setDepartmentFromData] = useState<string | null>(
    department
  );
  const [positionFromData, setPositionFromData] = useState<string | null>(
    position
  );
  const [changedObject, setChangedObject] = useState<Object>({});
  // useEffect(() => {
  //   console.log("Coto", saveImportantData);
  //   console.log("Dzial", departmentFromData);
  //   console.log("Pozycja", positionFromData);
  //   console.log("Email", emailsFromData);
  //   console.log("Telefon", phoneNumbersFromData);
  // }, [
  //   saveImportantData,
  //   departmentFromData,
  //   positionFromData,
  //   emailsFromData,
  //   phoneNumbersFromData,
  // ]);

  const [editingID, setEditingId] = useState<number>();

  const postData = async (newData: Object) => {
    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${sentUserId}`,
          { data: newData },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => console.log(response.status));
      setChangedObject(newData);
    } catch (error) {
      console.error("Nie udało się wysłać zmienionego obiektu", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //setEditingId(Number(sentUserId));
    const userToEdit = saveImportantData.hasOwnProperty("id");

    if (editingID === undefined) {
      console.log("Nie otrzymano jeszcze id", editingID);
    }
    if (userToEdit && saveImportantData.id === Number(sentUserId)) {
      const updatedObject = {
        firstName: firstNameFromData,
        lastName: lastNameFromData,
        erpLogin: erpLoginFromData,
        department: departmentFromData || null,
        position: positionFromData || null,
        emails: emailsFromData || undefined,
        phoneNumbers: phoneNumbersFromData || undefined,
      };
      postData(updatedObject);
    }
  };

  return (
    <div className="custom-edit-container ">
      <strong className="px-2">Dane użytkownika</strong>
      <form onSubmit={handleSubmit} className="gap-2">
        <div className="flex flex-col  p-2 gap-3">
          <div className="custom-edit-panel-initial-data">
            <div className="custom-edit-panel-initial-data-inner">
              <p>Imię</p>
              <Input
                value={firstNameFromData || ""}
                onChange={(e) => setFirstNameFromData(e.target.value)}
              />
            </div>
            <div className="custom-edit-panel-initial-data-inner">
              <p>Nazwisko</p>
              <Input
                value={lastNameFromData || ""}
                onChange={(e) => setLastNameFromData(e.target.value)}
              />
            </div>
            <div className="custom-edit-panel-initial-data-inner">
              <p>ERP Login</p>
              <Input
                value={erpLoginFromData || ""}
                onChange={(e) => setErpLoginFromData(e.target.value)}
              />
            </div>
          </div>
          <div className="custom-edit-panel ">
            <div className="custom-edit-panel-department-position-groups">
              <div className="flex flex-col">
                <RadioGroup label="Dział" classNames={{ label: "text-black" }}>
                  {names.map((type) => (
                    <Radio
                      key={type.id}
                      value={type.name}
                      // data-selected={departmentFromData || ""}
                      onChange={(e) => setDepartmentFromData(e.target.value)}
                    >
                      {type.name}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
              <div className="flex flex-col">
                <RadioGroup
                  label="Pozycja"
                  classNames={{ label: "text-black" }}
                >
                  {positionLocal.map((type) => (
                    <Radio
                      key={type.id}
                      value={type.name}
                      onChange={(e) => setPositionFromData(e.target.value)}
                    >
                      {type.name}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className="custom-edit-panel-department-position-groups">
              <div className="flex flex-col">
                <CheckboxGroup
                  label="Grupa 1"
                  classNames={{ label: "text-black" }}
                >
                  <Checkbox value="one">1</Checkbox>
                  <Checkbox value="two">2</Checkbox>
                  <Checkbox value="three">3</Checkbox>
                </CheckboxGroup>
              </div>
              <div>
                <CheckboxGroup
                  label="Grupa 2"
                  classNames={{ label: "text-black" }}
                >
                  <Checkbox value="one">1</Checkbox>
                  <Checkbox value="two">2</Checkbox>
                  <Checkbox value="three">3</Checkbox>
                </CheckboxGroup>
              </div>
            </div>
            <div className="custom-edit-panel-emails-phones">
              <div className="flex flex-col items-end gap-2">
                <p className="text-black">Email</p>
                <Input
                  type="email"
                  value={emailsFromData[0] || ""}
                  onChange={(e) => setEmailsFromData([e.target.value])}
                />
                <Popover placement="right">
                  <PopoverTrigger>
                    <Button isIconOnly>
                      <CiCirclePlus size={30} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col p-2 gap-2">
                      <Input
                        type="text"
                        className="  border border-black rounded-xl"
                      />
                      <Button className="bg-green-600">Dodaj Email</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-black">Telefon</p>
                <Input
                  type="text"
                  value={phoneNumbersFromData[0] || ""}
                  onChange={(e) => setPhoneNumbersFromData([e.target.value])}
                />
                <Popover placement="right">
                  <PopoverTrigger>
                    <Button isIconOnly>
                      <CiCirclePlus size={30} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col p-2 gap-2">
                      <Input className="  border border-black rounded-xl" />
                      <Button className="bg-green-600">Dodaj Telefon</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <Button type="submit" className="flex w-[30%] bg-green-600">
            Wyślij dane do serwera
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSite;
