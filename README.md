Purchase Order Form – React Application

A fully functional React.js application for creating Purchase Orders with support for:

Purchase Order Details

Dynamic REQ Sections

Talent Selection & Detail Entry

PO Type Rules (Group vs Individual)

Full Validation

Modular component-based architecture

This project follows all requirements from the assignment:
"React.js Assessment: Purchase Order Form Development"

🚀 Features
🧾 1. Purchase Order Details

Client Name (Mandatory)

PO Type: Group / Individual

Purchase Order Number

Received On

Received From (Name, Email)

PO Start & End Date

Budget + Currency Selector

Full validation for each field

📂 2. Dynamic REQ Sections

Job Title dropdown based on selected client

Auto-filled REQID (Assignment ID)

Multiple REQ sections for Group PO

Only one REQ section for Individual PO

“Add Another” button appears only for Group PO

👥 3. Talent Selection

Talent list shown after selecting Job Title

Checkbox selection

Individual PO: Only 1 talent allowed

Group PO: Minimum 2 talents required

Selected talents expand into mandatory fields:

Rate Card

Start Date

End Date

✔ 4. Validation

PO details validation

Talent selection rules

Talent date validation

Talent fields required if selected

All validation errors shown below fields

📦 5. Modular Project Structure
src/
├─ App.jsx
├─ main.jsx
├─ index.css
└─ components/
   ├─ PurchaseOrderDetails.jsx
   ├─ ReqSection.jsx
   ├─ TalentList.jsx
   └─ TalentDetails.jsx

💾 6. Final Submission

Form data (PO + REQs + Talent) logged to console on successful submit

Fully ready for integration with backend API

🛠️ Technologies Used

React.js (functional components + hooks)

Vite (fast development)

Bootstrap (styling)

JavaScript (ES6+)

CSS

📦 Installation & Setup
# Clone the repository
git clone <your-repo-url>

# Navigate into project
cd purchase-order-form

# Install dependencies
npm install

# Start development server
npm run dev


The app will run at:
👉 http://localhost:5173

🧩 Directory Structure
src/
│
├── App.jsx              # Main application logic
│
├── components/
│   ├── PurchaseOrderDetails.jsx   # PO Details section
│   ├── ReqSection.jsx             # REQ block with job & talents
│   ├── TalentList.jsx             # Talent checkboxes
│   ├── TalentDetails.jsx          # Selected talent fields
│
├── main.jsx             # React entry point
└── index.css            # Global styles

🛡️ Validation Summary
Purchase Order Fields
Field	Validation
Client Name	Required
PO Type	Required
PO Number	Required
Received On	Required
Received From (Name & Email)	Required, email regex
PO Dates	Start ≤ End
Budget	Max 5 digits
Currency	Required
REQ Validations
PO Type	Rule
Individual	Exactly 1 talent must be selected
Group	Minimum 2 talents must be selected
Talent Validations

Rate Card required

Start Date required

End Date required

Talent Start ≥ PO Start

Talent End ≤ PO End

Talent End ≥ Talent Start

📤 Form Submission

When valid:

Shows success alert

Logs final consolidated data:

{
  ...purchaseOrderDetails,
  reqs: [
    {
      jobTitle,
      reqId,
      talents: [
        { id, name, rateCard, startDate, endDate }
      ]
    }
  ]
}

🧹 Reset Behavior

Clicking Reset:

Clears form fields

Resets REQ list to 1 empty section

Clears all validation errors

👨‍💻 Developer Notes

No external APIs used — mock data included

Fully modular & scalable code structure

Easy to integrate with backend API later

All components use controlled inputs

Clean state lifting (App.jsx is master state)
