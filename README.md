# AI API Call w/React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules with an API call to OpenAI. Do not forget to install the noe modules btw.

Create directory:
Then cd in termal and put in these commands:
npm init vite@latest . -- --template react
then
npm install
npm react

Also given the fact you are working in VITE as well use this to place your API call with OpenAI in this example:
VITE_OPENAI_API_KEY=

and create the '.env' file and put in directory


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

For example:
<img width="553" alt="Screenshot 2025-04-17 at 12 56 56 AM" src="https://github.com/user-attachments/assets/1a82f232-5e8c-40eb-9dd4-ce64f0b77de3" />
