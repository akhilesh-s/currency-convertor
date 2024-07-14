"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import CurrencyDropdown from "@/components/currencyDropdown";
import DatePicker from "@/components/datePicker";

const Convertor = () => {
  const [fromValue, setFromValue] = useState("USD");
  const [toValue, setToValue] = useState("INR");
  const [amount, setAmount] = useState<number>(1);
  const [date, setDate] = useState<Date>();
  const [data, setData] = useState<number | null | undefined>(null);
  const [error, setError] = useState<string | undefined>();

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
  };

  const handleToValueChange = (value: string) => {
    setToValue(value);
  };

  const handleHistoricalCurrency = async () => {
    if (date) {
      const year = new Date(date).getFullYear();
      const day = new Date(date).getDate();
      const month = new Date(date).getMonth();
      const formattedDate = year + "/" + month + "/" + day;

      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/ea25c43f875cabf81bb295c5/history/${fromValue}/${formattedDate}/${amount}`
        );
        const json = await response.json();
        const result = json.conversion_amounts[toValue];
        if (result) {
          setData(result);
          setError(undefined);
        } else {
          setData(undefined);
          setError(`Historical Data not present for this conversion`);
        }
      } catch (error) {
        console.log(error);
        setData(undefined);
        setError("Historical Data not present for this conversion");
      }
    }
  };

  const handleConvertCurrency = async () => {
    if (date) {
      handleHistoricalCurrency();
    } else {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/ea25c43f875cabf81bb295c5/pair/${fromValue}/${toValue}/${amount}`
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setData(json.conversion_result);
        setError(undefined);
      } catch (error) {
        console.error(error);
        setData(undefined);
        setError("Something went wrong");
      }
    }
  };

  useEffect(() => {
    handleConvertCurrency();
  }, [amount, toValue, fromValue, date]);

  return (
    <div className="flex flex-col">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Currency Convertor
      </h1>
      <div className="mt-10">
        <Input
          type="number"
          value={amount}
          onChange={(e: any) => {
            setAmount(e.target.value);
          }}
          placeholder="Enter Amount"
        />
      </div>
      <div className="flex items-center gap-4 justify-center m-4">
        <div className="flex flex-col">
          <h1 className="m-2 text-xl font-semibold">Convert Value From</h1>
          <CurrencyDropdown
            value={fromValue}
            onChange={handleFromValueChange}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="m-2 text-xl font-semibold">Convert Value To</h1>
          <CurrencyDropdown value={toValue} onChange={handleToValueChange} />
        </div>
      </div>
      <div className="flex items-center justify-center m-2">
        <DatePicker onDateChange={setDate} />
      </div>
      {/* <Button onClick={handleConvertCurrency}>Convert</Button> */}
      {data && (
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 mt-4 flex items-center justify-center">
          <h1 className="text-2xl mt-2 flex items-center text-center justify-center">
            {fromValue} {amount} = {toValue} {data?.toFixed(2)}
          </h1>
        </div>
      )}
      {error && (
        <div>
          <h1 className="text-2xl mt-2 flex items-center text-center justify-center">
            {error}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Convertor;
