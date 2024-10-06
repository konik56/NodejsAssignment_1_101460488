const Employee = require("../models/employeeModel");

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.createEmployee = async (req, res) => {
  console.log("Creating Employee");
  const {
    first_name,
    last_name,
    email,
    position,
    salary,
    date_of_joining,
    department,
  } = req.body;

  try {
    const employee = new Employee({
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
    });
    await employee.save();
    res
      .status(201)
      .json({
        message: "Employee created successfully",
        employee_id: employee._id,
      });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.updateEmployee = async (req, res) => {
  const { position, salary } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { position, salary },
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee details updated successfully.",
      employee,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.query.eid);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully." });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
