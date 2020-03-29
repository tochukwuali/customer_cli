const mongoose = require('mongoose');

mongoose.Promise = global.Promise

mongoose.connect('mongodb://127.0.0.1:27017/customer', { useNewUrlParser: true, useUnifiedTopology: true } );
const connection = mongoose.connection;

const Customer  = require('./models/customer')

//add Customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
         console.info('New Customer Added')
         connection.close()
     })
}

//find customer
const findCustomer = (name) => {
    const search = new RegExp(name, 'i')
    Customer.find({$or: [{firstname: search}, {lastname:search}]})
        .then(customer => {
            console.info(customer)
            console.info(`${customer.length} matches`)
            connection.close()
    })
}

//update Customer
const updateCustomer = (_id, customer) => {
    Customer.updateOne({_id}, customer)
    .then(customer => {
        console.info('Customer Updated')
        connection.close()
    })
}

//Remove Customer
const removeCustomer = (_id) => {
    Customer.deleteOne({_id})
      .then(customer => {
          console.info('Customer Removed')
          connection.close()
      })
}

//find all Customers
const listCustomers = () => {
    Customer.find()
      .then(customer => {
          console.info(customer)
          console.info(`${customer.length} matches`)
          connection.close()
      })
}

module.exports = {
    addCustomer, 
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
};
