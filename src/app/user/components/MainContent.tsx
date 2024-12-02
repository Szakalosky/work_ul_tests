import React, { useState } from "react";
import SideBar from "./SideBar";
import EditSite from "./EditSite";
import UserData from "./UserData";

const MainContent = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isGetUserClicked, setIsGetUserClicked] = useState(false);
  //const toggleButtonClicked = () => setIsGetUserClicked(!isGetUserClicked);
  const [userIdFromData, setUserIdFromData] = useState<string>("");
  const [allDataFromFetch, setAllDataFromFetch] = useState<object[]>([]);
  //const [isEditBFromUserPage,setIsEditBFromUserPage] = useState(false);
  return (
    <div className="custom-main-content">
      <SideBar isClicked={isClicked} setIsClicked={setIsClicked} />
      <div className="flex flex-col ">
        {isClicked && (
          <UserData
            isGetUserButtonClicked={isGetUserClicked}
            setIsGetUserButtonClicked={setIsGetUserClicked}
            userIdFromData={userIdFromData}
            setUserIdFromData={setUserIdFromData}
            allDataFromFetch={allDataFromFetch}
            setAllDataFromFetch={setAllDataFromFetch}
          />
        )}
        {isGetUserClicked && (
          <EditSite
            sentUserId={userIdFromData}
            setSentUserId={setUserIdFromData}
            passedAllDataFromFetch={allDataFromFetch}
            setPassedAllDataFromFetch={setAllDataFromFetch}
          />
        )}
      </div>
    </div>
  );
};

export default MainContent;
