"use client";
import React, { useEffect, useState } from "react";
import EditSite from "../../components/EditSite";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const [allDataFromFetch, setAllDataFromFetch] = useState<object[]>([]);
  const [userIdFromData, setUserIdFromData] = useState<string | undefined>(
    undefined
  );
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      setAllDataFromFetch(JSON.parse(data));
    }
  }, [searchParams]);
  //console.log("DANE z edita", allDataFromFetch);

  useEffect(() => {
    console.log("DANE z edita", allDataFromFetch);
  }, [allDataFromFetch]);
  return (
    <>
      <EditSite
        sentUserId={id}
        setSentUserId={setUserIdFromData}
        passedAllDataFromFetch={allDataFromFetch}
        setPassedAllDataFromFetch={setAllDataFromFetch}
      />
    </>
  );
};

export default Page;
