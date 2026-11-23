/**
 * Pure, host-neutral authorization gate.
 * A decision or proposal is never executable by itself; a separately granted,
 * in-scope authorization with satisfied prerequisites and conditions is required.
 */
const isTimestamp = value =>
  typeof value === "string" &&
  /^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?(?:Z|[+-]\\d{2}:\\d{2})$/.test(value) &&
  Number.isFinite(Date.parse(value));

export function evaluateCivicAuthorization({
  authorization,
  action,
  subjectId,
  jurisdiction,
  executorId,
  at,
  satisfiedPrerequisiteEvidenceIds = [],
  satisfiedConditionIds = []
}) {
  const reasons = [];
  if (!authorization || typeof authorization !== "object") {
    return { executable: false, reasons: ["authorization-missing"] };
  }

  for (const field of ["id", "sourceDecisionId", "grantingAuthorityId", "jurisdiction", "action", "subjectId", "scope", "executorId"]) {
    if (typeof authorization[field] !== "string" || authorization[field].trim().length === 0) {
      reasons.push("authorization-field-missing:" + field);
    }
  }
  if (authorization.status !== "granted") reasons.push("authorization-not-granted");
  if (authorization.action !== action) reasons.push("action-out-of-scope");
  if (authorization.subjectId !== subjectId) reasons.push("subject-out-of-scope");
  if (authorization.jurisdiction !== jurisdiction) reasons.push("jurisdiction-out-of-scope");
  if (authorization.executorId !== executorId) reasons.push("executor-not-authorized");
  if ((authorization.exclusions ?? []).includes(action)) reasons.push("action-explicitly-excluded");

  if (!isTimestamp(at) || !isTimestamp(authorization.validFrom) || !isTimestamp(authorization.expiresAt)) {
    reasons.push("invalid-authorization-time");
  } else {
    const instant = Date.parse(at);
    if (instant < Date.parse(authorization.validFrom)) reasons.push("authorization-not-yet-valid");
    if (instant >= Date.parse(authorization.expiresAt)) reasons.push("authorization-expired");
  }

  const satisfiedEvidence = new Set(satisfiedPrerequisiteEvidenceIds);
  for (const evidenceId of authorization.prerequisiteEvidenceIds ?? []) {
    if (!satisfiedEvidence.has(evidenceId)) reasons.push("prerequisite-unsatisfied:" + evidenceId);
  }

  const satisfiedConditions = new Set(satisfiedConditionIds);
  for (const condition of authorization.conditions ?? []) {
    if (!condition?.id || !satisfiedConditions.has(condition.id)) {
      reasons.push("condition-unsatisfied:" + (condition?.id ?? "unknown"));
    }
  }

  return { executable: reasons.length === 0, reasons };
}
