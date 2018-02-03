class fileInfo {
  constructor(obj, name, result) {
    if (obj) {
      this.xlsxName = name;
      this.sheetName = obj.SheetNames[0]; 
      this.sheetData = obj.Sheets[this.sheetName];
      this.isVendor = 2;
      this.buffer = result;
    }
  }
}

export default fileInfo;
