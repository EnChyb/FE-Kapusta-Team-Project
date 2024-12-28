import FinanceForm from "../FinanceForm/FinanceForm";
import FinanceTable from "../FinanceTable/FinanceTable";
import Summary from "../Summary/Summary";
import "./FinanceSection.css";
import { useBalance } from "../../context/BalanceContext";

const FinanceSection = ({ data, setData, activeSection, onDelete }) => {
	const { fetchBalance } = useBalance();
	const addEntry = (entry) => {
		const adjustedEntry = {
			...entry,
			amount:
				activeSection === "expenses"
					? -Math.abs(entry.amount)
					: Math.abs(entry.amount),
		};

		setData((prevData) => [...prevData, adjustedEntry]);
		fetchBalance();
	};

	const deleteEntry = (index) => {
		const entryToDelete = data[index];
		if (entryToDelete && entryToDelete._id) {
			onDelete(entryToDelete._id, entryToDelete.amount);
		}
		setData((prevData) => prevData.filter((_, i) => i !== index));
	};

	return (
		<div className="finance-section">
			<FinanceForm onAdd={addEntry} activeSection={activeSection} />
			<div className="finance-details">
				<FinanceTable data={data} onDelete={deleteEntry} />
				<Summary data={data} />
			</div>
		</div>
	);
};

export default FinanceSection;
