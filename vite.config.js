import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: env.VERCEL === "1" ? "/" : env.VITE_REPO_NAME || "/",
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VERCEL': JSON.stringify(env.VERCEL || "0"),
      'import.meta.env.VITE_REPO_NAME': JSON.stringify(env.VITE_REPO_NAME || "")
    }
  };
});