export const validateAmendment = (
  formData: any
) => {
  const errors: any = {};

  if (!formData.studyCode)
    errors.studyCode =
      "Study Code Required";

  if (!formData.amendmentCode)
    errors.amendmentCode =
      "Amendment Code Required";

  if (!formData.amendmentTitle)
    errors.amendmentTitle =
      "Amendment Title Required";

  if (!formData.amendmentCategory)
    errors.amendmentCategory =
      "Category Required";

  if (!formData.newVersion)
    errors.newVersion =
      "New Version Required";

  if (!formData.releaseDate)
    errors.releaseDate =
      "Release Date Required";

  if (!formData.effectiveDate)
    errors.effectiveDate =
      "Effective Date Required";

  if (!formData.amendmentBy)
    errors.amendmentBy =
      "Amendment By Required";

  if (
    !formData.amendmentReason ||
    formData.amendmentReason
      .trim()
      .length < 20
  )
    errors.amendmentReason =
      "Minimum 20 Characters";

  return errors;
};