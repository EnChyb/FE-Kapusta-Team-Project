import React from "react";
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

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      width: "200px",
      borderRadius: "8px",
      boxShadow: "none",
      textAlign: "left",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "grey",
      backgroundColor: state.isSelected ? "lightgrey" : "white",
    }),
  };

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
            <div className="input-container-date">
              <Field type="date" name="date" />
              <ErrorMessage name="date" component="div" className="error" />
            </div>

            <div className="input-container-description">
              <Field
                type="text"
                name="description"
                placeholder="Product description"
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
                styles={selectStyles}
                placeholder="Product category"
              />
              <ErrorMessage name="category" component="div" className="error" />
            </div>

            <div className="input-container-amount">
              <Field type="number" name="amount" placeholder="0.00" />
              <ErrorMessage name="amount" component="div" className="error" />
            </div>
          </div>
          <div className="finance-form-button">
            <button type="submit">Input</button>
            <button type="reset">Clear</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FinanceForm;
