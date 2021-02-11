
var CommonUtil = {
  methods: {
    checkNull : function (str){ 
      if(typeof str == "undefined" || str == null || str == ""){ 
        return true
      } else{ 
        return false 
      } 
    },
    getFormatDate (date) {
      const year = date.getFullYear()
      let month = (1 + date.getMonth())
      month = month >= 10 ? month : '0' + month
      let day = date.getDate()
      day = day >= 10 ? day : '0' + day
      return  year + '/' + month + '/' + day
    },
    maskingPhoneNumber(str) { 
        const originStr = str
        let phoneStr
        let maskingStr

        if(this.checkNull(originStr) == true){ 
          return originStr; 
        } 
        if (originStr.toString().split('-').length != 3) { // 1) -가 없는 경우 
          phoneStr = originStr.length < 11 ? originStr.match(/\d{10}/gi) : originStr.match(/\d{11}/gi)
          if(this.checkNull(phoneStr) == true){ 
            return originStr
          } 
          if(originStr.length < 11) { // 1.1) 0110000000 
            maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/(\d{3})(\d{3})(\d{4})/gi,'$1***$3')); 
          } else { // 1.2) 01000000000 
            maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/(\d{3})(\d{4})(\d{4})/gi,'$1****$3'))
          } 
        }else { // 2) -가 있는 경우 
            phoneStr = originStr.match(/\d{2,3}-\d{3,4}-\d{4}/gi); 
            if(this.checkNull(phoneStr) == true){ 
              return originStr; 
            } 
            if(/-[0-9]{3}-/.test(phoneStr)) { // 2.1) 00-000-0000 
              maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/-[0-9]{3}-/g, "-***-"))
            } else if(/-[0-9]{4}-/.test(phoneStr)) { // 2.2) 00-0000-0000 
              maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/-[0-9]{4}-/g, "-****-"))
            } 
        } 
        return maskingStr
      }
  }
}
export default CommonUtil
