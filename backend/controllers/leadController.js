const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {
  const lead = await Lead.create(req.body);
  res.status(201).json(lead);
};

exports.getLeads = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 20;
    if (limit > 100) limit = 100; 
    let skip = (page - 1) * limit;

    
    const total = await Lead.countDocuments();

    
    const leads = await Lead.find().skip(skip).limit(limit);

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
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: "Not found" });
  res.json(lead);
};

exports.updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!lead) return res.status(404).json({ message: "Not found" });
  res.json(lead);
};

exports.deleteLead = async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Lead deleted" });
};
