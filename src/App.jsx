import { useState } from "react";
import PurchaseOrderDetails from "./components/PurchaseOrderDetails";
import ReqSection from "./components/ReqSection";

/**
 * App holds global form state, reqs state (with talents), errors, and handlers.
 * It passes data/handlers down to child components.
 */

// ---------- Mock data ----------
const clientReqMapping = {
  "Client A": [
    { title: "Frontend Developer", reqId: "REQ101" },
    { title: "Backend Developer", reqId: "REQ102" },
  ],
  "Client B": [
    { title: "UI/UX Designer", reqId: "REQ201" },
    { title: "DevOps Engineer", reqId: "REQ202" },
  ],
};

const talentData = {
  "Frontend Developer": [
    { id: "T101", name: "Rahul Sharma" },
    { id: "T102", name: "Aisha Khan" },
    { id: "T103", name: "Deep Patel" },
  ],
  "Backend Developer": [
    { id: "T104", name: "Suresh Mehta" },
    { id: "T105", name: "Aditya Verma" },
  ],
  "UI/UX Designer": [
    { id: "T106", name: "Priya Singh" },
    { id: "T107", name: "Sakshi Jain" },
  ],
  "DevOps Engineer": [{ id: "T108", name: "Rohan Gupta" }],
};

// ---------- Initial states ----------
const initialForm = {
  clientName: "",
  poType: "",
  poNumber: "",
  receivedOn: "",
  receivedFromName: "",
  receivedFromEmail: "",
  poStartDate: "",
  poEndDate: "",
  budget: "",
  currency: "",
};

