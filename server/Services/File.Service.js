const path = require("path");
const fs = require("fs/promises");

const Delete = async (Folder, Image) => {
     const File = path.join(__dirname, '..', 'public', Folder, Image);

     try {
          await fs.unlink(File);
          return true;
     } catch (error) {
          if (error.code === "ENOENT") {
               return false;
          }
          throw error;
     }
};

module.exports = { Delete };