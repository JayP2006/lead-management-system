const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {
  try {
    console.log("REQ.USER >>>", req.user);   
    console.log("REQ.BODY >>>", req.body);   

    const lead = new Lead({
      ...req.body,
      createdBy: req.user.id   
    });

    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    console.error("ERROR in createLead >>>", err); 
    res.status(500).json({ message: "Error creating lead", error: err.message });
  }
};



exports.getLeads = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 20;
    if (limit > 100) limit = 100; 
    let skip = (page - 1) * limit;

    
    const total = await Lead.countDocuments({ createdBy: req.user.id });
const leads = await Lead.find({ createdBy: req.user.id })
  .skip(skip)
  .limit(limit);

    res.json({
      data: leads,                      
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit), 
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching leads" });
  }
};



exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({ 
      _id: req.params.id, 
      createdBy: req.user.id   
    });

    if (!lead) return res.status(404).json({ message: "Not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lead" });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );

    if (!lead) return res.status(404).json({ message: "Not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: "Error updating lead" });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({ 
      _id: req.params.id, 
      createdBy: req.user.id   
    });

    if (!lead) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting lead" });
  }
};
