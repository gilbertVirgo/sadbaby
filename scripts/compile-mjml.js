#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mjml2html from "mjml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.join(__dirname, "../netlify/functions/lib/templates");
const compiledDir = path.join(templatesDir, "compiled");

// Ensure compiled directory exists
if (!fs.existsSync(compiledDir)) {
	fs.mkdirSync(compiledDir, { recursive: true });
}

// Find all MJML files
const mjmlFiles = fs
	.readdirSync(templatesDir)
	.filter((file) => file.endsWith(".mjml"));

if (mjmlFiles.length === 0) {
	console.log("❌ No MJML files found in", templatesDir);
	process.exit(1);
}

console.log(`📧 Compiling ${mjmlFiles.length} MJML template(s)...\n`);

mjmlFiles.forEach((file) => {
	const mjmlPath = path.join(templatesDir, file);
	const mjmlContent = fs.readFileSync(mjmlPath, "utf-8");

	try {
		const { html, errors } = mjml2html(mjmlContent);

		if (errors.length > 0) {
			console.warn(`⚠️  Warnings in ${file}:`);
			errors.forEach((error) => console.warn(`   - ${error.message}`));
		}

		// Replace template variables with EJS syntax
		// {{VARIABLE}} -> <%= variable %>
		let ejsContent = html;
		ejsContent = ejsContent.replace(/{{(\w+)}}/g, "<%- $1 %>");

		// Save as EJS file
		const outputFile = file.replace(".mjml", ".ejs");
		const outputPath = path.join(compiledDir, outputFile);
		fs.writeFileSync(outputPath, ejsContent);

		console.log(`✅ ${file} → compiled/${outputFile}`);
	} catch (error) {
		console.error(`❌ Failed to compile ${file}:`, error.message);
		process.exit(1);
	}
});

console.log("\n🎉 MJML compilation complete!");
console.log(`   Templates available in: ${compiledDir}`);
