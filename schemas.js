import { ObjectId } from "bson";

class Stores {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    branch,
    owner,
    id,
    store_type
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.branch = branch;
    this.owner = owner;
    this.store_type = store_type;
  }

  
  static schema = {
    name: "Stores",
    properties: {
      _id: "string",
      _partition: "string",
      name: "string",
      branch: "string",
      owner: "string?",
      store_type: "string"
    },
    primaryKey: "_id",
  };
}

class AttendanceLogs {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    date,
    partition,
    store_name,
    store_id,
    id,
    timeStamp,
    attendant_id,
    attendant_name,
    year,
    year_month,
    year_week,
    inStamp,
    outStamp
  }) {
    this._partition = partition;
    this._id = id;
    this.date = date;
    this.store_name = store_name;
    this.store_id = store_id;
    this.timeStamp = timeStamp;
    this.attendant_id = attendant_id;
    this.attendant_name = attendant_name;
    this.year = year;
    this.year_month = year_month;
    this.year_week = year_week;
    this.inStamp = inStamp;
    this.outStamp = outStamp;
  }

  
  static schema = {
    name: "AttendanceLogs",
    properties: {
      _id: "string?",
      _partition: "string?",
      date: "string",
      store_name: "string",
      store_id: "string",
      timeStamp: "int",
      attendant_id: "string",
      attendant_name: "string",
      year: "string",
      year_month: "string",
      year_week: "string",
      inStamp: "int",
      outStamp: "int",
    },
    primaryKey: "_id",
  };
}


class List {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    brand,
    oprice,
    sprice,
    unit,
    category,
    store_id,
    store,
    quantity,
    id,
    timeStamp
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.brand = brand;
    this.oprice = oprice;
    this.sprice = sprice;
    this.unit = unit;
    this.category = category;
    this.store_id = store_id;
    this.store = store;
    this.quantity = quantity;
    this.timeStamp = timeStamp;
  }

  
  static schema = {
    name: "List",
    properties: {
      _id: "string?",
      _partition: "string?",
      uid: 'string',
      name: "string",
      brand: "string",
      oprice: "int",
      sprice: "int",
      unit: "string",
      category: "string",
      store_id: "string",
      store: "string",
      quantity: "int",
      timeStamp: "int",
    },
    primaryKey: "_id",
  };
}


class ArchiveInfo {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    partition,
    id,
    store_id,
    store_name,
    date,
    products,
    total,
    timeStamp
  }) {
    this._partition = partition;
    this._id = id;
    this.store_id = store_id;
    this.store_name = store_name;
    this.date = date;
    this.products = products;
    this.total = total;
    this.timeStamp = timeStamp;
  }

  
  static schema = {
    name: "ArchiveInfo",
    properties: {
      _id: "string?",
      _partition: "string?",
      store_id: 'string',
      store_name: 'string',
      date: 'string',
      total: 'int',
      timeStamp: 'string',
    },
    primaryKey: "_id",
  };
}

class Product {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    brand,
    oprice,
    sprice,
    unit,
    category,
    store_id,
    store,
    stock,
    id

  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.brand = brand;
    this.oprice = oprice;
    this.sprice = sprice;
    this.unit = unit;
    this.category = category;
    this.store_id = store_id;
    this.store = store;
    this.stock = stock;
  }

  
  static schema = {
    name: "Products",
    properties: {
      _id: "string?",
      _partition: "string?",
      uid: 'string',
      name: "string",
      brand: "string",
      oprice: "int",
      sprice: "int",
      unit: "string",
      category: "array",
      store_id: "string",
      store: "string",
      stock: "int"
    },
    primaryKey: "_id",
  };
}

class Categories {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    category,
    partition,
    store_id,
    name,
    id
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.category = category;
    this.store_id = store_id;
  }

  
  static schema = {
    name: "Categories",
    properties: {
      _id: "string?",
      _partition: "string?",
      store_id: 'string',
      name: 'string',
      category: "string",
    },
    primaryKey: "_id",
  };
}

