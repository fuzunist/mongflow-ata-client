import FormikForm from "@/components/FormikForm";
import { addRawMaterialToDB } from "@/services/rawmaterial";
import { useUser } from "@/store/hooks/user";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { addRawMaterial } from "@/store/actions/apps";

const CreateRawMaterial = ({ closeModal, editing = false, selected }) => {
  const user = useUser();
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const initialValues = {
    material: {
      tag: "input",
      type: "text",
      placeholder: t("addMaterial"),
      label: t("material"),
      value: "",
    },
  };

  const validate = (values) => {
    const errors = {};
    if (!values.material) errors.material = "Required";

    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    console.log(values, "values of raw material inpıt");
    try {
      setError("");
      setSubmitting(true);

      const addRawMaterialResponse = await addRawMaterialToDB(
        user.tokens.access_token,
        values
      ).catch((error) => {
        console.error("Error in addRecipeMaterialLogToDB:", error);
        setError(error);
        throw error;
      });
      console.log(addRawMaterialResponse);

      if (addRawMaterialResponse?.error) {
        return setError(addRawMaterialResponse?.error);
      }

      addRawMaterial(addRawMaterialResponse);
      setSubmitting(false);
      closeModal();
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      error={error}
      title={t("addMaterial")}
    />
  );
};

export default CreateRawMaterial;
