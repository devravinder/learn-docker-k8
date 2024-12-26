
// don't use 'local' for db name ( it's reserved for internal use)

//===========
db = db.getSiblingDB("dev");
db.createUser({
  user: "dev",
  pwd: "dev",
  roles: [{ role: "readWrite", db: "dev" }],
});

// we can do anything here


//=========