class Expenses {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    description,
    partition,
    store_id,
    category,
    date,
    attendant,
    attendant_id,
    amount,
    timeStamp,
    id,
    year,
    year_month,
    year_week
  }) {
    this._partition = partition;
    this._id = id;
    this.description = description;
    this.store_id = store_id;
    this.category = category;
    this.date = date;
    this.attendant = attendant;
    this.attendant_id = attendant_id;
    this.amount = amount;
    this.timeStamp = timeStamp;
    this.year = year,
    this.year_month = year_month,
    this.year_week = year_week
  }

  
  static schema = {
    name: "Expenses",
    properties: {
      _id: "string?",
      _partition: "string?",
      uid: 'string',
      description: "string",
      store_id: "string",
      category: "string",
      date: 'string',
      attendant: "string",
      attendant_id: "string",
      amount: "int",
      timeStamp: "int",
      year: 'string',
      year_month: 'string',
      year_week: 'string',
    },
    primaryKey: "_id",
  };
}

class Customers {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    address,
    partition,
    credit_balance,
    mobile_no,
    name,
    store,
    store_id,
    tel_no,
    id

  }) {
    this._partition = partition;
    this._id = id;
    this.address = address;
    this.store_id = store_id;
    this.credit_balance = credit_balance;
    this.mobile_no = mobile_no;
    this.name = name;
    this.store = store;
    this.tel_no = tel_no;
  }

  
  static schema = {
    name: "Customers",
    properties: {
      _id: "string?",
      _partition: "string?",
      uid: 'string',
      address: "string",
      store_id: "string",
      credit_balance: "string",
      mobile_no: 'string',
      name: "string",
      store: "string",
      tel_no: "string",
    },
    primaryKey: "_id",
  };
}

class Staffs {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    password,
    partition,
    login_am,
    login_pm,
    name,
    store,
    store_id,
    logout_am,
    logout_pm,
    id
  }) {
    this._partition = partition;
    this._id = id;
    this.login_am = login_am;
    this.store_id = store_id;
    this.login_pm = login_pm;
    this.logout_am = logout_am;
    this.name = name;
    this.store = store;
    this.logout_pm = logout_pm;
    this.password = password;
  }

  
  static schema = {
    name: "Staffs",
    properties: {
      _id: "string?",
      _partition: "string?",
      uid: 'string',
      password: "string",
      store_id: "string",
      login_am: "string",
      login_pm: 'string',
      name: "string",
      store: "string",
      logout_pm: "string",
      logout_am: "string"
    },
    primaryKey: "_id",
  };
}

class Transactions {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    store_name,
    store_id,
    partition,
    date,
    timeStamp,
    customer_name,
    customer_id,
    total,
    id,
    attendant_name,
    attendant_id,
    year,
    year_month,
    year_week,
    payment_method,
    status,
    total_items,
    discount,
    discount_name,
    vat,
    received,
    change
  }) {
    this._partition = partition;
    this._id = id;
    this.store_name = store_name,
    this.store_id = store_id,
    this.date = date,
    this.timeStamp = timeStamp,
    this.customer_name = customer_name,
    this.customer_id = customer_id,
    this.total = total,
    this.attendant_name = attendant_name,
    this.attendant_id = attendant_id,
    this.year = year,
    this.year_month = year_month,
    this.year_week = year_week,
    this.payment_method = payment_method,
    this.status = status
    this.total_items = total_items,
    this.discount = discount,
    this.discount_name = discount_name,
    this.vat = vat,
    this.received = received,
    this.change = change
  }
 
  static schema = {
    name: "Transactions",
    properties: {
      _id: "string?",
      _partition : "string?",
      store_name: "string",
      store_id: "string",
      date: "string",
      timeStamp: "int",
      customer_name: "string",
      customer_id: "string",
      total: "int",
      attendant_name: "string",
      attendant_id: "string",
      year: "string",
      year_month: "string",
      year_week: "string",
      payment_method:"string",
      status: "string",
      total_items: "int",
      discount: "int",
      discount_name: 'string',
      vat: "int",
      received: "int",
      change: "int"
    },
    primaryKey: "_id",
  };
}


class BO {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    store_name,
    store_id,
    partition,
    date,
    timeStamp,
    total,
    id,
    attendant_name,
    attendant_id,
    year,
    year_month,
    year_week,
    quantity,
    product_name,
    product_id
  }) {
    this._partition = partition;
    this._id = id;
    this.store_name = store_name,
    this.store_id = store_id,
    this.date = date,
    this.timeStamp = timeStamp,
    this.quantity = quantity,
    this.product_name = product_name,
    this.total = total,
    this.attendant_name = attendant_name,
    this.attendant_id = attendant_id,
    this.year = year,
    this.year_month = year_month,
    this.year_week = year_week,
    this.product_id = product_id
  }
 
  static schema = {
    name: "BO",
    properties: {
      _id: "string?",
      _partition : "string?",
      store_name: "string",
      store_id: "string",
      date: "string",
      timeStamp: "int",
      product_id: "string",
      product_name: "string",
      total: "int",
      attendant_name: "string",
      attendant_id: "string",
      year: "string",
      year_month: "string",
      year_week: "string",
      quantity:"int"
    },
    primaryKey: "_id",
  };
}


