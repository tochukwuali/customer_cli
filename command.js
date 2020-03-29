#!/usr/bin/env node
const program = require('commander')
const { prompt } = require('inquirer')

const {
    addCustomer, 
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
} = require('./index')

const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Customer First Name'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Customer Last Name'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Customer Email'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Customer Phone Number'
    }
]

program
    .version('1.0.0')
    .description('Client Management System')

//another way to do it
// program
//     .command('add <firstname> <lastname> <email> <phone>')
//     .alias('a')
//     .description('Add a Customer')
//     .action((firstname, lastname, email, phone) => {
//         addCustomer({firstname, lastname, email, phone})
//     })

//add a customer command
program
    .command('add')
    .alias('a')
    .description('Add a Customer')
    .action(() => {
        prompt(questions).then(answers => addCustomer(answers))
    })

//Find a Customer command
program
    .command('find <name>')
    .alias('f')
    .description('Find a Customer')
    .action(name => findCustomer(name))

//Update command
program
    .command('update <_id>')
    .alias('u')
    .description('Update a Customer')
    .action(_id => {
        prompt(questions).then(answers => updateCustomer(_id, answers))
    })

//remove command
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a Customer')
    .action(_id => removeCustomer(_id))

//list command
program
    .command('list')
    .alias('l')
    .description('List all Customers')
    .action(() => listCustomers())

program.parse(process.argv)