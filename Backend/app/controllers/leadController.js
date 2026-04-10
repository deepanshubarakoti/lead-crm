const leadModel = require("../models/Lead");

async function createLead(req, res) {
  try {
    const { customerName, phone, service, status, leadSource, notes } =
      req.body;
    const businessId = req.user.businessId;

    if (!customerName || !phone || !service || !leadSource) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const lead = await leadModel.create({
      businessId,
      customer_name: customerName,
      phone,
      service,
      status,
      lead_source: leadSource,
      notes,
    });

    res.status(201).json({
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    console.error("Create Lead Error:", error);

    res.status(500).json({
      message: "Server error while creating lead",
    });
  }
}



async function getAllLeads(req, res) {
  try {
    const businessId = req.user.businessId;

    const leads = await leadModel.find({ businessId });

    res.status(200).json({
      message: "Leads fetched successfully",
      leads,
    });
  } catch (error) {
    console.error("Fetch Leads Error:", error);

    res.status(500).json({
      message: "Server error while fetching leads",
    });
  }
}





async function updateLead(req, res) {
  try {
    const { id } = req.params
    const { customerName, phone, service, status, leadSource, notes } = req.body
    const businessId = req.user.businessId

    if (!id) {
      return res.status(400).json({ message: "Lead id required" })
    }

    const lead = await leadModel.findOneAndUpdate(
      { _id: id, businessId },
      {
        $set: {
          customer_name: customerName,
          phone,
          service,
          status,
          lead_source: leadSource,
          notes,
        }
      },
      { new: true }
    )

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" })
    }

    res.status(200).json({
      message: "Lead updated successfully",
      lead,
    })

  } catch (error) {
    res.status(500).json({ message: "Server error while updating lead" })
  }
}


async function deleteLead(req, res) {
  try {

    const { id } = req.params;
    const businessId = req.user.businessId;

    if (!id) {
      return res.status(400).json({
        message: "Lead id required"
      });
    }

    const lead = await leadModel.findOneAndDelete({
      _id: id,
      businessId
    });

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    res.status(200).json({
      message: "Lead deleted successfully"
    });

  } catch (error) {

    console.error("Delete Lead Error:", error);

    res.status(500).json({
      message: "Server error while deleting lead"
    });

  }
}


module.exports = { createLead, getAllLeads, updateLead, deleteLead }
