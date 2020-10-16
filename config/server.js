module.exports = {
  APPLICATION_ID:
    process.env.APPLICATION_ID ||
    "ecf680a62841f3ace68efeb07e075c11b77fb8b5b5e83d6b3b2fbc5d3953974a",
  SECRET:
    process.env.SECRET ||
    "b7f1bb937fa0e7be907ad56756cafbfdf6f98050083afbc186203e8ffc9c7b33",
  CALLBACK_URL: process.env.CALLBACK_URL || "http://localhost:3000",
};
