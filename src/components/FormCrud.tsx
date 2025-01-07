import React from "react";
import {
  useForm,
  useFormContext,
  FormProvider,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";

// Definimos la interfaz de los datos
interface NewApplicationOrigin {
  id: string;
  name: string;
}

interface FormValues {
  newApplicationOrigins: NewApplicationOrigin[];
}

// Componente hijo que utiliza FormContext y FieldArray
const NewApplicationOrigins: React.FC = () => {
  const { control } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "newApplicationOrigins",
  });

  return (
    <div>
      <h3>CRUD de NewApplicationOrigins</h3>
      {fields.map((field, index) => (
        <div key={field.id} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            {...control.register(`newApplicationOrigins.${index}.name` as const)}
            defaultValue={field.name} // Valor por defecto
            placeholder="Nombre"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            style={{ marginLeft: "10px" }}
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          append({ id: Date.now().toString(), name: "" })
        }
        style={{ marginTop: "10px" }}
      >
        Agregar
      </button>
    </div>
  );
};

// Componente principal que envuelve el formulario
export const FormCrud: React.FC = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      newApplicationOrigins: [], // Inicializamos con un arreglo vacío
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Datos enviados:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <NewApplicationOrigins />
        <button type="submit" style={{ marginTop: "20px" }}>
          Guardar
        </button>
      </form>
    </FormProvider>
  );
};

export default FormCrud;
