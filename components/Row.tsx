"use client";
import { useState, useMemo } from "react";

interface RowProps {
  title: string;
}

export default function Row({ title }: RowProps) {
  const [unitCost, setUnitCost] = useState(0);
  const [qty, setQty] = useState(0);
  const total = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(unitCost * qty);
  }, [unitCost, qty]);

  return (
    <div className="flex">
      <div className="flex-1 text-center">{title}</div>
      <input
        className="flex-1 text-center w-0"
        type="number"
        inputMode="decimal"
        value={unitCost}
        onFocus={(e) => e.target.select()}
        onChange={(e) => setUnitCost(Number(e.target.value))}
      />
      <input
        className="flex-1 text-center w-0"
        type="number"
        inputMode="decimal"
        value={qty}
        onFocus={(e) => e.target.select()}
        onChange={(e) => setQty(Number(e.target.value))}
      />
      <div className="flex-1 text-center">{total}</div>
    </div>
  );
}
