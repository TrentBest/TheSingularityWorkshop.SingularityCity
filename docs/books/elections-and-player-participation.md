![The Singularity Workshop animated moniker](https://raw.githubusercontent.com/TrentBest/TheSingularityWorkshop.Visualize/development/docs/assets/moniker.svg)

# Elections & Player Participation — a voice in the city

**Owner:** Singularity City · **LOD:** 2 civic specialization · **Status:** authored domain sourcebook; election runtime and ballot custody are not yet implemented.

Elections let players participate in the political life of a world rather than merely watch candidates compete. The city should feel politically alive before, during and after an election: campaign posters appear, candidates make speeches, supporters argue in the market, public notices repeat, debates happen, rumors circulate, polling places prepare, votes are cast, results are challenged and officeholders inherit real responsibilities.

The background campaign should sometimes be annoying. Repeated candidate advertisements are part of the atmosphere and a source of player choice—not a demand that the player consume real-world advertising or endorse a candidate.

## 1. Player participation is a world capability

A player may:
- observe campaigns without participating;
- attend a debate, rally, assembly or neighborhood meeting;
- ask candidates questions and inspect their public platforms;
- volunteer, donate or campaign where the setting permits;
- challenge a claim with evidence or publish a response;
- register or establish eligibility where the constitution requires it;
- cast a ballot, abstain, spoil a ballot where lawful, or contest a process;
- stand as a candidate if eligibility and nomination rules permit;
- organize around an issue, petition, protest or lawful civic movement;
- serve as an election worker, observer, auditor or adjudicator where qualified.

Participation is optional. The game must not punish a player for abstaining, disclose a secret ballot to other actors, or silently convert dialogue choices into a vote.

## 2. Elections are defined by their constitution

An election is not one universal algorithm. Each polity declares:
- offices and powers being filled;
- electorate and eligibility rules;
- district or constituency boundaries;
- nomination and ballot-access rules;
- voting method and counting procedure;
- term length, limits, vacancies and succession;
- campaign period and spending/disclosure rules;
- accessibility, language and assisted-voting arrangements;
- independent observation, recount and dispute procedures;
- transfer-of-power and continuity requirements.

Possible methods include plurality, runoff, ranked-choice, approval, proportional representation, party lists, indirect election, and setting-specific or historical procedures. These are alternatives, not assumptions that every city uses the same method. The declared rule determines the count; no candidate is selected by hidden narrative preference.

## 3. Candidate platforms and public claims

A candidate record can include office sought, public platform, policy proposals, qualifications, public record, endorsements, declared interests, campaign organization, funding disclosures, debate appearances, public promises and responses to criticism.

Keep these distinct:
- a platform is a proposal, not an enacted policy;
- an advertisement is campaign speech, not independent verification;
- an endorsement is a relationship, not proof;
- a rumor is an unverified claim;
- an investigation is not a finding;
- an election result confers only the authority defined by the governing rules.

Candidates may be sincere, opportunistic, compromised, competent, inexperienced, popular or unpopular. Their claims can be true, false, incomplete or uncertain. The simulation should preserve source, date, audience and evidence status rather than silently converting a slogan into world truth.

## 4. The background-advertisement experience

Campaign communication is part of the living city:
- posters and handbills appear on permitted public surfaces;
- street criers, radio, town boards, broadsheets, holograms or network feeds depend on the era;
- candidate caravans, rallies and door-to-door visits create localized activity;
- repeated slogans and competing claims can become ambient noise;
- public-service notices and election logistics remain distinguishable from campaign material.

The experience should support configurable presentation density: quiet, ordinary, saturated and muted. These settings change what the player sees or hears; they do not rewrite the world's campaign history or secretly alter election outcomes. Muting a channel is not the same as suppressing the underlying political actor.

Campaign communication must be attributable: candidate or sponsor, medium, time, intended jurisdiction and any required funding disclosure. Paid placement, public-service information, independent journalism, satire and citizen speech are different content classes. No real-world ad network, political targeting or external candidate advertising is required.

The player can ignore, inspect, challenge, report or engage with an advertisement. Repetition can affect annoyance, attention and public debate as authored simulation variables, but must not be mistaken for evidence that a candidate is popular or truthful.

## 5. Campaign finance and the shared Economy

Campaign spending, donations, wages, printing, travel, venue rental and permitted public funding use the shared Economy domain when modeled as transactions. City supplies the campaign and jurisdiction context; Economy owns accounts, balances, currency, offers and authoritative value movement. Do not create a campaign-only shadow ledger.

Funding limits, disclosure rules, prohibited contributions, in-kind support and enforcement vary by constitution and era. A fictional village may use declared gifts and volunteer labor; a modern city may require formal disclosures; a fantasy polity may have guild or temple sponsorship. The setting must say which rules apply.

## 6. Voting, privacy and trust

The election system distinguishes eligibility, registration, ballot issuance, ballot submission, ballot secrecy, tally, certification, recount and adjudication. A secret ballot must not be stored as a publicly inspectable player-to-candidate relationship. Public participation statistics must not reveal individual choices.

Election administrators may know that an eligible voter received or returned a ballot where the system requires it; they must not thereby learn the secret selection. Open assemblies, public acclamation and historically non-secret systems are represented explicitly as different constitutional procedures, not mislabeled secret ballots.

A ballot is accepted or rejected under declared rules with a reason code and audit trail that does not expose the voter's selection. Accessibility and assisted voting preserve the voter's agency and privacy. A player may change their mind before final submission if the election rules permit it.

## 7. Results, disputes and consequences

The election lifecycle includes:
1. election called and offices defined;
2. candidate nomination and qualification;
3. campaign period and public communications;
4. debates, public meetings and issue discussion;
5. polling or assembly period;
6. count under the declared method;
7. preliminary results and independent observation;
8. recounts, complaints and adjudication where triggered;
9. certification and lawful assumption of office;
10. transition, accountability and the next public decision.

A close result, disputed ballot, intimidation allegation, administrative failure or fraud claim must create a reviewable process—not an automatic story outcome. Law enforcement may investigate offences; election authorities administer the process; courts or designated tribunals adjudicate disputes; elected officials do not decide their own contested results without an independent procedure.

## 8. Cross-domain ownership

| Concern | Owner |
|---|---|
| Player and NPC identity, agency, relationships | City LOD 1 Nonplayer Characters |
| Political actors, parties, factions, platforms, legitimacy | Politics, Power & Public Will |
| Offices, charters, public administration | Governance & Civic Administration |
| Election rules, campaign context, participation, civic events | City election specialization |
| Currency, donations, spending, accounts and transactions | Economy |
| Evidence, investigations, public safety | Law Enforcement & Public Safety |
| Election disputes, remedies and appeals | Justice, Courts & Restitution |
| Ballot custody, authentication, access control and tamper resistance | Trusted host / security platform |
| Rendering, audio, notices and spatial presentation | Renderer / Visualize |

City does not claim cryptographic ballot custody, secure identity, a production election authority or a live multiplayer voting service.

## 9. Validation scenarios

- A village selects a reeve by open assembly; the procedure is explicitly non-secret.
- A city holds a secret-ballot council election with accessible polling locations.
- A proportional election produces coalition negotiations rather than a single automatic winner.
- A player hears the same candidate jingle repeatedly, mutes campaign audio, and can still inspect the campaign record.
- A player abstains without losing access, rewards or civic standing.
- A candidate advertisement makes a disputed claim; the claim remains attributed and unverified until evidence and process resolve it.
- A close result triggers observation, recount and adjudication before certification.
- Campaign donations and expenses reconcile through the shared Economy domain.

## 10. Implementation boundary

This is an authored domain contract and scenario specification, not an implemented election engine. Player ballot interaction, eligibility enforcement, secret ballot custody, campaign simulation, ad scheduling, counting, certification and dispute workflows remain future implementation work. The sourcebook must not be presented as proof that a player can currently vote in the browser experience.
