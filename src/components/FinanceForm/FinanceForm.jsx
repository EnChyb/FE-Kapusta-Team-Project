import "./FinanceForm.css";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import API_URL from "../../../api/apiConfig";

const FinanceForm = ({ onAdd, activeSection }) => {
    const selectExpenses = [
        { value: "Transport", label: "Transport" },
        { value: "Products", label: "Products" },
        { value: "Health", label: "Health" },
        { value: "Alcohol", label: "Alcohol" },
        { value: "Entertainment", label: "Entertainment" },
        { value: "Housing", label: "Housing" },
        { value: "Technique", label: "Technique" },
        { value: "Communal, Communication", label: "Communal, Communication" },
        { value: "Sports, Hobbies", label: "Sports, Hobbies" },
        { value: "Other", label: "Other" },
    ];

    const selectIncome = [
        { value: "Salary", label: "Salary" },
        { value: "Bonus", label: "Bonus" },
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
            .test(
                "is-decimal",
                "Amount should have up to 2 decimal places",
                (value) => {
                    if (!value) return true;
                    return /^\d+(\.\d{0,2})?$/.test(value.toString());
                }
            )
            .required("Amount is required"),
    });

    const handleFormSubmit = async (values, actions) => {
        const { resetForm } = actions;
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("User is not authenticated.");
            }

            const endpoint =
                activeSection === "expenses"
                    ? "/transaction/expense"
                    : "/transaction/income";

            console.log("Data being sent to the backend:", {
                date: values.date,
                description: values.description,
                category: values.category,
                amount: values.amount,
            });

            const response = await axios.post(
                `${API_URL}${endpoint}`,
                {
                    date: values.date,
                    description: values.description,
                    category: values.category,
                    amount: values.amount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Transaction added successfully:", response.data);

            const transaction =
                activeSection === "expenses"
                    ? response.data.expense
                    : response.data.income;

            if (transaction) {
                onAdd(transaction);
                resetForm();
            } else {
                throw new Error("Transaction data is missing in the response.");
            }
        } catch (err) {
            console.error(
                "Error during transaction:",
                err.response ? err.response.data : err.message
            );
        }
    };

    const mobileHamburgerToggle = () => {
        const trackerForm = document.querySelector("tracker__form");
        console.log(trackerForm.classList);
        trackerForm.classList.toggle("is-open");
    };

    return (
        <Formik
            initialValues={{
                date: new Date().toISOString().split("T")[0],
                description: "",
                category: "",
                amount: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => handleFormSubmit(values, actions)}
        >
            {({ setFieldValue, values }) => (
                <Form className="tracker__form is-open">
                    <button
                        type="button"
                        className="tracker__mobile-back-btn"
                        aria-label="Back"
                        onClick={mobileHamburgerToggle}
                    >
                        <svg width="24" height="24" aria-hidden="true">
                            <use href="/sprite.svg#back-arrow" />
                        </svg>
                    </button>
                    <div className="tracker__input-container">
                        <div className="tracker__date-input-container">
                            <svg
                                width="20"
                                height="20"
                                aria-hidden="true"
                                className="tracker__date-input-calendar-icon"
                            >
                                <use href="/sprite.svg#calendar" />
                            </svg>
                            <Field
                                type="date"
                                name="date"
                                className="tracker__date-input"
                            />
                            <ErrorMessage
                                name="date"
                                component="p"
                                className="error"
                            />
                        </div>
                        <div className="tracker__description-input-container">
                            <Field
                                type="text"
                                name="description"
                                placeholder="Product description"
                                className="tracker__description-input"
                            />
                            <ErrorMessage
                                name="description"
                                component="p"
                                className="error"
                            />
                        </div>

                        <div className="tracker__select-input-container">
                            <Select
                                value={
                                    values.category
                                        ? {
                                              value: values.category,
                                              label: values.category,
                                          }
                                        : null
                                }
                                onChange={(option) =>
                                    setFieldValue("category", option.value)
                                }
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
                            <ErrorMessage
                                name="category"
                                component="p"
                                className="error"
                            />
                        </div>

                        <div className="tracker__amount-input-container">
                            <Field
                                type="number"
                                inputmode="decimal"
                                name="amount"
                                placeholder="0.00"
                                className="tracker__amount-input"
                                step="0.01"
                            />
                            <ErrorMessage
                                name="amount"
                                component="p"
                                className="error"
                            />
                            <svg
                                width="20"
                                height="20"
                                aria-hidden="true"
                                className="tracker__amount-input-icon"
                            >
                                <use href="/sprite.svg#calculator" />
                            </svg>
                        </div>
                    </div>
                    <div className="tracker__form-btns-container">
                        <button
                            type="submit"
                            className="tracker__form-submit-btn"
                            onClick={mobileHamburgerToggle}
                        >
                            INPUT
                        </button>
                        <button
                            type="reset"
                            className="tracker__form-reset-btn"
                        >
                            CLEAR
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FinanceForm;
