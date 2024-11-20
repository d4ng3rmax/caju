import * as PropTypes from "prop-types";

export const RegistrationPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  admissionDate: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  employeeName: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["REVIEW", "APPROVED", "REPROVED"]).isRequired,
  cpf: PropTypes.string.isRequired,
});
