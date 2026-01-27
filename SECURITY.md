# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Uhasibu Platform seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please Do Not

- Open a public GitHub issue for security vulnerabilities
- Disclose the vulnerability publicly before it has been addressed

### Please Do

1. **Email** the maintainers with details of the vulnerability
2. **Provide** detailed steps to reproduce the issue
3. **Include** potential impact and severity assessment
4. **Suggest** a fix if you have one

### What to Include

- Type of vulnerability (e.g., SQL injection, XSS, authentication bypass)
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue and how an attacker might exploit it

## Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity and complexity

## Security Considerations

### Research Ethics

This platform handles research participant data. Security measures include:

- Age verification data protection
- Phone number encryption
- Secure OTP delivery
- JWT token authentication
- Database access controls

### Known Limitations

As an academic prototype:

- This is NOT production-grade security
- Virtual currency only (no real financial data)
- Designed for controlled research environments
- Should not be used for real-money applications

### Best Practices

When deploying:

- Change all default passwords
- Use strong JWT secrets
- Enable HTTPS in production
- Implement rate limiting
- Regular security audits
- Keep dependencies updated

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find similar problems
3. Prepare fixes for all supported versions
4. Release patches as soon as possible

## Comments

We appreciate your efforts to responsibly disclose your findings and will make every effort to acknowledge your contributions.

Thank you for helping keep Uhasibu Platform and our users safe!
