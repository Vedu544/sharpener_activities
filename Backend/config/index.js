import sequelize from "./sequelize.js";

// Models
import User from "../models/user.model.js"
import Expense from "../models/expense.model.js";
import Order from "../models/order.model.js";

// Associations (if any are inside models, this is optional)
const db = {};

db.sequelize = sequelize;
db.User = User;
db.Expense = Expense;
db.Order = Order;

export { sequelize, User, Expense, Order };
export default db;
