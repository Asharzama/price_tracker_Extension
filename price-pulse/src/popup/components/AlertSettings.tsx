import { useState } from "react";
import type {
  AlertSettings as AlertSettingsType,
  Product,
} from "../../shared/types/product";

interface AlertSettingsProps {
  product: Product;
  onSave: (
    productId: string,
    settings: AlertSettingsType,
    targetPrice?: number,
  ) => Promise<void>;
}

export default function AlertSettings({ product, onSave }: AlertSettingsProps) {
  const existingSettings = product.alertSettings ?? {
    priceDrop: true,
    targetPrice: false,
    minimumDropPercentage: 10,
  };

  const [priceDrop, setPriceDrop] = useState(existingSettings.priceDrop);

  const [targetAlert, setTargetAlert] = useState(existingSettings.targetPrice);

  const [minimumDrop, setMinimumDrop] = useState(
    existingSettings.minimumDropPercentage ?? 10,
  );

  const [targetPrice, setTargetPrice] = useState(
    product.targetPrice?.toString() ?? "",
  );

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    try {
      const parsedTargetPrice =
        targetPrice.trim() === "" ? undefined : Number(targetPrice);

      // Validate target price
      if (
        targetAlert &&
        (parsedTargetPrice === undefined || parsedTargetPrice <= 0)
      ) {
        alert("Please enter a valid target price.");
        return;
      }

      // Validate percentage
      if (minimumDrop < 1 || minimumDrop > 100) {
        alert("Minimum drop percentage must be between 1 and 100.");
        return;
      }

      const settings: AlertSettingsType = {
        priceDrop,
        targetPrice: targetAlert,
        minimumDropPercentage: minimumDrop,
      };

      await onSave(product.id, settings, parsedTargetPrice);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h4 className="text-sm font-semibold text-slate-800">
        🔔 Alert Settings
      </h4>

      <label className="mt-3 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={priceDrop}
          onChange={(event) => setPriceDrop(event.target.checked)}
        />

        <span>Price drop alerts</span>
      </label>

      <label className="mt-3 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={targetAlert}
          onChange={(event) => setTargetAlert(event.target.checked)}
        />

        <span>Target price alert</span>
      </label>

      {targetAlert && (
        <div className="mt-3">
          <label className="text-xs text-slate-500">Target price</label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={targetPrice}
            onChange={(event) => setTargetPrice(event.target.value)}
            placeholder="e.g. 1400"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
      )}

      {priceDrop && (
        <div className="mt-3">
          <label className="text-xs text-slate-500">
            Minimum drop percentage
          </label>

          <input
            type="number"
            min="1"
            max="100"
            step="1"
            value={minimumDrop}
            onChange={(event) => setMinimumDrop(Number(event.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-4 w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Alert Settings"}
      </button>
    </div>
  );
}
