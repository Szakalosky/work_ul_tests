"use client";
import React, { useCallback, useEffect, useState } from "react";
import EditSite from "../../components/EditSite";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useGetUser from "../../hooks/useGetUser";
import { dataFromAPIType } from "@/app/types/important";

const Page = () => {
  const [allDataFromFetch, setAllDataFromFetch] = useState<object[]>([]);
  const [userIdFromData, setUserIdFromData] = useState<string | undefined>(
    undefined
  );
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  //const userDataArray = params;
  const { data, loading, error, fetchUser, setData } = useGetUser();
  const [userDataArray, setUserDataArray] = useState<dataFromAPIType[]>([]);
  const pathName = usePathname();

  const getUserData = useCallback(async () => {
    //const users = localStorage.getItem('users');
    //const retUsers = JSON.parse(users);
    if (!id) {
      console.error("Brak parametru id");
      return;
    }
    try {
      await fetchUser(id, (fetchData) => {
        setData(fetchData);
      });
    } catch (error) {
      console.error("Błąd podczas pobierania danych użytkownika", error);
    }
  }, [id]);

  useEffect(() => {
    getUserData();
  }, []);
  // const searchParams = useSearchParams();
  // useEffect(() => {
  //   const data = searchParams.get("data");
  //   if (data) {
  //     setAllDataFromFetch(JSON.parse(data));
  //   }
  // }, [searchParams]);
  //console.log("DANE z edita", allDataFromFetch);

  useEffect(() => {
    console.log("DANE z edita", data);
  }, [data]);

  if (loading) {
    return <div>...Loading</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  } else {
    return (
      <div className="min-h-screen">
        <EditSite sentUserId={id} passedAllDataFromFetch={data} />
      </div>
    );
  }
};

export default Page;
