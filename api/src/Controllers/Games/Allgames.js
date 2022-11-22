const { vgAPI } = require("./API");
const { vgDB } = require("./DBgames");


const allGames = async () => {
  try {
    const api = await vgAPI();
    const dbInfo = await vgDB();
    const allInfo = dbInfo.concat(api);
    return allInfo;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { allGames };