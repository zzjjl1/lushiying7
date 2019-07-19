const rules = {
  name: {
    required: true,
    message: "请输入姓名",
    validator: function(value, rule) {
      if (!value) {
        return rule;
      }
      return true;
    },
    refType: 1
  },
  idCard: {
    required: true,
    message: "请输入证件号码",
    validator: function(value, rule) {
      if (!value) {
        return rule;
      }
      return true;
    },
    refType: 1
  },
  phone: {
    required: true,
    message: "请输入手机号",
    validator: function(value, rule) {
      if (!value) {
        return rule;
      }
      return true;
    },
    refType: 1
  }
};

export default rules