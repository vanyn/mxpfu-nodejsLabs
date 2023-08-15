const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email: "johnwick@gmail.com",
        DOB: "22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email: "johnsmith@gmail.com",
        DOB: "21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email: "joyalwhite@gmail.com",
        DOB: "21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
    // Copy the code here
    res.send(users)
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
    const email = req.params.email
    let payload = users.filter((user) => user.email === email)
    if (payload.length) {
        res.send(payload)
    } else { res.send("No user found") }
});

// POST request: Create a new user
router.post("/", (req, res) => {

    const newUser = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        email: req.query.email,
        DOB: req.query.DOB
    }
    //const newUser = req.query

    users.push(newUser)
    console.log(users)

    res.send(`${newUser.firstName} has been added to database`)
});

// PUT request: Update the details of a user by email ID
// curl --request PUT 'localhost:5050/user/johnsmith@gmail.com?DOB=1/1/1971&firstName=PizzaMan!'
router.put("/:email", (req, res) => {
    const userEmail = req.params.email;
    let filtered_users = users.filter((user) => user.email === userEmail);

    if (filtered_users.length) {
        let filtered_user = filtered_users[0];

        let firstName = req.query.firstName;
        //if the firstName has changed
        if (firstName) {
            filtered_user.firstName = firstName
        }
        let lastName = req.query.lastName;
        //if the lastName has changed
        if (lastName) {
            filtered_user.lastName = lastName
        }
        let email = req.query.email;
        //if the email has changed
        if (email) {
            filtered_user.email = email
        }
        let DOB = req.query.DOB;
        //if the DOB has changed
        if (DOB) {
            filtered_user.DOB = DOB
        }

        // Get users without OLD version of user
        users = users.filter((user) => user.email != userEmail);

        // Now push the updated user back into users
        users.push(filtered_user);

        console.log(users)

        res.send(`User with the email ${userEmail} has been updated`);
    }
    else {
        res.send("Unable to find user!");
    }
});


// DELETE request: Delete a user by email ID
// curl --request DELETE 'localhost:5050/user/johnsmith@gmail.com'
router.delete("/:email", (req, res) => {
    const userEmail = req.params.email

    if (users.filter((user) => user.email === userEmail).length) {
        users = users.filter((user) => user.email != userEmail)
        console.log(users)

        res.send(`Deleted user with email ${userEmail}`)

    } else {
        res.send(`No user found with email ${userEmail}`)
    }
});

module.exports = router;
