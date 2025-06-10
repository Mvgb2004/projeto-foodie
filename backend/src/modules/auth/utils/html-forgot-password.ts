export const htmlEmailForgotPassword = ({ code }: { code: string }) => {
	return `<div>
	<div
		style="
			font-family: Arial, sans-serif;
			background-color: #ffffff;
			width: 100%;
			max-width: 600px;
			margin: 40px auto;
			padding: 40px;
			border-radius: 12px;
			box-shadow: 0 4px 8px rgba(32, 39, 48, 0.16);
			text-align: center;
			color: #202730;
		"
	>
		<h1 style="color: #FF6B47; font-size: 24px; margin-bottom: 10px">
			Redefinição de senha
		</h1>
		<p style="font-size: 20px; line-height: 1.5; margin: 1em 0">
			Olá, insira o código abaixo no app para trocar sua senha.
		</p>
		<p style="font-size: 24px; font-weight: bold; color: #FF6B47; margin: 1em 0">
			${code}
		</p>
		<p style="font-size: 16px; color: #7990a1; margin-top: 30px">
			Atenciosamente,
		</p>
		<p style="font-weight: bold; color: #202730; margin-top: 5px">
            Dicas Grande Tijuca
        </p>
	</div>
</div>
`;
};
