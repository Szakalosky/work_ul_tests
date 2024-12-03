import { useState, useCallback } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
// import { toastStyles } from "@/components/toast/ToastSuccess";

const useGetUser = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //const [isButtonOnIDPageClicked, setIsButtonOnIDPageClicked] = useState(false);

  const fetchUser = useCallback(
    async (id: string, callback?: (data: any) => void) => {
      //setIsButtonOnIDPageClicked(true);
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(() => {
          // localStorage.setItem("users", JSON.stringify(response.data));
          return response.data;
        });
        //setIsButtonOnIDPageClicked(!isButtonOnIDPageClicked);
        if (callback) {
          callback(response.data);
        }
      } catch (err) {
        // console.log("Nie udało się pobrać użytkownika", err);
        // toast.error("Nie udało się pobrać użytkownika", { ...toastStyles });
        //setIsButtonOnIDPageClicked(false);
        console.error("Nie udało się pobrać użytkownika", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, fetchUser, setData };
};

export default useGetUser;
