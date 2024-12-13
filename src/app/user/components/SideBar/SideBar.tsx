import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import useGetUser from "../../hooks/useGetUser";
import EditSite from "../Edit/EditSite";
import { useParams } from "next/navigation";
import { FaUserCog } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setIsFetchUserButtonClicked } from "@/app/redux/actions";
import { RootState } from "@/app/rootStates/rootState";
import css from "./SideBar.module.css";
const SideBar = ({
  isClicked,
  setIsClicked,
  isSlideButtonClicked,
  setIsSlideButtonClicked,
}: {
  isClicked: boolean;
  setIsClicked: (isClicked: boolean) => void;
  isSlideButtonClicked: boolean;
  setIsSlideButtonClicked: (isSlideButtonClicked: boolean) => void;
}) => {
  //   const [allData, setAllData] = useGetUser();
  //   const getUsers = async () => {};
  const dispatch = useDispatch();
  const { data, loading, error, fetchUser, setData } = useGetUser();

  const [userId, setUserId] = useState<string>("");
  const [popOverPlacement, setPopOverPlacement] = useState<"bottom" | "right">(
    "right"
  );
  //const [isFetchClicked, setIsFetchClicked] = useState(isClicked);

  const getUserData = async () => {
    if (error) {
      console.error(error);
    } else {
      await fetchUser(`${userId}`);
    }
  };

  const handleSubmit = async () => {
    console.log("ID", userId);
    await getUserData();
  };

  const updatePlacement = () => {
    if (window.innerWidth <= 768) {
      setPopOverPlacement("bottom");
    } else {
      setPopOverPlacement("right");
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    updatePlacement();
    window.addEventListener("resize", updatePlacement);
    return () => window.removeEventListener("resize", updatePlacement);
  }, []);

  //przekazać userID lub data do user/[id]/page.tsx za pomocą Link

  useEffect(() => {
    console.log("KLIK", isSlideButtonClicked);
  }, [isSlideButtonClicked]);

  const isFetchUserButtonClicked = useSelector(
    (state: RootState) => state.name.isFetchUserButtonClicked
  );

  useEffect(() => {
    //dispatch(setIsFetchUserButtonClicked(isFetchClicked));
    console.log("sidebar button clicked", isFetchUserButtonClicked);
  }, [isFetchUserButtonClicked, dispatch]);

  return (
    <div
      className={`${css.customSidebar} custom-div-gradient ${
        isSlideButtonClicked
          ? `${css.customSidebarCollapse}`
          : `${css.customSidebar}custom-div-gradient`
      }`}
    >
      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title={isSlideButtonClicked ? <FaUserCog size={30} /> : "Użytkownik"}
        >
          <Popover placement={popOverPlacement}>
            <PopoverTrigger>
              <Button
                className="border border-black p-2 w-full hover:bg-blue-300"
                size={isSlideButtonClicked ? "sm" : "md"}
              >
                Szukaj
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-2/3 bg-slate-600 ">
              <div className="px-1 py-2 flex flex-row  gap-2 items-center justify-center">
                <Input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-2/5"
                />
                <Link
                  href={`/user/${userId}`}
                  className="border border-black px-2 py-3 rounded-xl hover:bg-slate-800 hover:text-white"
                >
                  Znajdź
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title={isSlideButtonClicked ? <MdInfo size={30} /> : "Pobierz dane"}
        >
          <Button
            onClick={() => {
              const newFetchState = !isClicked;
              //setIsFetchClicked(newFetchState);
              dispatch(setIsFetchUserButtonClicked(newFetchState));
              setIsClicked(!isClicked);
              // dispatch(setIsFetchUserButtonClicked(isFetchClicked));
            }}
            className="border border-black p-2 w-full hover:bg-blue-300"
            size={isSlideButtonClicked ? "sm" : "md"}
          >
            Pobierz
          </Button>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SideBar;
