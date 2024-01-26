export class FormBuilder {
  constructor() {
    this.formFields = [];
  }

  addTextField({ name, label, placeholder = '' }) {
    this.formFields.push({
      type: 'text',
      name,
      label,
      placeholder,
    });
    return this;
  }

  addPhoneField({
    name,
    label,
    mask = '+7 ### ###-##-##',
    minValue = '+7',
    placeholder = '',
  }) {
    this.formFields.push({
      type: 'tel',
      name,
      label,
      placeholder,
      mask,
      minValue,
    });
    return this;
  }

  addSelectField({ name, label, options = [], placeholder = 'Выберите вариант' }) {
    this.formFields.push({
      type: 'select',
      name,
      label,
      options,
      placeholder,
    });
    return this;
  }

  build() {
    return this.formFields;
  }
}
