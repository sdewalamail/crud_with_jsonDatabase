const path = require("path");
const fs = require("fs/promises");


//////////////////////// read file ///////////////////////////////
const read = async (req, res) => {
  try {
    const fsPath = path.join(process.cwd(), "./db.json");
    // console.log(fsPath);
    const openFile = await fs.open(fsPath);
    const readFile = await fs.readFile(openFile);
    const json = JSON.parse(readFile);
    res.json(json);
  } catch (error) {
    res.send("woo! :( Sorry worng input Please chosse right path");
  }
};

///////////////////////////////////////// create user///////////////////////////////

const create = async (req, res) => {
  try {
    const fsPath = path.join(process.cwd(), "./db.json");
    const openFile = await fs.open(fsPath, "r+");
    const data = await fs.readFile(openFile, { encoding: "utf8" });
    await fs.truncate(fsPath);
    const json = JSON.parse(data);

    /////// Create Id ////////////

    let prevId;
    if (json && json instanceof Array && json.length) {
      prevId = json[json.length - 1].id;
    } else {
      prevId = 0;
    }
    console.log(prevId);
    const payload = { id: prevId + 1, ...req.body };

    json.push(payload);

    await fs.writeFile(fsPath, JSON.stringify(json));

    res.json(json);
  } catch (error) {
    console.log(error);
    res.send("woo! :( Sorry worng input Please chosse right path");
  }
};

///////////////////////////////////////// search user By id ///////////////////////////////

const searchUerById = async (req, res) => {
  try {
    const fsPath = path.join(process.cwd(), "./db.json");
    const openFile = await fs.open(fsPath, "r+");
    const data = await fs.readFile(openFile, { encoding: "utf8" });
    const json = JSON.parse(data);

    const id = req.params.id;

    const searchOrg = json.find((item) => item.id == id);

    if (!searchOrg) {
      res.send("Can please enter correct name or user not find :( ");
    }

    console.log(searchOrg);
    res.json(searchOrg);
  } catch (error) {
    console.log(error);
    res.send("woo! :( Sorry worng input Please chosse right path");
  }
};

///////////////////////////////////////// update user///////////////////////////////

const update = async (req, res) => {
  try {
    const fsPath = path.join(process.cwd(), "./db.json");
    const openFile = await fs.open(fsPath, "r+");
    const data = await fs.readFile(openFile, { encoding: "utf8" });
    await fs.truncate(fsPath);
    const json = JSON.parse(data);

    const id = req.params.id;

    // Find the item to update
    const itemIndex = json.findIndex((item) => item.id == req.params.id);

    if (itemIndex === -1) {
      res.status(404).send("Item not found");
      return;
    }

    // Update the item properties
    const updateOrg = { ...json[itemIndex], ...req.body };
    json.splice(itemIndex, 1, updateOrg);

    // Write the updated data back to the file
    await fs.writeFile(fsPath, JSON.stringify(json));
    res.json(updateOrg);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

///////////////////////////////////////// delete user///////////////////////////////

const deleteUser = async (req, res) => {
  try {
    const fsPath = path.join(process.cwd(), "./db.json");
    const openFile = await fs.open(fsPath, "r+");
    const data = await fs.readFile(openFile, { encoding: "utf8" });
    const json = JSON.parse(data);
    const id = req.params.id;

    // Find the item to update
    const itemIndex = json.findIndex((item) => item.id == req.params.id);

    if (itemIndex === -1) {
      return res.status(404).send("Item not found");
    }

    // Delete the item
    const deleteOrg = json[itemIndex];
    json.splice(itemIndex, 1);

    // Write the updated data back to the file
    await fs.writeFile(fsPath, JSON.stringify(json));

    res.json(deleteOrg);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};


/////////////////////////////////////////User upload///////////////////////////////

const upload = async (req, res) => {

    try {
      const fsPath = path.join(process.cwd(), "./db.json");
      const openFile = await fs.open(fsPath, "r+");
      const data = await fs.readFile(openFile, { encoding: "utf8" });
      const json = JSON.parse(data);
      const id = req.params.id;
         
      // Find the item to upload
      const itemIndex = json.findIndex((item) => item.id == req.params.id);
      
   // if given user doesn't exists the rm remove the uploaded image
      if (itemIndex === -1) {
           await fs.rm(path.join(process.cwd(), "public/profile_pic"));
           return res.status(404).json({description: "User not found"});
      }
 
       // if user have already set the profilePic then remove the previous and upload the new pic logic 
       if(json[itemIndex].profile_pic){
         
            await fs.rm(path.join(process.cwd(), json[itemIndex].profile_pic))
       }
          
       const updatedOrg = {...json[itemIndex], profile_pic: path.join('public', 'profile_pic', req.file.filename)};
       json.splice(itemIndex, 1 , updatedOrg);

      
        
      // Write the updated data back to the file
      await fs.writeFile(fsPath, JSON.stringify(json));
  
      res.json(updatedOrg);


    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }


        

  };

module.exports = { read, create, update, searchUerById, deleteUser, upload };
