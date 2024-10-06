const express = require("express");
const employeeController = require("../controllers/employeeController");
const router = express.Router();

router.get("/employees", employeeController.getEmployees);

router.get("/employees/:id", employeeController.getEmployeeById);

router.post("/employees", employeeController.createEmployee);

router.put("/employees/:id", employeeController.updateEmployee);

router.delete("/employees", employeeController.deleteEmployee);

module.exports = router;
