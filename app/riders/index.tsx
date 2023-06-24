"use client";
import React, { useEffect, useState } from "react";
import AddRider from "./addRiders";
import TableBody from "./TableBody";
import SelectEvent from "@/components/SelectEvent";
import SelectCategory from "@/components/SelectCategory";
import { toast } from "react-hot-toast";
import { getAvailBeaconsInEvents } from "@/services/beacons";
import { BeaconResponse } from "@/services/beacons/data-type";

export default function index() {
  const [eventSelected, setEventSeleceted] = useState("");
  const [categorySelected, setCategorySeleceted] = useState("");
  const [added, setAdded] = useState(false);
  const [beacons, setBeacons] = useState<BeaconResponse>({
    message: "",
    data: [],
  });

  const [changed, setChanged] = useState(false);

  const handleSelect = (id: string) => {
    setEventSeleceted(id);
  };
  const handleSelectCategory = (id: string) => {
    setCategorySeleceted(id);
  };

  useEffect(() => {
    if (eventSelected === "" || eventSelected === "choose-event") return;
    getAvailBeaconsInEvents(eventSelected)
      .then((res) => {
        setBeacons(res);
      })
      .catch((res) => {
        if (res.message === "Failed to fetch : 404 Not Found") {
          toast.error(
            "There is no rider at this event, Please add category first or add rider",
            { duration: 3000 }
          );
          return;
        }
        toast.error(res.message, { duration: 3000 });
      });
  }, [eventSelected, changed]);

  return (
    <div className="py-10 px-10">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-4 place-content-between">
        <SelectEvent onSelect={handleSelect} />
        <SelectCategory
          onSelect={handleSelectCategory}
          eventSelected={eventSelected}
        />

        <AddRider
          categorySelected={categorySelected}
          eventSelected={eventSelected}
          onAdded={() => {
            setChanged(!changed);
          }}
          beacons={beacons}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full font-bold">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Nation</th>
              <th>Team</th>
              <th>BIB</th>
              <th>Running</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <TableBody
            categorySelected={categorySelected}
            changed={changed}
            onDeleted={() => {
              setChanged(!changed);
            }}
          />
        </table>
      </div>
    </div>
  );
}