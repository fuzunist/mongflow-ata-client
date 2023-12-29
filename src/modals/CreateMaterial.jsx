import FormikForm from "@/components/FormikForm";
import {
  addRecipeMaterialLogToDB,
  editRecipeMaterialLogToDB,
  editRecipeMaterialToDB,
  addRecipeMaterialToDB
} from "@/services/recipematerial";
import { useUser } from "@/store/hooks/user";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecipeMaterials } from "@/store/hooks/apps";
import { addRecipeMaterial} from "@/store/actions/apps";

const CreateMaterial = ({ closeModal, editing = false, selected }) => {
  const user = useUser();
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const recipeMaterialStocks = useRecipeMaterials();

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
     console.log(values,"values of material inpıt")
    try {
    setError("");
    setSubmitting(true);
  

    const addRecipeMaterialResponse =await addRecipeMaterialToDB(
      user.tokens.access_token,
      values
    ).catch((error) => {
      console.error("Error in addRecipeMaterialLogToDB:", error);
      setError(error);
      throw error;
    });
     console.log(addRecipeMaterialResponse)

     if(addRecipeMaterialResponse?.error){
        return setError(addRecipeMaterialResponse?.error);
     }

     addRecipeMaterial(addRecipeMaterialResponse);
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

export default CreateMaterial;
