import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { currencyOptions } from "@/constants/currency";

interface ICurrencyDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const CurrencyDropdown = (props: ICurrencyDropdownProps): JSX.Element => {
  const { value, onChange } = props;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{value}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
        <DropdownMenuLabel>Currency</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {currencyOptions.map((currency, index) => {
            return (
              <DropdownMenuRadioItem value={currency.value} key={index}>
                {currency.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencyDropdown;
