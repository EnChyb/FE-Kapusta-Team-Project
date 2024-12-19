import "./FinanceForm.css";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FinanceForm = ({ onAdd, activeSection }) => {
  const selectExpenses = [
    { value: "Transport", label: "Transport" },
    { value: "Products", label: "Products" },
    { value: "Health", label: "Health" },
    { value: "Alcohol", label: "Alcohol" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Housing", label: "Housing" },
    { value: "Technique", label: "Technique" },
    { value: "Communal communication", label: "Communal, communication" },
    { value: "Sports, hobbies", label: "Sports, hobbies" },
    { value: "Other", label: "Other" },
  ];

  const selectIncome = [
    { value: "salary", label: "Salary" },
    { value: "bonus", label: "Bonus" },
  ];

  const categories =
    activeSection === "expenses" ? selectExpenses : selectIncome;

  const validationSchema = Yup.object({
    date: Yup.string().required("Date is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.mixed().required("Category is required"),
    amount: Yup.number()
      .typeError("Amount must be a number")
      .positive("Amount must be a positive number")
      .required("Amount is required"),
  });

  return (
    <Formik
      initialValues={{
        date: new Date().toISOString().split("T")[0],
        description: "",
        category: "",
        amount: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onAdd({
          ...values,
          amount: parseFloat(values.amount),
        });
        resetForm();
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="finance-form">
          <div className="finance-form-input">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="calendar-icon"
            >
              <use href="/sprite.svg#calendar" />
            </svg>
            <div className="input-container-date">
              <Field type="date" name="date" className="date-input" />
              <ErrorMessage name="date" component="div" className="error" />
            </div>

            <div className="input-container-description">
              <Field
                type="text"
                name="description"
                placeholder="Product description"
                className="product-description-input"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </div>

            <div className="input-container-select">
              <Select
                value={
                  values.category
                    ? { value: values.category, label: values.category }
                    : null
                }
                onChange={(option) => setFieldValue("category", option.value)}
                options={categories}
                classNames={{
                  control: () => "select-control",
                  option: (state) =>
                    state.isSelected
                      ? "select-option select-option--is-selected"
                      : "select-option select-option--is-not-selected",
                }}
                placeholder="Product category"
              />
              <ErrorMessage name="category" component="div" className="error" />
            </div>

            <div className="input-container-amount">
              <Field
                type="number"
                name="amount"
                placeholder="0.00"
                className="amount-input"
              />
              <ErrorMessage name="amount" component="div" className="error" />
            </div>
          </div>
          <div className="finance-form-button">
            <button type="submit">INPUT</button>
            <button type="reset">CLEAR</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FinanceForm;
