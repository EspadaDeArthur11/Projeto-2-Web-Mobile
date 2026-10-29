import "./globals.css";

export const metadata = {
  title: "Eco Mania",
  description:
    "Aprenda a separar resíduos sólidos corretamente com rodadas rápidas de decisão e retorno imediato.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