// Each req: { jobTitle, reqId, talents: [{id,name,selected,rateCard,startDate,endDate}] }
const initialReq = { jobTitle: "", reqId: "", talents: [] };

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [reqs, setReqs] = useState([{ ...initialReq }]);
  const [errors, setErrors] = useState({});

  // -------- handlers --------
  const setFormField = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    // if client changed, reset reqs and their jobTitle/reqId/talents
    if (name === "clientName") {
      setReqs([{ ...initialReq }]);
    }
    // if PO type changed to Individual, ensure each req has at most 1 talent
    if (name === "poType" && value === "Individual") {
      setReqs((prev) =>
        prev.map((r) => ({
          ...r,
          talents: r.talents.slice(0, 1),
        }))
      );
    }
  };

  // REQ related handlers
  const updateReq = (index, updated) => {
    setReqs((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updated };
      return copy;
    });
  };

  const addReq = () => {
    setReqs((p) => [...p, { ...initialReq }]);
  };

  // Talent selection handler (toggle / set single selection for Individual)
  const toggleTalent = (reqIndex, talentObj) => {
    setReqs((prev) => {
      const copy = [...prev];
      const req = { ...copy[reqIndex] };
      const existsIndex = req.talents.findIndex((t) => t.id === talentObj.id);

      if (form.poType === "Individual") {
        // Selecting a talent replaces any existing selection
        if (existsIndex === -1) {
          req.talents = [
            {
              ...talentObj,
              selected: true,
              rateCard: "",
              startDate: "",
              endDate: "",
            },
          ];
        } else {
          // unselect if same talent clicked
          req.talents = [];
        }
      } else {
        // Group: toggle
        if (existsIndex === -1) {
          req.talents = [
            ...req.talents,
            { ...talentObj, selected: true, rateCard: "", startDate: "", endDate: "" },
          ];
        } else {
          req.talents = req.talents.filter((t) => t.id !== talentObj.id);
        }
      }

      copy[reqIndex] = req;
      return copy;
    });
  };

  // Update talent field inside a req
  const updateTalentField = (reqIndex, talentIndex, field, value) => {
    setReqs((prev) => {
      const copy = [...prev];
      copy[reqIndex] = {
        ...copy[reqIndex],
        talents: copy[reqIndex].talents.map((t, i) =>
          i === talentIndex ? { ...t, [field]: value } : t
        ),
      };
      return copy;
    });
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    // basic PO fields
    if (!form.clientName) newErrors.clientName = "Client name is required.";
    if (!form.poType) newErrors.poType = "PO type is required.";
    if (!form.poNumber) newErrors.poNumber = "PO number is required.";
    if (!form.receivedOn) newErrors.receivedOn = "Received on is required.";
    if (!form.receivedFromName) newErrors.receivedFromName = "Name is required.";
    if (!form.receivedFromEmail) newErrors.receivedFromEmail = "Email is required.";
    if (!form.poStartDate) newErrors.poStartDate = "Start date required.";
    if (!form.poEndDate) newErrors.poEndDate = "End date required.";
    if (!form.budget) newErrors.budget = "Budget is required.";
    if (!form.currency) newErrors.currency = "Currency is required.";

    const emailRegex = /\S+@\S+\.\S+/;
    if (form.receivedFromEmail && !emailRegex.test(form.receivedFromEmail)) {
      newErrors.receivedFromEmail = "Invalid email format.";
    }

    if (form.poStartDate && form.poEndDate) {
      if (new Date(form.poEndDate) < new Date(form.poStartDate)) {
        newErrors.poEndDate = "PO End Date cannot be earlier than Start Date.";
      }
    }

    if (form.budget && String(form.budget).length > 5) {
      newErrors.budget = "Budget must be max 5 digits.";
    }

    // REQ/talent validations
    reqs.forEach((r, ri) => {
      if (!r.jobTitle) {
        newErrors[`reqJob_${ri}`] = "Job Title required.";
      }

      // selection rules
      const selectedCount = r.talents.length;
      if (form.poType === "Individual") {
        if (selectedCount !== 1) {
          newErrors[`reqSel_${ri}`] = "Select exactly 1 talent for Individual PO.";
        }
      } else if (form.poType === "Group") {
        if (selectedCount < 2) {
          newErrors[`reqSel_${ri}`] = "Select at least 2 talents for Group PO.";
        }
      }

      // per-talent field checks
      r.talents.forEach((t, ti) => {
        if (!t.rateCard && t.selected) newErrors[`rate_${ri}_${ti}`] = "Rate card required.";
        if (!t.startDate && t.selected) newErrors[`sDate_${ri}_${ti}`] = "Start Date required.";
        if (!t.endDate && t.selected) newErrors[`eDate_${ri}_${ti}`] = "End Date required.";
        if (t.startDate && t.endDate && new Date(t.endDate) < new Date(t.startDate)) {
          newErrors[`eDate_${ri}_${ti}`] = "End Date cannot be before Start Date.";
        }

        // Ensure talent dates within PO dates (optional extra check)
        if (t.startDate && form.poStartDate && new Date(t.startDate) < new Date(form.poStartDate)) {
          newErrors[`sDate_${ri}_${ti}`] = "Talent Start Date cannot be before PO Start Date.";
        }
        if (t.endDate && form.poEndDate && new Date(t.endDate) > new Date(form.poEndDate)) {
          newErrors[`eDate_${ri}_${ti}`] = "Talent End Date cannot be after PO End Date.";
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("FINAL FORM:", form);
      console.log("REQS + TALENTS:", reqs);
      alert("Form validated and logged to console.");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Purchase Order Form</h2>

      <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm">
        <PurchaseOrderDetails
          form={form}
          setFormField={setFormField}
          errors={errors}
        />

        <div className="mt-4">
          <h4>Talent Requirements</h4>
          <hr />

          {reqs.map((r, i) => (
            <ReqSection
              key={i}
              index={i}
              req={r}
              clientName={form.clientName}
              clientReqMapping={clientReqMapping}
              talentData={talentData}
              poType={form.poType}
              updateReq={(upd) => updateReq(i, upd)}
              toggleTalent={(tal) => toggleTalent(i, tal)}
              updateTalentField={(ti, field, val) => updateTalentField(i, ti, field, val)}
              errors={errors}
            />
          ))}

          {form.poType === "Group" && (
            <button type="button" className="btn btn-outline-primary mt-2" onClick={addReq}>
              + Add Another
            </button>
          )}
        </div>

        <div className="mt-4 d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setForm(initialForm);
              setReqs([{ ...initialReq }]);
              setErrors({});
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
