import React from 'react';

function renderField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    if (field.type === 'textarea') {
        return (
          <div className={className}>
            <label>{field.label}</label>
            <textarea
              className="form-control"
              rows="4" 
              cols="50"
              {...field.input}
              >
            </textarea>
            <div className="error">
              {touched ? error : ''}
            </div>
          </div>
        );
    } else {
        return (
          <div className={className}>
            <label>{field.label}</label>
            <input
              className="form-control"
              type="text"
              {...field.input}
            />
            <div className="error">
              {touched ? error : ''}
            </div>
          </div>
        );
    }
}

export default renderField;