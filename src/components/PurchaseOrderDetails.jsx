import React from "react";

/**
 * PurchaseOrderDetails
 * Controlled component for top-level PO fields.
 */
export default function PurchaseOrderDetails({ form, setFormField, errors }) {
  return (
    <div>
      <h4>Purchase Order Details</h4>
      <hr />

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Client Name *</label>
          <select
            className="form-select"
            name="clientName"
            value={form.clientName}
            onChange={(e) => setFormField("clientName", e.target.value)}
          >
            <option value="">Select Client</option>
            <option value="Client A">Client A</option>
            <option value="Client B">Client B</option>
          </select>
          {errors.clientName && <small className="text-danger">{errors.clientName}</small>}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Purchase Order Type *</label>
          <select
            className="form-select"
            name="poType"
            value={form.poType}
            onChange={(e) => setFormField("poType", e.target.value)}
          >
            <option value="">Select PO Type</option>
            <option value="Group">Group PO</option>
            <option value="Individual">Individual PO</option>
          </select>
          {errors.poType && <small className="text-danger">{errors.poType}</small>}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Purchase Order No *</label>
        <input
          className="form-control"
          name="poNumber"
          value={form.poNumber}
          onChange={(e) => setFormField("poNumber", e.target.value)}
        />
        {errors.poNumber && <small className="text-danger">{errors.poNumber}</small>}
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Received On *</label>
          <input
            type="date"
            className="form-control"
            name="receivedOn"
            value={form.receivedOn}
            onChange={(e) => setFormField("receivedOn", e.target.value)}
          />
          {errors.receivedOn && <small className="text-danger">{errors.receivedOn}</small>}
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">PO Start Date *</label>
          <input
            type="date"
            className="form-control"
            name="poStartDate"
            value={form.poStartDate}
            onChange={(e) => setFormField("poStartDate", e.target.value)}
          />
          {errors.poStartDate && <small className="text-danger">{errors.poStartDate}</small>}
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">PO End Date *</label>
          <input
            type="date"
            className="form-control"
            name="poEndDate"
            value={form.poEndDate}
            onChange={(e) => setFormField("poEndDate", e.target.value)}
          />
          {errors.poEndDate && <small className="text-danger">{errors.poEndDate}</small>}
        </div>
      </div>

      <h5 className="mt-3">Received From *</h5>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Name *</label>
          <input
            className="form-control"
            name="receivedFromName"
            value={form.receivedFromName}
            onChange={(e) => setFormField("receivedFromName", e.target.value)}
          />
          {errors.receivedFromName && <small className="text-danger">{errors.receivedFromName}</small>}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className="form-control"
            name="receivedFromEmail"
            value={form.receivedFromEmail}
            onChange={(e) => setFormField("receivedFromEmail", e.target.value)}
          />
          {errors.receivedFromEmail && <small className="text-danger">{errors.receivedFromEmail}</small>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Budget *</label>
          <input
            type="number"
            className="form-control"
            name="budget"
            value={form.budget}
            onChange={(e) => setFormField("budget", e.target.value)}
          />
          {errors.budget && <small className="text-danger">{errors.budget}</small>}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Currency *</label>
          <select
            className="form-select"
            name="currency"
            value={form.currency}
            onChange={(e) => setFormField("currency", e.target.value)}
          >
            <option value="">Select Currency</option>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          {errors.currency && <small className="text-danger">{errors.currency}</small>}
        </div>
      </div>
    </div>
  );
}
