import { Input } from "@nextui-org/input";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { CheckboxGroup, Checkbox, Divider } from "@nextui-org/react";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import React, { use, useEffect, useState } from "react";
import { dataFromAPIType } from "@/app/types/important";
import axios from "axios";
import css from "./EditSite.module.css";
const EditSite = ({
  sentUserId,
  setSentUserId,
  passedAllDataFromFetch,
  setPassedAllDataFromFetch,
}: {
  sentUserId?: string;
  setSentUserId?: (sentUserId: string) => void;
  passedAllDataFromFetch?: dataFromAPIType[];
  setPassedAllDataFromFetch?: (
    passedAllDataFromFetch: dataFromAPIType[]
  ) => void;
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
  const [changedObject, setChangedObject] = useState<object>({});
  useEffect(() => {
    console.log("Coto", saveImportantData);
    console.log("Dzial", departmentFromData);
    console.log("Pozycja", positionFromData);
    console.log("Email", emailsFromData);
    console.log("Telefon", phoneNumbersFromData);
  }, [
    saveImportantData,
    departmentFromData,
    positionFromData,
    emailsFromData,
    phoneNumbersFromData,
  ]);

  const postData = async (newData: object) => {
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
      //setChangedObject(newData);
    } catch (error) {
      console.error("Nie udało się wysłać zmienionego obiektu", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //setEditingId(Number(sentUserId));
    const userToEdit = saveImportantData.hasOwnProperty("id");

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

  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [currentPhone, setCurrentPhone] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPhone, setErrorPhone] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addNextEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentEmail.trim()) {
      setErrorEmail("Niepoprawny adres email");
      return;
    }

    if (!validateEmail(currentEmail)) {
      setErrorEmail("Niepoprawny adres email");
      return;
    }

    setEmailsFromData((prevEmails) => [...(prevEmails || []), currentEmail]);
    setCurrentEmail("");
    setErrorEmail(null);
  };

  const validatePhone = (phoneNumber: string): boolean => {
    const phoneRegex =
      /^(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)$/;
    return phoneRegex.test(phoneNumber);
  };

  const addNextPhone = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPhone.trim()) {
      setErrorPhone("Niepoprawny numer telefonu");
      return;
    }

    if (!validatePhone(currentPhone)) {
      setErrorPhone("Niepoprawny numer telefonu");
      return;
    }

    setPhoneNumbersFromData((prevPhone) => [
      ...(prevPhone || []),
      "+" + currentPhone,
    ]);
    setCurrentPhone("");
    setErrorPhone(null);
  };

  return (
    <div className={css.customEditContainer}>
      <strong className="px-2">Dane użytkownika</strong>
      <form onSubmit={handleSubmit} className="gap-2">
        <div className="flex flex-col  p-2 gap-3">
          <div className={css.customEditPanelInitialData}>
            <div className={css.customEditPanelInitialDataInner}>
              <p>Imię</p>
              <Input
                value={firstNameFromData || ""}
                onChange={(e) => setFirstNameFromData(e.target.value)}
              />
            </div>
            <div className={css.customEditPanelInitialDataInner}>
              <p>Nazwisko</p>
              <Input
                value={lastNameFromData || ""}
                onChange={(e) => setLastNameFromData(e.target.value)}
              />
            </div>
            <div className={css.customEditPanelInitialDataInner}>
              <p>ERP Login</p>
              <Input
                value={erpLoginFromData || ""}
                onChange={(e) => setErpLoginFromData(e.target.value)}
              />
            </div>
          </div>
          <div className={css.customEditPanel}>
            <div className={css.customEditPanelDepartmentPositionGroups}>
              <div className="flex flex-col w-1/3">
                <RadioGroup label="Dział" classNames={{ label: "text-black" }}>
                  {names.map((type) => (
                    <Radio
                      key={type.id}
                      value={type.name}
                      defaultValue={departmentFromData || ""}
                      onChange={(e) => setDepartmentFromData(e.target.value)}
                    >
                      {type.name}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
              <div className="flex flex-col w-1/2 text-wrap">
                <RadioGroup
                  label="Pozycja"
                  classNames={{ label: "text-black" }}
                >
                  {positionLocal.map((type) => (
                    <Radio
                      key={type.id}
                      value={type.name}
                      defaultValue={positionFromData || ""}
                      onChange={(e) => setPositionFromData(e.target.value)}
                    >
                      {type.name}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className={css.customEditPanelDepartmentPositionGroups}>
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
            <div className={css.customEditPanelEmailsPhones}>
              <div className="flex flex-col items-end justify-between w-1/2 gap-2">
                <p className="text-black h-auto">Email</p>
                <Input
                  type="email"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  className="h-auto"
                />

                {errorEmail && (
                  <p className="text-red-700 text-sm">{errorEmail}</p>
                )}
                {emailsFromData?.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
                <Button isIconOnly onClick={(e) => addNextEmail(e)}>
                  <CiCirclePlus size={30} />
                </Button>
              </div>
              <div className="flex flex-col items-end justify-between gap-2 w-1/2">
                <p className="text-black">Telefon</p>
                <Input
                  type="number"
                  value={currentPhone}
                  onChange={(e) => setCurrentPhone(e.target.value)}
                />
                {errorPhone && (
                  <p className="text-red-700 text-sm">{errorPhone}</p>
                )}
                {phoneNumbersFromData?.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
                <Button isIconOnly onClick={(e) => addNextPhone(e)}>
                  <CiCirclePlus size={30} />
                </Button>
              </div>
            </div>
          </div>
          <Button type="submit" className="flex w-[30%] bg-green-600 text-wrap">
            Wyślij dane do serwera
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSite;
