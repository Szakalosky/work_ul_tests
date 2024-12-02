"use client";
import React, { useState } from "react";
import EditSite from "../../components/EditSite";
import { useParams } from "next/navigation";

const Page = () => {
  const [allDataFromFetch, setAllDataFromFetch] = useState<object[]>([]);
  const [userIdFromData, setUserIdFromData] = useState<string | undefined>(
    undefined
  );
  const { id } = useParams<{ id: string }>();
  return (
    <>
      {
        <EditSite
          sentUserId={id}
          setSentUserId={setUserIdFromData}
          passedAllDataFromFetch={allDataFromFetch}
          setPassedAllDataFromFetch={setAllDataFromFetch}
        />
      }{" "}
    </>
  );
};

export default Page;
