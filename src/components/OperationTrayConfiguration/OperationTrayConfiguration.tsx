import React, { useState } from "react";
import { useForm, useFieldArray, FieldValues, Control } from "react-hook-form";
import "./styles.css";

type ColumnConfig = {
  order: number;
  fieldData: string;
  display_name: string;
  sortable: boolean;
  sort_type: "ascending" | "descending" | "";
};

type FormData = {
  configuration_list: ColumnConfig[];
};

const CustomSelectRHF: React.FC<{
  placeholder: string;
  name: string;
  control: Control<FieldValues>;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  isFieldDisabled: (value: string) => boolean;
}> = ({ placeholder, name, control, options, onChange, isFieldDisabled }) => {
  return (
    <select
      name={name}
      onChange={(e) => onChange(e.target.value)}
      className="custom-select"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={isFieldDisabled(option.value)}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

const OperationTrayConfiguration: React.FC = () => {
  const wfData = [
    { label: "Folio", value: "folio" },
    { label: "Product", value: "product" },
    { label: "Client Name", value: "name_client" },
    { label: "Appointment Date", value: "appointment_date" },
  ];

  const { control, register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      configuration_list: [
        {
          order: 1,
          fieldData: "",
          display_name: "",
          sortable: false,
          sort_type: "",
        },
      ],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "configuration_list",
  });

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const watchFields = watch("configuration_list");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleRowSelection = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleGlobalDelete = () => {
    const remainingFields = fields.filter((_, index) => !selectedRows.includes(index));
    setSelectedRows([]);
    remove(selectedRows);

    // Recalcula el orden
    remainingFields.forEach((field, idx) => {
      setValue(`configuration_list.${idx}.order`, idx + 1);
    });
  };

  const isFieldDisabled = (value: string) => {
    return watchFields.some((field) => field.fieldData === value);
  };

  const onDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const onDragOver = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    move(draggedIndex, index);
    setDraggedIndex(index);

    // Recalcula el orden después del movimiento
    fields.forEach((_, idx) => {
      setValue(`configuration_list.${idx}.order`, idx + 1);
    });
  };

  const validateForm = (data: FormData) => {
    let isValid = true;
    data.configuration_list.forEach((item, index) => {
      if (!item.display_name.trim()) {
        isValid = false;
        alert(`"Display Name" cannot be empty in row ${index + 1}`);
      }
      if (item.sortable && !item.sort_type) {
        isValid = false;
        alert(`Please select "Ascending" or "Descending" for sortable row ${index + 1}`);
      }
    });
    return isValid;
  };

  const onSubmit = (data: FormData) => {
    if (validateForm(data)) {
      console.log("Saved Configuration:", data);
    }
  };

  return (
    <div className="container">
      <h1>Operation Tray Configuration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="styled-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(fields.map((_, index) => index));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  checked={selectedRows.length === fields.length && fields.length > 0}
                />
              </th>
              <th>Order</th>
              <th>Field</th>
              <th>Display Name</th>
              <th>Sortable</th>
              <th>A-Z</th>
              <th>Z-A</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr
                key={field.id}
                draggable
                onDragStart={() => onDragStart(index)}
                onDragOver={(e) => {
                  e.preventDefault();
                  onDragOver(index);
                }}
                className="draggable-row"
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleRowSelection(index)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>
                  <CustomSelectRHF
                    placeholder="Select Field"
                    name={`configuration_list.${index}.fieldData`}
                    control={control}
                    options={wfData}
                    onChange={(value) =>
                      setValue(`configuration_list.${index}.fieldData`, value)
                    }
                    isFieldDisabled={(value) =>
                      isFieldDisabled(value) && value !== watchFields[index]?.fieldData
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    {...register(`configuration_list.${index}.display_name`)}
                    className="input-text"
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    {...register(`configuration_list.${index}.sortable`)}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    value="ascending"
                    {...register(`configuration_list.${index}.sort_type`)}
                    disabled={!watchFields[index]?.sortable}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    value="descending"
                    {...register(`configuration_list.${index}.sort_type`)}
                    disabled={!watchFields[index]?.sortable}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="actions">
          <button
            type="button"
            onClick={() =>
              append({
                order: fields.length + 1,
                fieldData: "",
                display_name: "",
                sortable: false,
                sort_type: "",
              })
            }
            className="btn-add"
          >
            Add Column
          </button>
          <button
            type="button"
            onClick={handleGlobalDelete}
            className="btn-delete-global"
            disabled={selectedRows.length === 0}
          >
            Delete Selected
          </button>
          <button type="submit" className="btn-save">
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};

export default OperationTrayConfiguration;
