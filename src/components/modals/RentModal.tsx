"use client";

import { useState } from "react";
import Modal from "./Modal";
import { categories } from "@/modules/rent/ui/components/data";
import axios from "axios";
import toast from "react-hot-toast";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  DETAILS = 2,
  GUESTS = 3,
  IMAGE = 4,
}

export default function RentModal() {
  const [step, setStep] = useState(STEPS.CATEGORY);

  const [category, setCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    51.505, -0.09,
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const [pricePerNight, setPricePerNight] = useState(0);
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const onNext = () => {
    setStep((prev) => (prev < STEPS.IMAGE ? prev + 1 : prev));
  };

  const onBack = () => {
    setStep((prev) => (prev > STEPS.CATEGORY ? prev - 1 : prev));
  };

  const onSubmit = async () => {
    if (step !== STEPS.IMAGE) return onNext();

    setLoading(true);

    const data = {
      category,
      title,
      description,
      pricePerNight,
      maxGuests,

      images: image,

      location: {
        city,
        address,
        coordinates: mapPosition,
      },
    };

    console.log("Final Data:", data);

    await axios.post("/api/listing", data);

    toast.success("Your listing has been created succesfully");

    // Reset all
    setCategory("");
    setSelectedCountry("");
    setCity("");
    setAddress("");
    setMapPosition([51.505, -0.09]);

    setTitle("");
    setDescription("");
    setPricePerNight(0);
    setImage("");
    setMaxGuests(1);
    setStep(STEPS.CATEGORY);

    setLoading(false);
  };

  const isNextDisabled =
    (step === STEPS.CATEGORY && !category) ||
    (step === STEPS.LOCATION && (!city || !address)) ||
    (step === STEPS.DETAILS && (!title || !description)) ||
    (step === STEPS.GUESTS && maxGuests < 1) ||
    (step === STEPS.IMAGE && !image);

  let bodyContent: React.ReactNode;

  switch (step) {
    // STEP 1: CATEGORY
    case STEPS.CATEGORY:
      bodyContent = (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.value}
                onClick={() => setCategory(item.value)}
                className={`flex flex-col items-center justify-center cursor-pointer p-3 rounded-lg border transition transform duration-200 hover:scale-105 ${
                  category === item.value
                    ? "border-black bg-gray-100"
                    : "border-gray-200"
                }`}
                style={{ height: 80 }}
              >
                <Icon size={24} />
                <span className="text-xs mt-1">{item.label}</span>
              </div>
            );
          })}
        </div>
      );
      break;

    // STEP 2: LOCATION
    case STEPS.LOCATION:
      bodyContent = (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Country"
            className="border p-2 rounded"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          />

          <input
            type="text"
            placeholder="City"
            className="border p-2 rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-2 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      );
      break;

    // STEP 3: DETAILS
    case STEPS.DETAILS:
      bodyContent = (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      );
      break;

    // STEP 4: GUESTS
    case STEPS.GUESTS:
      bodyContent = (
        <div className="flex flex-col gap-4">
          <input
            type="number"
            min={1}
            className="border p-2 rounded"
            value={maxGuests}
            onChange={(e) => setMaxGuests(Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Price per night"
            className="border p-2 rounded"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(Number(e.target.value))}
          />
        </div>
      );
      break;

    // STEP 5: IMAGE

    case STEPS.IMAGE:
      bodyContent = (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Image URL"
            className="border p-2 rounded"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
      );
      break;
  }

  const titleMap = {
    [STEPS.CATEGORY]: "Select Category",
    [STEPS.LOCATION]: "Add Location",
    [STEPS.DETAILS]: "Add Details",
    [STEPS.GUESTS]: "Guest & Price",
    [STEPS.IMAGE]: "Upload Image",
  };

  return (
    <Modal
      title={titleMap[step]}
      bodyContent={bodyContent}
      onSubmit={onSubmit}
      onBack={onBack}
      actionLabel={step === STEPS.IMAGE ? "Create" : "Next"}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel="Back"
      disabled={loading || isNextDisabled}
    />
  );
}
