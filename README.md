# Node SwitchCoder

This node module provides a simple API wrapper to access SwitchCoder from any node app.  

It is just now getting started.

---

# Pre-Requisites and Installation
## Prerequisites

You will need to create an account on SwitchCoder and create your API token.
This client presumes you have a valid account and API token already configured

## Installation 
```shell
npm install node-switchcoder

```

---

# Using Node SwitchCoder

## Initializing the SwitchCoder client

```
var switchCoder = require('node-switchcoder');
var client = new switchCoder.Client('apiToken', 'host');
```