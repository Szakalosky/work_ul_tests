import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import EditSite from "../Edit/EditSite";
import UserData from "../UserData/UserData";
import { dataFromAPIType } from "@/app/types/important";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { Button } from "@nextui-org/button";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/app/redux/store";
import { RootState } from "@/app/rootStates/rootState";
import { setIsFetchUserButtonClicked } from "@/app/redux/actions";
import css from "./MainContent.module.css";

const MainContent = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isSlideClicked, setIsSlideClicked] = useState(false);
  const [isGetUserClicked, setIsGetUserClicked] = useState(false);
  //const toggleButtonClicked = () => setIsGetUserClicked(!isGetUserClicked);
  const [userIdFromData, setUserIdFromData] = useState<string>("");
  const [allDataFromFetch, setAllDataFromFetch] = useState<dataFromAPIType[]>(
    []
  );

  const dispatch = useDispatch();

  const isFetchUserButtonClicked = useSelector(
    (state: RootState) => state.name.isFetchUserButtonClicked
  );

  const [newState, setNewState] = useState(isFetchUserButtonClicked);

  useEffect(() => {
    dispatch(setIsFetchUserButtonClicked(newState));
  }, [newState, dispatch]);
  //const [isEditBFromUserPage,setIsEditBFromUserPage] = useState(false);className="custom-main-content custom-div-gradient"
  return (
    <div className={`${css.customMainContent} custom-div-gradient`}>
      <SideBar
        isClicked={newState}
        setIsClicked={setNewState}
        isSlideButtonClicked={isSlideClicked}
        setIsSlideButtonClicked={setIsSlideClicked}
      />
      <Button
        isIconOnly
        aria-label="sidebar-button-collapsed"
        variant="light"
        onClick={() => setIsSlideClicked(!isSlideClicked)}
      >
        {isSlideClicked ? (
          <GoSidebarCollapse size={20} color="white" />
        ) : (
          <GoSidebarExpand size={20} color="white" />
        )}
      </Button>
      <div className="flex flex-col ">
        {newState && (
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
