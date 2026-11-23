/**
 * Pure, host-neutral authorization gate.
 * A decision or proposal is never executable by itself; a separately granted,
 * in-scope authorization with satisfied prerequisites is required.
 */
export function evaluateCivicAuthorization({
  authorization,
  action,
  subjectId,
  executorId,
  at,
  satisfiedPrerequisiteEvidenceIds = []
}) {
  const reasons = [];
  if (!authorization || typeof authorization !== "object") {
    return { executable: false, reasons: ["authorization-missing"] };
  }

  if (authorization.status !== "granted") reasons.push("authorization-not-granted");
  if (authorization.action !== action) reasons.push("action-out-of-scope");
  if (authorization.subjectId !== subjectId) reasons.push("subject-out-of-scope");
  if (authorization.executorId !== executorId) reasons.push("executor-not-authorized");
  if ((authorization.exclusions ?? []).includes(action)) reasons.push("action-explicitly-excluded");

  const instant = Date.parse(at);
  const starts = Date.parse(authorization.validFrom);
  const expires = Date.parse(authorization.expiresAt);
  if (![instant, starts, expires].every(Number.isFinite)) {
    reasons.push("invalid-authorization-time");
  } else {
    if (instant < starts) reasons.push("authorization-not-yet-valid");
    if (instant >= expires) reasons.push("authorization-expired");
  }

  const satisfied = new Set(satisfiedPrerequisiteEvidenceIds);
  for (const evidenceId of authorization.prerequisiteEvidenceIds ?? []) {
    if (!satisfied.has(evidenceId)) reasons.push("prerequisite-unsatisfied:" + evidenceId);
  }

  return { executable: reasons.length === 0, reasons };
}
