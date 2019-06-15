1. What is the purpose of using _sessions_?
    Sessions allow you to store a state regarding the user as it relates to authorization on the server side and issue cookies for example to verify the authorization upon requests to the server.

2. What does bcrypt do to help us store passwords in a secure manner.
    Bcrypt uses hashing which is a one way process meaning there is no way to reverse calculate and password. There is an algorithm that encrypts the password and iterates to protect the password.

3. What does bcrypt do to slow down attackers?
    By iterating it greatly increases the time it takes to test potential passwords and hack into the user account

4. What are the three parts of the JSON Web Token?
    The header, the payload and the signature.
