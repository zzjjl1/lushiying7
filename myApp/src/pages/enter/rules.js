const rules = {
    name: {
      required: true,
      message: "请输入车辆名称",
      validator: function(value, rule) {
        if (!value) {
          return rule;
        }
        return true;
      },
      refType: 1
    },
    xiang: {
      required: true,
      message: "请选择车身结构",
      validator: function(value, rule) {
        if (!value) {
          return rule;
        }
        return true;
      },
      refType: 1
    },
    pailiang: {
      required: true,
      message: "请选择排量",
      validator: function(value, rule) {
        if (!value) {
          return rule;
        }
        return true;
      },
      refType: 1
    },
    number: {
        required: true,
        message: "请选择乘坐人数",
        validator: function(value, rule) {
          if (!value) {
            return rule;
          }
          return true;
        },
        refType: 1
      },
      money: {
        required: true,
        message: "请输入日均价格",
        validator: function(value, rule) {
          if (!value) {
            return rule;
          }
          return true;
        },
        refType: 1
      },
      serverMoney: {
        required: true,
        message: "请输入服务费",
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