import React from "react";
import TalentList from "./TalentList";
import TalentDetails from "./TalentDetails";

/**
 * ReqSection
 * - jobTitle select (based on selected client mapping)
 * - displays REQID
 * - shows TalentList (checkboxes)
 * - shows TalentDetails for selected talents
 */
export default function ReqSection({
  index,
  req,
  clientName,
  clientReqMapping,
  talentData,
  poType,
  updateReq,
  toggleTalent,
  updateTalentField,
  errors,
}) {
  const onJobChange = (jobTitle) => {
    const reqId =
      clientName && clientReqMapping[clientName]
        ? clientReqMapping[clientName].find((r) => r.title === jobTitle)?.reqId || ""
        : "";
    updateReq({ jobTitle, reqId, talents: [] }); // reset talents when job changes
  };

  return (
    <div className="border p-3 mb-3 rounded bg-white">
      <h5>REQ #{index + 1}</h5>

      <div className="mb-3">
        <label className="form-label">Job Title / REQ Name *</label>
        <select
          className="form-select"
          value={req.jobTitle}
          onChange={(e) => onJobChange(e.target.value)}
          disabled={!clientName}
        >
          <option value="">Select Job Title</option>
          {clientName &&
            clientReqMapping[clientName].map((item, i) => (
              <option key={i} value={item.title}>
                {item.title}
              </option>
            ))}
        </select>
        {errors[`reqJob_${index}`] && <small className="text-danger">{errors[`reqJob_${index}`]}</small>}
      </div>

      <div className="mb-3">
        <label className="form-label">REQID / Assignment ID</label>
        <input className="form-control" value={req.reqId} readOnly />
      </div>

      {/* Talent list (checkboxes) */}
      {req.jobTitle && (
        <>
          <TalentList
            jobTitle={req.jobTitle}
            talentData={talentData}
            selectedTalents={req.talents}
            toggleTalent={toggleTalent}
            poType={poType}
          />
          {errors[`reqSel_${index}`] && <small className="text-danger">{errors[`reqSel_${index}`]}</small>}
        </>
      )}

      {/* Talent details for each selected talent */}
      {req.talents.map((t, ti) => (
        <TalentDetails
          key={t.id}
          talent={t}
          talentIndex={ti}
          onChange={(field, value) => updateTalentField(ti, field, value)}
          errors={{
            rate: errors[`rate_${index}_${ti}`],
            sDate: errors[`sDate_${index}_${ti}`],
            eDate: errors[`eDate_${index}_${ti}`],
          }}
        />
      ))}
    </div>
  );
}
