const app = require("./app")
const express = require("express");
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server works on port ${port}`));


