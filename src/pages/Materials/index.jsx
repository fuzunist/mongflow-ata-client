import { useState, useEffect } from "react";
import { useRecipeMaterials, useRecipes } from "@/store/hooks/apps";
import FormikForm from "@/components/FormikForm";
import { useUser } from "@/store/hooks/user";
import { editRecipeMaterialToDB } from "@/services/recipematerial";
import { editRecipeMaterial } from "@/store/actions/apps";
import { useTranslation } from "react-i18next";

const index = () => {
  const [error, setError] = useState("");
  const [initVals, setInitVals] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const user = useUser();
  const recipeMaterials = useRecipeMaterials();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const initialValues = {};

    recipeMaterials?.forEach((row) => {
      initialValues[String(row.id)] = {
        id: row.id,
        name: row.material,
        label: row.material,
        tag: "input",
        type: "number",
        placeholder: "Maliyet girin USD/kg)",
        value: row.cost ?? "",
        min: 0,
      };
    });
    setInitVals(initialValues);
  }, []);

  //  console.log("init vals out: ", initialValues)
  const onEdit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      setError("");
      const response = await editRecipeMaterialToDB(
        user.tokens.access_token,
        values
      );

      if (response?.error) {
        setSubmitting(false);
        setError(response.error);
      }

      await editRecipeMaterial(response);
      setSuccessMessage(t("materials_added_successfully"));
      setSubmitting(false);
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 py-12 bg-white">
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}
      <FormikForm
        onSubmit={onEdit}
        //   validate={validate}
        initialValues={initVals}
        error={error}
        title={"Hammadde Birim KG Maliyet Güncelle"}
        material={true}

        //   {t(selectedProduct ? (!!type ? 'editOtherProduct' : 'editProduct') : !!type ? 'addOtherProduct' : 'addProduct')}
      />
    </div>
  );
};

export default index;
