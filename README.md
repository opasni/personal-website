# Personal website

## Local setup

Use Node.js 26 and npm, matching the website deployment workflow.

```sh
npm ci
npm start
```

Open `http://localhost:4200/`. The development server reloads when source files change.

Configure local values in `src/environments/environment.ts`:

- `apiUrl`: API base URL, without a trailing slash or `/contact`; the email service appends `/contact`.
- `turnstileSiteKey`: public Turnstile site key for the development hostname.

Keep the Turnstile secret in the backend configuration only. To submit from localhost, the API's allowed origin and the Turnstile widget's allowed hostnames must support your development setup; use a separate development deployment rather than changing production CORS.

## Build and checks

```sh
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
npm run lint
```

Browser tests require Chrome. Build output is written to `dist/website/browser/`; the build's postbuild step generates hashed translation files and their manifest.

`npm run deploy` builds the static files and copies `robots.txt`. Uploading to AWS is handled by GitHub Actions.

## Deployment configuration

Both workflows use the GitHub `production` environment and AWS OIDC authentication. Configure an AWS role that trusts the repository's production environment and permits the operations used by the workflows.

Set these GitHub environment variables:

| Variable | Value |
| --- | --- |
| `AWS_ACCOUNT_ID` | Target AWS account ID |
| `AWS_OIDC_ROLE_NAME` | Deployment role name |
| `AWS_DEFAULT_REGION` | Deployment region, e.g. `eu-central-1` |
| `S3_BUCKET_NAME` | Website bucket |
| `CLOUDFRONT_DISTRIBUTION_ID` | Website distribution ID |
| `API_URL` | Contact API **base** URL, without `/contact` or a trailing slash |
| `TURNSTILE_SITE_KEY` | Public production Turnstile site key |
| `CONTACT_ALLOWED_ORIGIN` | Exact website HTTPS origin, without a trailing slash |
| `CONTACT_TO_EMAIL` | Mailbox receiving enquiries |
| `SES_FROM_EMAIL` | Sender verified in SES in the deployment region |

Set `TURNSTILE_SECRET_KEY` as a GitHub environment **secret**. Configure the Turnstile widget for the production hostname, using Managed mode without pre-clearance.

### Contact API

Run the **Deploy Contact API** workflow manually. It builds `backend/contact/template.yaml` with AWS SAM and deploys the `personal-website-contact` stack.

The workflow outputs the API base URL. Set `API_URL` to that value; the frontend appends `/contact`. Deploy the API before deploying the website.

SES sender verification and sandbox access must be configured in the target region. If SES is still in its sandbox, the receiving address must also be verified.

To build the Lambda package locally, install the AWS SAM CLI and run:

```sh
sam build --template-file backend/contact/template.yaml
```

### Website

The **Deploy Website** workflow runs on pushes to `main` or manually. It injects `API_URL` and `TURNSTILE_SITE_KEY` into `environment.prod.ts`, builds the site, syncs it to S3, and invalidates CloudFront's entry-point and translation-manifest paths.

Ensure CloudFront serves the Angular entry point for application routes such as `/impressum` and `/privacy`.

## Operational settings

To implement the proposed retention periods:

- Set the contact Lambda's CloudWatch log group retention to **30 days**. Apply the same setting to API Gateway access log groups if enabled. The current SAM template does not configure log retention.
- If CloudFront access logs are stored in S3, configure **30-day expiration** for the log prefix only, including noncurrent versions where applicable. Do not apply this rule to website content. For CloudWatch destinations, configure log group retention instead.
- Review the receiving mailbox monthly and delete routine enquiries and sent replies more than **12 months after the last exchange**. Keep correspondence still needed for active engagements or applicable legal obligations separately. Include trash and other copies in the deletion process.

Set the public operator contact in `src/app/lib/consts/legal-profile.const.ts`. Ensure retention settings and privacy-notice details reflect the actual deployment.