class Returned {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    store_name,
    store_id,
    partition,
    date,
    timeStamp,
    total,
    id,
    attendant_name,
    attendant_id,
    year,
    year_month,
    year_week,
    quantity,
    product_name,
    product_id
  }) {
    this._partition = partition;
    this._id = id;
    this.store_name = store_name,
    this.store_id = store_id,
    this.date = date,
    this.timeStamp = timeStamp,
    this.quantity = quantity,
    this.product_name = product_name,
    this.total = total,
    this.attendant_name = attendant_name,
    this.attendant_id = attendant_id,
    this.year = year,
    this.year_month = year_month,
    this.year_week = year_week,
    this.product_id = product_id
  }
 
  static schema = {
    name: "Returned",
    properties: {
      _id: "string?",
      _partition : "string?",
      store_name: "string",
      store_id: "string",
      date: "string",
      timeStamp: "int",
      product_id: "string",
      product_name: "string",
      total: "int",
      attendant_name: "string",
      attendant_id: "string",
      year: "string",
      year_month: "string",
      year_week: "string",
      quantity:"int"
    },
    primaryKey: "_id",
  };
}

class Credit_Logs {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    id,
    partition,
    store_name,
    store_id,
    date,
    timeStamp,
    customer_name,
    customer_id,
    total,
    year,
    year_month,
    year_week,
    attendant_name,
    attendant_id
  }) {
    this._partition = partition;
    this._id = id;
    this.store_name = store_name,
    this.store_id = store_id,
    this.date = date,
    this.timeStamp = timeStamp,
    this.customer_name = customer_name,
    this.customer_id = customer_id,
    this.total = total,
    this.year =year,
    this.year_month =year_month,
    this.year_week =year_week,
    this.attendant_name =attendant_name,
    this.attendant_id =attendant_id
  }
 
  static schema = {
    name: "Credit_Logs",
    properties: {
      _id: "string?",
      _partition : "string?",
      store_name: "string",
      store_id: "string",
      date: "string",
      timeStamp: "int",
      customer_name: "string",
      customer_id: "string",
      total: "int",
      year : "string",
      year_month: "string",
      year_week: "string",
      attendant_name: "string",
      attendant_id: "string"
    },
    primaryKey: "_id",
  };
}

class Credit_List {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    brand,
    oprice,
    sprice,
    unit,
    category,
    store_id,
    store,
    quantity,
    cr_id,
    id, 
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.brand = brand;
    this.oprice = oprice;
    this.sprice = sprice;
    this.unit = unit;
    this.category = category;
    this.store_id = store_id;
    this.store = store;
    this.cr_id = cr_id;
    this.quantity = quantity;
  }

  
  static schema = {
    name: "Credit_List",
    properties: {
      _id: "string?",
      _partition: "string?",
      name: "string",
      brand: "string",
      oprice: "int",
      sprice: "int",
      unit: "string",
      category: "string",
      store_id: "string",
      store: "string",
      quantity: "int",
      cr_id: 'string'
    },
    primaryKey: "_id",
  };
}

class TR_Details {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    brand,
    oprice,
    sprice,
    unit,
    category,
    store_id,
    store,
    quantity,
    tr_id,
    id,
    year,
    year_month,
    year_week,
    date,
    timeStamp,
    product_id,
    status,
    attendant_name,
    attendant_id,
    addon,
    addon_price,
    addon_cost,
    option
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.brand = brand;
    this.oprice = oprice;
    this.sprice = sprice;
    this.unit = unit;
    this.category = category;
    this.store_id = store_id;
    this.store = store;
    this.tr_id = tr_id;
    this.quantity = quantity;
    this.year = year,
    this.year_month = year_month ,
    this.year_week = year_week,
    this.date = date,
    this.timeStamp = timeStamp,
    this.product_id = product_id,
    this.status = status,
    this.attendant_name = attendant_name,
    this.attendant_id = attendant_id,
    this.addon = addon,
    this.addon_price = addon_price,
    this.addon_cost = addon_cost,
    this.option = option
  }

  
  static schema = {
    name: "TR_Details",
    properties: {
      _id: "string?",
      _partition: "string?",
      name: "string",
      brand: "string",
      oprice: "int",
      sprice: "int",
      unit: "string",
      category: "string",
      store_id: "string",
      store: "string",
      quantity: "int",
      tr_id: 'string',
      year: 'string',
      year_month: 'string',
      year_week: 'string',
      date: 'string',
      timeStamp: 'int',
      status: 'string',
      attendant_name: "string",
      attendant_id: "string",
      addon: "string",
      addon_price: "float",
      addon_cost: "float",
      option: "string",
    },
    primaryKey: "_id",
  };
}

