const Input = ({ label, name, type = 'text', required = false }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input type={type} name={name} required={required} />
    </div>
  );
};

const CheckBox = ({ label, name, required = false }) => {
  return (
    <div className="form-field">
      <label>
        <input type="checkbox" name={name} required={required} />
        {label}
      </label>
    </div>
  );
};

const Fields = ({ fields }) => {
  return (
    <>
      {Object.entries(fields).map(([name, field]) => {
        switch (field.type) {
          case 'text':
          case 'email':
          case 'url':
            return (
              <Input
                key={name}
                label={field.label}
                name={name}
                type={field.type}
                required={field.required}
              />
            );
          case 'textarea':
            return (
              <div key={name}>
                <label>{field.label}</label>
                <textarea name={name} required={field.required} />
              </div>
            );
          case 'checkbox':
            return (
              <CheckBox
                key={name}
                label={field.label}
                name={name}
                required={field.required}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

const Form = ({ fieldsets, fields, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      {fields && <Fields fields={fields} />}
      {fieldsets?.map((fieldset, index) => (
        <fieldset key={index}>
          <legend>{fieldset.legend}</legend>
          <Fields fields={fieldset.fields} />
        </fieldset>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

const form = {
  fieldsets: [
    {
      legend: 'About you',
      fields: {
        name: {
          type: 'text',
          label: 'Name',
          required: true,
        },
        email: {
          type: 'email',
          label: 'Email',
          required: true,
        },
        organization: {
          type: 'text',
          label: 'Organization',
        },
        url: {
          type: 'url',
          label: 'URL',
        },
        isClient: {
          type: 'checkbox',
          label: 'Are you already a client?',
        },
      },
    },
    {
      legend: 'Your message',
      fields: {
        subject: {
          type: 'text',
          label: 'Subject',
          required: true,
        },
        message: {
          type: 'textarea',
          label: 'Message',
          required: true,
        },
      },
    },
  ],
  onSubmit: (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data);
  },
};

const ContactRoute = () => {
  return (
    <div>
      <h1>Contact me</h1>
      <Form {...form} />
    </div>
  );
};

export default ContactRoute;
