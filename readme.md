# Hephillu3d

### Local Setup

1. clone the repo: `git clone https://github.com/gmep-engineers/hephillu3d.git`
1. download the config file: https://us-west-1.console.aws.amazon.com/s3/upload/gmep-config-files-2025-02-18?region=us-west-1&bucketType=general&prefix=hephillu3d/
1. place the config file in the `etc` folder
1. install dependencies: `npm i`
1. run: `node app.js`

### Updating Remote Server

#### Note: This process shall only apply during development. A production environment will have proper replication and load balancing to ensure high-availability during updates.

1. navigate to the LightSail page: https://lightsail.aws.amazon.com/ls/webapp/us-west-2/instances/Hephillu3d/connect
1. click **Connect using SSH**
1. run the command: `screen -r node`
1. stop the current execution with `Ctrl-C`
1. pull and run the lastest code: `git pull && node app.js`
1. detatch from the screen session by pressing `Ctrl-A` followed by `d`
1. you can now close the ssh window
