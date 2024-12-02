import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
import useGetUser from "../hooks/useGetUser";

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
  allDataFromFetch: object[];
  setAllDataFromFetch: (allDataFromFetch: object[]) => void;
}) => {
  const { data, loading, error, fetchUser, setData } = useGetUser();
  const [userId, setUserId] = useState<string>("");

  const getUserData = async () => {
    if (error) {
      console.error(error);
    } else {
      await fetchUser(`${userId}`);
    }
  };

  const handleSubmit = async () => {
    console.log("ID", userId);
    fetchUser(userId.toString());
    if (data) {
      setIsGetUserButtonClicked(!isGetUserButtonClicked);
      setUserIdFromData(userId);
      setAllDataFromFetch(data);
      console.log("Dane", data);
    }
  };

  //   useEffect(() => {
  //     console.log("button clicked", isGetUserButtonClicked);
  //     console.log("user Id", userId);
  //     console.log("data", data);
  //   }, [data, isGetUserButtonClicked, userId]);

  return (
    <div className="custom-user-data">
      <div className="flex flex-row gap-2 ">
        <div className="flex px-2  items-center justify-center">
          <p>ID użytkownika</p>
        </div>

        <div className="flex gap-2  items-center justify-center">
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
      </div>
      {/* <Link href={`/user/${userId}`}>Dodaj</Link> */}
    </div>
  );
};

export default UserData;
