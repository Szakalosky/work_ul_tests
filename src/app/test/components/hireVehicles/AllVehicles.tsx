import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/react";
import React, { useState } from "react";
import { TbManualGearboxFilled } from "react-icons/tb";
import { GiFrozenOrb } from "react-icons/gi";
import { PiEngine } from "react-icons/pi";
import { ImageVehicleType, VehicleType } from "@/app/types/important";

const AllVehicles = () => {
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  const [vehicles, setVehicles] = useState<VehicleType[]>([
    {
      id: 0,
      vehicleName: "DAF",
      engine: 450,
      feature: "Elekt",
      gearbox: "Automat",
    },
    {
      id: 1,
      vehicleName: "MAN",
      engine: 420,
      feature: "Łóżko",
      gearbox: "Automat",
    },
    {
      id: 2,
      vehicleName: "SCANIA",
      engine: 460,
      feature: "Klimatyzacja",
      gearbox: "Automat",
    },
    {
      id: 3,
      vehicleName: "Iveco Transporter",
      engine: 130,
      feature: "Klimatyzacja",
      gearbox: "Skrzynia manualna",
    },
    {
      id: 4,
      vehicleName: "Iveco Daily",
      engine: 150,
      feature: "Klimatyzacja",
      gearbox: "Skrzynia manualna",
    },
    {
      id: 5,
      vehicleName: "Volvo",
      engine: 490,
      feature: "Łóżko",
      gearbox: "Automat",
    },
  ]);

  const [images, setImages] = useState<ImageVehicleType[]>([
    { id: 0, file: "/vehicles/daf.png" },
    { id: 1, file: "/vehicles/man.png" },
    { id: 2, file: "/vehicles/scania.png" },
    { id: 3, file: "/vehicles/iveco-1.png" },
    { id: 4, file: "/vehicles/iveco-2.png" },
    { id: 5, file: "/vehicles/volvo.png" },
  ]);
  return (
    <div className="bg-green-300 p-4 w-full h-full overflow-auto">
      <div className="grid grid-cols-3 gap-4 bg-blue-600 p-4 h-auto items-center justify-between ">
        {vehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className="flex flex-col items-center justify-center border border-black rounded-2xl bg-slate-100 w-full h-[100%]"
          >
            <Image
              src={images[index].file}
              width={1000 / aspectRatio}
              height={450 / aspectRatio}
              alt={vehicle.vehicleName}
              className="h-[85%]"
            />

            <Divider className="bg-black" />
            <div className="flex flex-row items-center justify-center rounded-2xl bg-violet-400 p-2 w-full gap-2 h-[15%]">
              <div className="flex flex-row items-center justify-center gap-1 w-1/3 bg-orange-300">
                <TbManualGearboxFilled size={20} />
                <p>{vehicle.gearbox}</p>
              </div>
              <div className="flex flex-row items-center justify-center gap-1 w-1/3 bg-orange-500">
                <GiFrozenOrb size={20} />
                <p>{vehicle.feature}</p>
              </div>
              <div className="flex flex-row items-center justify-center gap-1 w-1/3 bg-orange-500">
                <PiEngine size={20} />
                <p>
                  {vehicle.engine}
                  {"KM"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVehicles;
