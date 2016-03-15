# sam-irc-nodejs
Simple IRC (not following the RFC) based on a Node.js server and a desktop client using [Electron](https://github.com/atom/electron "Electron github repository").

# Setup

```sh
# Get the repository
git clone https://github.com/michau-k/sam-irc-nodejs.git

# In sam-irc-nodejs directory
npm install
```

# Run

```sh
# To run the server, in sam-irc-nodejs/server/
npm start

# To run the client, in sam-irc-nodejs/client/
npm start
```

# Miscellaneous
The server is hard codded to run on localhost, port 8080. File [server.js](./server/server.js) to change it.

It uses a MySQL databased running on localhost named dev_irc_nodejs. File [database.js](./server/modules/databse.js) to change it.
