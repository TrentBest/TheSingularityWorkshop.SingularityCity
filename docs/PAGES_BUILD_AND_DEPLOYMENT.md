# GitHub Pages Build and Deployment

## Purpose

Singularity City is a static, data-driven experience today. GitHub Pages publishes the browser experience; it is not the City runtime, an authoritative multiplayer server, or a tenant-ownership service.

The Pages workflow follows the deployment pattern demonstrated by TheSingularityWorkshop.GUI: validate first, assemble a deliberate publication directory, upload that directory as the Pages artifact, and deploy it in a separate job.

## Build pipeline

The development-branch workflow in `.github/workflows/pages.yml` has two jobs:

1. **Build and validate**
   - Checks out the repository.
   - Verifies required experience pages, assets, data, schemas, books, and documentation.
   - Runs JavaScript syntax checks and the repository's contract and fixture tests.
   - Assembles the public site into `_site/`.
   - Uploads only `_site/` as the Pages artifact.
2. **Deploy**
   - Runs only after the build succeeds.
   - Runs for a push or an explicit manual dispatch, not for pull requests.
   - Uses the `github-pages` environment and the Pages deployment permissions.

The workflow is intentionally triggered by `development` pushes and pull requests. `master` remains the release-aligned branch; routine development validation and preview publication should not silently switch to it.

## Publication boundary

The public artifact contains:

- The root HTML entry points: `index.html`, `mall.html`, and `thinking.html`.
- `assets/`: browser styles, scripts, images, and other static presentation assets.
- `data/`: the authored JSON fixtures loaded by the browser experience.
- `docs/`: the public documentation, books, and supporting illustrations.
- `schemas/`: the published data contracts.
- `AgentOnboarding.md`, when present.
- `.nojekyll`, so GitHub Pages serves underscore-prefixed paths without Jekyll processing.

The repository's `.github/` workflow definitions and `tests/` are not copied into the artifact. They remain available in source control and Actions logs, rather than being part of the visitor-facing site.

When a new browser entry point or runtime asset directory is introduced, update the assembly step and its required-file checks in the same change. A green build should mean the intended publication tree was actually assembled—not merely that source files exist somewhere in the repository.

## Why the GUI pattern matters

The GUI showcase uses a curated `_site/` directory rather than publishing its repository root. It also demonstrates a generated-artifact check: the workflow runs the real GUI.SVG adapter and compares the generated output with the committed gallery artifact. This is a valuable standard for City as its maps, district views, building visualizations, and other assets become generated from authoritative domain data.

City does not yet have an equivalent generated 3D scene pipeline. Its current map and district illustrations are browser-rendered from authored fixtures and connected data. We should add generation-and-drift checks when a genuine generator becomes part of the build, rather than pretending a static illustration is generated evidence.

The GUI workflow also pins its checkout, artifact-upload, and deployment actions to immutable commit SHAs. City now follows that pattern for those deployment actions.

## What a successful deployment proves

A successful Pages workflow proves that the required source assets passed the listed checks, the public artifact was assembled, and GitHub Pages accepted the deployment.

It does **not** prove:

- That the City is a shared multiplayer world.
- That browser-local drafts or review checkboxes are synchronized between visitors.
- That a person, bot, tenant, lease, or manager is authenticated or persisted.
- That illustrative geometry is surveyed, photorealistic, structurally valid, or safe for construction.
- That every document or domain capability is complete merely because it is present in the artifact.

Those claims require their own runtime contracts, integration tests, and evidence.

## Operational troubleshooting

If the build job succeeds but the deploy job fails before a runner starts, inspect the workflow run's deployment job and the `github-pages` environment. That failure is distinct from a failed site build. A successful build artifact is useful evidence, but it is not evidence that the public site was deployed.

For reproducibility, use the workflow run associated with the exact `development` commit being evaluated. Do not infer deployment success from a green validation job alone.
