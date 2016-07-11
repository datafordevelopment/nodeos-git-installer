var process = require("process");

function help() {
 console.log("\nUsage:");
 console.log("gitpkg [command] [options]");
 console.log("\n");
 console.log("commands:");
 console.log("\t* help    -- Shows the gitpkg command usage");
 console.log("\t* install -- Installs a package from a git repsitory");
 console.log("\t* update  -- Updates/reloads the repository list");
 console.log("\t* upgrade -- Updates/upgrades a package");
 console.log("\n");
 console.log("options:");
 console.log("\t* [author/name]     -- use this option when the install or upgrade command is present");
 console.log("\t* [name_of_command] -- use this when help is present, gets the command usage");
}

function install(pkg) {
 var PACKAGE_AUTHOR = pkg.split("/")[0];
 var PACKAGE_NAME = pkg.split("/")[1];
 const spawn = require("child_process").spawn;
 var PACKAGE = spawn("git",["clone","https://www.github.com/"+pkg+".git"]);

 PACKAGE.stdout.on("data",function(data) {
  console.log("gitpkg install: " + data);
 });

 PACKAGE.stderr.on("data", function(data) {
  console.log("gitpkg install: " + data);
 });

 PACKAGE.on("close", function(code) {
  console.log("gitpkg install: exit with code " + data);
  var cd = spawn("cd",[PACKAGE_NAME]);
  var install = spawn("npm",["install"]);
 });
}

function upgrade(pkg) {
 var PACKAGE_AUTHOR = pkg.split("/")[0];
 var PACKAGE_NAME = pkg.split("/")[1];

 const spawn = require("child_process").spawn;
 var rm = spawn("rm",[PACKAGE_NAME]);
 var PACKAGE = spawn("git",["clone","https://www.github.com/"+pkg+".git"]);

 PACKAGE.stdout.on("data",function(data) {
  console.log("gitpkg install: " + data);
 });

 PACKAGE.stderr.on("data", function(data) {
  console.log("gitpkg install: " + data);
 });

 PACKAGE.on("close", function(code) {
  console.log("gitpkg install: exit with code " + data);
  console.log("gitpkg upgrade: completing installation");
  var cd = spawn("cd",[PACKAGE_NAME]);
  var install = spawn("npm",["install"]);
 });
}

if(process.argv.length == 1) {
 help();
} else {
 var command = process.argv[2];
 var options = process.argv[3];

 switch(command) {
  case "help":
   help();
   break;
  case "install":
   install(options);
   break;
  case "update":
   console.log("OPTION NOT YET AVALIBLE!");
   break;
  case "upgrade":
   upgrade(options);
   break;
 }
}
