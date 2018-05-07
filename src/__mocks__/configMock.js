/* eslint-disable */

export const mockConfigJson =
[
  {
    "name": "disability-income",
    "policyConfiguration": {
      "fields": [
        {
          "name": "producerNumber",
          "order": "0",
          "title": "Producer Number",
          "type": "string"
        },
        {
          "name": "appointmentStatus",
          "order": "1",
          "title": "Appointment Status",
          "type": "string"
        },
        {
          "name": "licenseNumber",
          "order": "2",
          "title": "License Number",
          "type": "string"
        },
        {
          "name": "licenseEffectiveDate",
          "order": "3",
          "title": "License Effective Date",
          "type": "string"
        },
        {
          "name": "licenseState",
          "order": "4",
          "title": "License State",
          "type": "string"
        },
        {
          "name": "company",
          "order": "5",
          "title": "Company",
          "type": "string"
        },
        {
          "name": "producerIsCertified",
          "order": "6",
          "title": "Producer is Certified",
          "type": "string"
        },
        {
          "name": "mode",
          "order": "7",
          "title": "Payment Plan",
          "newline": true,
          "values": [
            "Monthly",
            "Annual"
          ],
          "type": "select"
        },
        {
          "name": "address",
          "order": "8",
          "title": "Street Address",
          "newline": true,
          "type": "string"
        },
        {
          "name": "city",
          "order": "9",
          "title": "City of Residence",
          "type": "string"
        },
        {
          "name": "state",
          "order": "10",
          "title": "State",
          "values": [
            "NE",
            "CA"
          ],
          "type": "select"
        },
        {
          "name": "zipcode",
          "order": "11",
          "title": "Zip Code of Residence",
          "regex": "^([0-9]){5}-?([0-9]{4})?$",
          "type": "string"
        }
      ],
      "exposures": [
        {
          "name": "insured_person",
          "displayName": "Insured Person",
          "fields": [
            {
              "name": "gender",
              "order": "0",
              "title": "Gender",
              "heading": "Demographics",
              "values": [
                "Male",
                "Female"
              ],
              "type": "select"
            },
            {
              "name": "dob",
              "order": "1",
              "title": "Date of Birth of Insured",
              "precision": "day",
              "type": "date"
            },
            {
              "name": "income",
              "order": "2",
              "title": "Income",
              "type": "number"
            },
            {
              "name": "occupation",
              "order": "3",
              "title": "Occupation",
              "values": [
                "1A",
                "2A",
                "3A",
                "4A",
                "5A",
                "6A"
              ],
              "type": "select"
            },
            {
              "name": "height_ft",
              "order": "4",
              "title": "Height (ft)",
              "newline": true,
              "heading": "Medical Underwriting",
              "values": [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7"
              ],
              "type": "select"
            },
            {
              "name": "height_inches",
              "order": "5",
              "title": "Height (inches)",
              "values": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11"
              ],
              "type": "select"
            },
            {
              "name": "weight",
              "order": "6",
              "title": "Weight (lbs)",
              "type": "number"
            },
            {
              "name": "diabetes",
              "order": "7",
              "title": "Do you have diabetes?",
              "values": [
                "Yes",
                "No"
              ],
              "type": "select"
            },
            {
              "name": "hospitalized",
              "order": "8",
              "title": "Have you been hospitalized in the last 12 months?",
              "newline": true,
              "values": [
                "Yes",
                "No"
              ],
              "type": "select"
            },
            {
              "name": "hospitalized_missed_work",
              "order": "9",
              "title": "Did you miss work as a result?",
              "condition": {
                "hospitalized": [
                  "Yes"
                ]
              },
              "values": [
                "Yes",
                "No"
              ],
              "type": "select"
            },
            {
              "name": "seen_doctor",
              "order": "10",
              "title": "Have you seen a doctor for any other reason?",
              "newline": true,
              "values": [
                "Yes",
                "No"
              ],
              "type": "select"
            },
            {
              "name": "seen_doctor_explanation",
              "order": "11",
              "title": "Please explain",
              "condition": {
                "seen_doctor": [
                  "Yes"
                ]
              },
              "type": "string"
            },
            {
              "name": "financials",
              "order": "12",
              "title": "Please attach financials",
              "width": "12",
              "optional": true,
              "repeatable": false,
              "type": "media"
            },
            {
              "name": "pharma_report",
              "order": "13",
              "title": "Please attach pharma report",
              "width": "12",
              "optional": true,
              "repeatable": false,
              "type": "media"
            },
            {
              "name": "aps",
              "order": "14",
              "title": "Please attach Attending Physician Statement form",
              "width": "12",
              "optional": true,
              "repeatable": false,
              "type": "media"
            },
            {
              "name": "basemoben",
              "order": "15",
              "title": "Base Monthly Benefit",
              "heading": "Plan Design",
              "type": "number"
            }
          ],
          "perils": [
            {
              "name": "ext_own_occ",
              "displayName": "Extended Own Occupation",
              "fields": [],
              "indemnityPerItem": "0.00",
              "indemnityPerEvent": "0.00",
              "indemnityInAggregate": "0.00",
              "lumpSumPayment": "0.00",
              "deductible": "0.00",
              "externalDataCalls": []
            },
            {
              "name": "base",
              "displayName": "Base",
              "fields": [],
              "indemnityPerItem": "0.00",
              "indemnityPerEvent": "0.00",
              "indemnityInAggregate": "0.00",
              "lumpSumPayment": "0.00",
              "deductible": "0.00",
              "externalDataCalls": []
            },
            {
              "name": "fio",
              "displayName": "FIO",
              "fields": [],
              "indemnityPerItem": "0.00",
              "indemnityPerEvent": "0.00",
              "indemnityInAggregate": "0.00",
              "lumpSumPayment": "0.00",
              "deductible": "0.00",
              "externalDataCalls": []
            }
          ],
          "externalDataCalls": []
        }
      ],
      "documents": [
        {
          "displayName": "Policy Schedule",
          "fileName": "schedule.pdf",
          "templateName": "schedule.template.liquid",
          "type": "pdf"
        },
        {
          "displayName": "Special Notice",
          "fileName": "special_notice.pdf",
          "templateName": "special_notice.template.liquid",
          "type": "pdf"
        }
      ],
      "externalDataCalls": [
        {
          "triggerField": "producerNumber",
          "targetFields": [
            "licenseEffectiveDate",
            "appointmentStatus",
            "licenseNumber",
            "licenseState",
            "company",
            "producerIsCertified"
          ]
        }
      ],
      "taxes": [],
      "fees": [],
      "endorsements": [
        {
          "name": "generic",
          "displayName": "Policy Change",
          "documents": [
            {
              "displayName": "Policy Change",
              "fileName": "endorsement.pdf",
              "templateName": "endt.template.liquid",
              "type": "pdf"
            }
          ],
          "reprice": "always"
        }
      ],
      "defaultPaymentTerms": {
        "amount": "0",
        "unit": "day"
      },
      "paymentSchedules": [
        {
          "type": "total",
          "name": "upfront",
          "displayName": "Up Front"
        },
        {
          "type": "monthly",
          "name": "monthly",
          "displayName": "Monthly"
        }
      ],
      "cancellations": {
        "proration": "30E/360"
      }
    }
  },
  {
    "name": "global",
    "policyConfiguration": {
      "fields": [],
      "exposures": [],
      "documents": [],
      "externalDataCalls": [],
      "taxes": [],
      "fees": [],
      "endorsements": [],
      "paymentSchedules": [],
      "cancellations": {
        "proration": "30E/360"
      }
    }
  }
];
