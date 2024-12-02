import React, { useEffect, useState } from "react";
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
import useGetUser from "../hooks/useGetUser";
import EditSite from "./EditSite";
import { useParams } from "next/navigation";
const SideBar = ({
  isClicked,
  setIsClicked,
}: {
  isClicked: boolean;
  setIsClicked: (isClicked: boolean) => void;
}) => {
  //   const [allData, setAllData] = useGetUser();
  //   const getUsers = async () => {};
  const { data, loading, error, fetchUser, setData } = useGetUser();

  const [isEditSiteClicked, setIsEditSiteClicekd] = useState<boolean>(false);

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
    await getUserData();
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  //przekazać userID lub data do user/[id]/page.tsx za pomocą Link

  return (
    <div className="custom-sidebar">
      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Użytkownik">
          {/* <Button>123</Button> */}
          {/* <Link
            href="/edit"
            className="border border-black p-2 m-1 hover:bg-blue-300"
            onClick={() => <EditSite />}
          >
            Edytuj
          </Link> */}
          {/* <Button onClick={() => setIsClicked(!isClicked)}>Edytuj</Button> */}
          {/* <Link href={`/user/${userId}`}>Znajdź</Link> */}
          <Popover placement="right">
            <PopoverTrigger>
              <Button className="border border-black p-2 w-full hover:bg-blue-300">
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
                {/* <Button onClick={handleSubmit} isLoading={loading}>
                  Wyślij
                </Button> */}
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
        <AccordionItem key="2" aria-label="Accordion 2" title="Pobierz dane">
          <Button
            onClick={() => setIsClicked(!isClicked)}
            className="border border-black p-2 w-full hover:bg-blue-300"
          >
            Pobierz
          </Button>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SideBar;
