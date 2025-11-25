import React from "react";

/**
 * TalentDetails
 * - shows rate card, start date, end date inputs for a selected talent
 * - accepts onChange(field, value)
 */
export default function TalentDetails({ talent, talentIndex, onChange, errors }) {
  return (
    <div className="border p-3 my-2 rounded bg-light">
      <h6 className="mb-3">{talent.name} - Details</h6>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Rate Card *</label>
          <input
            type="number"
            className="form-control"
            value={talent.rateCard || ""}
            onChange={(e) => onChange("rateCard", e.target.value)}
          />
          {errors?.rate && <small className="text-danger">{errors.rate}</small>}
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Start Date *</label>
          <input
            type="date"
            className="form-control"
            value={talent.startDate || ""}
            onChange={(e) => onChange("startDate", e.target.value)}
          />
          {errors?.sDate && <small className="text-danger">{errors.sDate}</small>}
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">End Date *</label>
          <input
            type="date"
            className="form-control"
            value={talent.endDate || ""}
            onChange={(e) => onChange("endDate", e.target.value)}
          />
          {errors?.eDate && <small className="text-danger">{errors.eDate}</small>}
        </div>
      </div>
    </div>
  );
}