class Archive {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    brand,
    oprice,
    sprice,
    unit,
    category,
    store_id,
    store,
    quantity,
    id,
    timeStamp,
    archive_id
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.brand = brand;
    this.oprice = oprice;
    this.sprice = sprice;
    this.unit = unit;
    this.category = category;
    this.store_id = store_id;
    this.store = store;
    this.quantity = quantity;
    this.timeStamp = timeStamp;
    this.archive_id = archive_id;
  }

  
  static schema = {
    name: "Archive",
    properties: {
      _id: "string?",
      _partition: "string?",
      uid: 'string',
      name: "string",
      brand: "string",
      oprice: "int",
      sprice: "int",
      unit: "string",
      category: "string",
      store_id: "string",
      store: "string",
      quantity: "int",
      timeStamp: "int",
      archive_id: "string"
    },
    primaryKey: "_id",
  };
}


class Discount {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    id,
    partition,
    transaction_id,
    discount_total,
    attendant,
    attendant_id,
    store,
    store_id,
    date,
    year,
    year_week,
    year_month,
    timeStamp,
    customer_name,
    customer_id

  }) {
    this._partition = partition;
    this._id = id;
    this.transaction_id =transaction_id;
    this.discount_total = discount_total;
    this.attendant = attendant,
    this.attendant_id = attendant_id,
    this.store_id = store_id,
    this.store = store
    this.date = date,
    this.year = year,
    this.year_week = year_week,
    this.year_month = year_month,
    this.timeStamp = timeStamp,
    this.customer_name = customer_name,
    this.customer_id = customer_id

  }

  
  static schema = {
    name: "Discount",
    properties: {
      _id: "string?",
      _partition: "string?",
      transaction_id: "string", 
      discount_total: "int", 
      attendant: "string",
      attendant_id: "string",
      store_id: "string",  
      store: "string",
      date: "string",
      year: "string",
      year_week: "string",
      year_month: "string",
      timeStamp: "int",
      customer_name: "string", 
      customer_id: "string", 
 
    },
    primaryKey: "_id",
  };
}
class Inventory {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    partition,
    id,
    name,
    cost,
    price,
    product_id
   
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.cost = cost;
    this.price = price;
    this.product_id = product_id
   
  }
 
  static schema = {
    name: "Inventory",
    properties: {
      _id: "string",
      _partition : "string",
      name: "string",
      cost: "float",
      price: "float",
      product_id: "string"
    },
    primaryKey: "_id",
  };
}

class Addon {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    partition,
    id,
    name,
    cost,
    price,
    product_id
   
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.cost = cost;
    this.price = price;
    this.product_id = product_id
   
  }
 
  static schema = {
    name: "Addon",
    properties: {
      _id: "string",
      _partition : "string",
      name: "string",
      cost: "float",
      price: "float",
      product_id: "string"
    },
    primaryKey: "_id",
  };
}
class Option {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    partition,
    id,
    option,
    product_id
   
  }) {
    this._partition = partition;
    this._id = id;
    this.option = option;
    this.product_id = product_id
   
  }
 
  static schema = {
    name: "Option",
    properties: {
      _id: "string",
      _partition : "string",
      option: "string",
      product_id: "string"
    },
    primaryKey: "_id",
  };
}
export { Stores, 
         Product, 
         Categories, 
         Expenses, 
         Customers, 
         Staffs, 
         List, 
         Transactions, 
         TR_Details, 
         Archive, 
         ArchiveInfo, 
         AttendanceLogs, 
         Credit_List, 
         Credit_Logs, 
         BO, 
         Returned, 
         Discount,
        Inventory,
        Addon,
        Option };
