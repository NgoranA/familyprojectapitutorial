function checkObject(data) {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw new Error("Data must be an object");
  }
}

export function validateUpdate(data) {
  checkObject(data);
  const dataKeys = Object.keys(data);
  const expectedKeys = ["job_title", "salary"];

  checkMissingAndUnexpectedKeys(expectedKeys, dataKeys);
}

function checkMissingAndUnexpectedKeys(expectedKeys, dataKeys) {
  const missingKeys = expectedKeys.filter((key) => !dataKeys.includes(key));
  if (missingKeys.lenth > 0) {
    throw new Error(`Missing values ${missingKeys.join(", ")}`);
  }

  const unexpectedKeys = dataKeys.filter((key) => !expectedKeys.includes(key));
  if (unexpectedKeys.lenth > 0) {
    throw new Error(`Unexpected values ${unexpectedKeys.join(", ")}`);
  }
}

function validateFamilyData(data) {
  checkObject(data);
  const expectedKeys = [
    "name",
    "age",
    "email",
    "sex",
    "job_title",
    "salary",
    "address",
  ];

  const dataKeys = Object.keys(data);

  checkMissingAndUnexpectedKeys(expectedKeys, dataKeys);

  const { name, age, email, sex, job_title, salary, address } = data;

  if (typeof name !== "string" || name.trim() === "" || name.length > 100) {
    throw new Error(
      "Name must be a non-empty string with a value greater than 100",
    );
  }
  if (!Number.isInteger(age) || age < 0) {
    throw new Error("Age must be a positive integer");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    typeof email !== "string" ||
    !emailRegex.test(email) ||
    email.length > 100
  ) {
    throw new Error(
      "Email must be a valid email address with a maximum length of 100 characters.",
    );
  }

  if (
    typeof sex !== "string" ||
    sex.length !== 1 ||
    !["F", "M"].includes(sex.toUpperCase())
  ) {
    throw new Error("Sex must be a single character between F and M");
  }

  if (typeof job_title !== "string" || job_title.length > 60) {
    throw new Error(
      "Job Title must be a string with a maximum of 60 characters",
    );
  }

  if (typeof salary !== "number" || isNaN(salary) || salary < 0) {
    throw new Error("salary must be a positive number");
  }

  if (typeof address !== "string" || address.trim() === "") {
    throw new Error("Address must be a non-empty string");
  }
}

export default validateFamilyData;
