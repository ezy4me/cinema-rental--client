"use client"

import React, { useState } from "react";
import { DateRangePicker, StaticRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ru } from "date-fns/locale";
import { addDays } from "date-fns";

interface CustomDateRangePickerProps {
  onDateRangeChange: (range: { startDate: Date; endDate: Date }) => void;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps | any> = ({
  onDateRangeChange,
}) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleDateRangeChange = (ranges: any) => {
    setDateRange(ranges.selection);
    onDateRangeChange(ranges.selection);
  };

  const customStaticRanges: StaticRange[] = [
    {
      label: "Сегодня",
      range: () => ({
        startDate: new Date(),
        endDate: new Date(),
      }),
      isSelected: (range) =>
        isSameDay(range.startDate, new Date()) &&
        isSameDay(range.endDate, new Date()),
    },
    {
      label: "Эта неделя",
      range: () => {
        const today = new Date();
        const firstDay = today.getDate() - today.getDay();
        const lastDay = firstDay + 6;
        const start = new Date(today.setDate(firstDay));
        const end = new Date(today.setDate(lastDay));
        return {
          startDate: start,
          endDate: end,
        };
      },
      isSelected: (range) => {
        const today = new Date();
        const firstDay = today.getDate() - today.getDay();
        const lastDay = firstDay + 6;
        const start = new Date(today.setDate(firstDay));
        const end = new Date(today.setDate(lastDay));
        return (
          isSameDay(range.startDate, start) && isSameDay(range.endDate, end)
        );
      },
    },
    {
      label: "Этот месяц",
      range: () => {
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return {
          startDate: start,
          endDate: end,
        };
      },
      isSelected: (range) => {
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return (
          isSameDay(range.startDate, start) && isSameDay(range.endDate, end)
        );
      },
    },
  ];

  const isSameDay = (date1?: Date, date2?: Date) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  return (
    <DateRangePicker
      className="date-range-picker"
      locale={ru}
      ranges={[dateRange]}
      inputRanges={[]}
      minDate={addDays(new Date(), 0)}
      weekdayDisplayFormat={"EEEEEE"}
      onChange={handleDateRangeChange}
      moveRangeOnFirstSelection={false}
      staticRanges={customStaticRanges}
    />
  );
};

export default CustomDateRangePicker;
