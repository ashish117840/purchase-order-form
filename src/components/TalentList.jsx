import React from "react";

/**
 * TalentList
 * - shows checkbox list for talents of a given jobTitle
 * - handles disabling when Individual PO already has one selected
 */
export default function TalentList({ jobTitle, talentData, selectedTalents, toggleTalent, poType }) {
  const selectedIds = selectedTalents.map((t) => t.id);

  return (
    <div className="mb-3">
      <h6>Select Talents</h6>
      {talentData[jobTitle]?.map((t) => {
        const isSelected = selectedIds.includes(t.id);
        const disableSelect =
          poType === "Individual" && selectedIds.length === 1 && !isSelected;

        return (
          <div className="form-check mb-1" key={t.id}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={isSelected}
              disabled={disableSelect}
              onChange={() => toggleTalent(t)}
              id={`${jobTitle}_${t.id}`}
            />
            <label className="form-check-label" htmlFor={`${jobTitle}_${t.id}`}>
              {t.name} ({t.id})
            </label>
          </div>
        );
      })}
    </div>
  );
}
