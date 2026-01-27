# Contributing to Uhasibu Platform

Thank you for your interest in contributing to the Uhasibu Prediction Market Platform! This is an academic research project, and we welcome contributions that maintain research ethics standards.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** explaining why this would be useful
- **Possible implementation** if you have ideas

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the coding style** of the project
3. **Write clear commit messages**
4. **Include tests** if applicable
5. **Update documentation** as needed
6. **Ensure all tests pass**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Uhasibu-Platform.git
cd Uhasibu-Platform

# Install dependencies
cd backend && npm install
cd ../frontend && npm install
cd ../admin-dashboard && npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run with Docker
docker-compose up -d
```

## Coding Standards

### JavaScript/Node.js

- Use **ES6+ syntax**
- Follow **ESLint** configuration
- Use **Prettier** for formatting
- Write **meaningful variable names**
- Add **JSDoc comments** for functions

### React/Next.js

- Use **functional components** with hooks
- Keep components **small and focused**
- Use **Tailwind CSS** for styling
- Follow **Next.js best practices**

### Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests

Example:
```
Add user portfolio tracking feature

- Implement portfolio page component
- Add API endpoint for user positions
- Update database schema
- Add tests for portfolio calculations

Closes #123
```

## Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## Research Ethics Compliance

All contributions must maintain:

- ✅ Age verification (18+)
- ✅ Virtual currency only (no real money)
- ✅ Clear academic purpose
- ✅ Data privacy standards
- ✅ Informed consent mechanisms

## Areas for Contribution

We especially welcome contributions in:

- **Bug fixes** and performance improvements
- **Documentation** enhancements
- **Swahili translations** and localization
- **Accessibility** improvements
- **Test coverage** expansion
- **UI/UX** refinements

## Questions?

Feel free to open an issue with the `question` label if you need help or clarification.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
