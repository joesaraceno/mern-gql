module.exports = {
  transformDate: (dtStr) => {
    try {
      return new Date(dtStr).toISOString();
    } catch(err) {
      console.log(err);
      return dtStr;
    }
  }
}