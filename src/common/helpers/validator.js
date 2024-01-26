const rules = {
  required: {
    rule: value => !!value,
    message: 'Поле обязательно для заполнения',
  },
};

const validate = (value, appliedRules) => {
  let error = '';
  appliedRules.forEach((appliedRule) => {
    if (!rules[appliedRule]) {
      return;
    }
    const { rule, message } = rules[appliedRule];
    if (!rule(value)) {
      error = message;
    }
  });
  return error;
};

export const validateFields = (fields, validations) => {
  let isValid = true;
  Object.keys(validations).forEach((key) => {
    validations[key].error = validate(
      fields[key],
      validations[key].rules,
    );
    if (validations[key].error) {
      isValid = false;
    }
  });
  return isValid;
};

export const clearValidationErrors = (validations) => {
  if (!validations) {
    return;
  }
  Object.keys(validations).forEach((key) => {
    validations[key].error = '';
  });
};
