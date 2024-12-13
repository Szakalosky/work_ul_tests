import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
import useGetUser from "../../hooks/useGetUser";
import { dataFromAPIType } from "@/app/types/important";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/rootStates/rootState";
import css from "./UserData.module.css";
import { setIsFetchUserButtonClicked } from "@/app/redux/actions";
const UserData = ({
  isGetUserButtonClicked,
  setIsGetUserButtonClicked,
  userIdFromData,
  setUserIdFromData,
  allDataFromFetch,
  setAllDataFromFetch,
}: {
  isGetUserButtonClicked: boolean;
  setIsGetUserButtonClicked: (isGetUserButtonClicked: boolean) => void;
  userIdFromData: string;
  setUserIdFromData: (userIdFromData: string) => void;
  allDataFromFetch: dataFromAPIType[];
  setAllDataFromFetch: (allDataFromFetch: dataFromAPIType[]) => void;
}) => {
  const { data, loading, error, fetchUser, setData } = useGetUser();
  const [userId, setUserId] = useState<string>("");
  const dispatch = useDispatch();
  const getUserData = async () => {
    if (error) {
      console.error(error);
    } else {
      await fetchUser(`${userId}`);
    }
  };

  const [errorUserId, setErrorUserId] = useState<string | null>(null);

  const validateIDNumber = (idNumber: string): boolean => {
    const idRegex = /^[0-9]{1,4}$/;
    return idRegex.test(idNumber);
  };

  const handleSubmit = async () => {
    console.log("ID", userId);
    await fetchUser(userId.toString());

    if (!userId.trim()) {
      setErrorUserId("Pole nie może być puste");
      return;
    }
    if (!validateIDNumber(userId)) {
      setErrorUserId("Pole może mieć max 4 cyfry i nie może być napisem");
      return;
    }

    if (data) {
      setIsGetUserButtonClicked(!isGetUserButtonClicked);
      setUserIdFromData(userId);
      setAllDataFromFetch(data);
      console.log("Dane", data);
    }
    setErrorUserId(null);
  };

  const isFetchUserButtonClicked = useSelector(
    (state: RootState) => state.name.isFetchUserButtonClicked
  );

  const [newState, setNewState] = useState(isFetchUserButtonClicked);

  useEffect(() => {
    setNewState(!isFetchUserButtonClicked);
    console.log("user button clicked", newState);
  }, []);

  //   useEffect(() => {
  //     console.log("button clicked", isGetUserButtonClicked);
  //     console.log("user Id", userId);
  //     console.log("data", data);
  //   }, [data, isGetUserButtonClicked, userId])custom-user-data;

  return (
    <div
      className={`${css.customUserData} ${
        newState ? `${css.animateUserDataOut}` : `${css.animateUserDataIn}`
      }`}
    >
      <div className="flex flex-row gap-2 ">
        <div className="flex px-2  items-start justify-start">
          <p>ID użytkownika</p>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row justify-between bg-blue-300">
            <Input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-1/2"
            />
            <Button onClick={handleSubmit} isLoading={loading}>
              Wyślij
            </Button>
          </div>
          {errorUserId && <p className="text-red-700 text-sm">{errorUserId}</p>}
        </div>
      </div>
      {/* <Link href={`/user/${userId}`}>Dodaj</Link> */}
    </div>
  );
};

export default UserData;
