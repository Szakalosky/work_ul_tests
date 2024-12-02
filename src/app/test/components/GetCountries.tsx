import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React, { ErrorInfo, useEffect, useState } from "react";

const GetCountries = () => {
  const [countries, setCountries] = useState<Object[]>([]);

  const getAllCountries = async () => {
    const endpoint = "https://www.freetestapi.com/api/v1/countries";
    try {
      const newCountries = await fetch(endpoint, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });
      const retCountries = await newCountries.json();
      setCountries((prevData) => {
        const updatedCountries = [...prevData, ...retCountries];
        localStorage.setItem("allCountries", JSON.stringify(updatedCountries));
        return updatedCountries;
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const loadedData = localStorage.getItem("allCountries");
    if (loadedData) {
      const retData = JSON.parse(loadedData);
      setCountries(retData);
    } else {
      getAllCountries();
    }
  }, []);

  useEffect(() => {
    console.log("Dane: ", countries);
  }, [countries]);

  const onSaveButton = (data: Object[], filename: string) => {
    const convertToJson = JSON.stringify(data, null, 2); //convert to json data
    const jsonBlob = new Blob([convertToJson], { type: "application/json" }); //create json file blob
    const urlJson = URL.createObjectURL(jsonBlob); // create file url

    const link = document.createElement("a"); //create "a" link
    link.href = urlJson; //set file URL (href atribute)
    link.download = filename; //set fileName download
    document.body.appendChild(link); // append <a> tag to DOM tree
    link.click(); // user can click new link
  };

  const [countriesFromFile, setCountriesFromFile] = useState<Object[]>([]);

  const onReadButton = (file: Blob) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        const fileContent = event.target.result as ArrayBuffer;
        const parsedData = JSON.parse(new TextDecoder().decode(fileContent));
        setCountriesFromFile((prevData) => {
          const newData = parsedData.filter(
            (item: any) =>
              !prevData.some((prevItem: any) => prevItem.id === item.id)
          );

          const updatedData = [...prevData, ...newData];
          return updatedData;
        });
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const openFile = () => {
    const newInput = document.createElement("input");
    newInput.type = "file";

    newInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        onReadButton(file);
      }
    };
    newInput.click();
  };

  const [freshData, setFreshData] = useState<Object[]>([]);
  const [maxPop, setMaxPop] = useState<number>(0);

  const inputButtonOpenFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);

    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (loadEvent.target?.result) {
          const fileContent = loadEvent.target.result as ArrayBuffer;
          const parsedData = JSON.parse(new TextDecoder().decode(fileContent));
          setFreshData((prevData) => {
            const newData = parsedData
              .filter((item: any) => {
                if (!item.hasOwnProperty("id")) {
                  return false;
                } else {
                  return !prevData.some(
                    (prevItem: any) => prevItem.id === item.id
                  );
                }
              })
              .sort((a, b) => b.id - a.id);

            const newUpdatedData = [...prevData, ...newData];
            return newUpdatedData;
          });
          //console.log(parsedData);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    console.log("PLIK: ", countriesFromFile);
  }, [countriesFromFile]);

  useEffect(() => {
    console.log("Fresh: ", freshData);
  }, [freshData]);

  return (
    <div className="flex flex-col p-2 w-screen ">
      <div className="flex flex-col gap-3 w-1/6">
        <Button
          color="secondary"
          onPress={() => onSaveButton(countries, "countriesData")}
          className="text-[10px]"
        >
          Save to JSON file
        </Button>
        <Button color="primary" className="text-[10px]" onPress={openFile}>
          Read from computer
        </Button>
        <p className="">Second way</p>
        <Input color="primary" type="file" onChange={inputButtonOpenFile} />
      </div>

      <div className="flex w-full mt-4">
        <Table
          aria-label="countries"
          classNames={{
            th: "bg-red-500 text-white text-[14px]",
            tbody: "bg-slate-300 text-black",
          }}
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Capital</TableColumn>
            <TableColumn>Currency</TableColumn>
          </TableHeader>
          <TableBody>
            {freshData.map((country) => (
              <TableRow key={country.id}>
                <TableCell>{country.id}</TableCell>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.capital}</TableCell>
                <TableCell>{country.currency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GetCountries;
