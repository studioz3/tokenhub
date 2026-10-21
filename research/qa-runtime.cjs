const fs=require('node:fs'),path=require('node:path');
const playwright=require(process.env.TOKENHUB_PLAYWRIGHT_MODULE||'playwright-core');
const candidates=[process.env.TOKENHUB_CHROME_PATH,process.env['PROGRAMFILES']&&path.join(process.env['PROGRAMFILES'],'Google/Chrome/Application/chrome.exe'),process.env['PROGRAMFILES(X86)']&&path.join(process.env['PROGRAMFILES(X86)'],'Google/Chrome/Application/chrome.exe'),process.env.LOCALAPPDATA&&path.join(process.env.LOCALAPPDATA,'Google/Chrome/Application/chrome.exe'),'/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/chromium-browser','/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].filter(Boolean);
const executablePath=candidates.find(file=>fs.existsSync(file));
if(!executablePath)throw new Error('Defina TOKENHUB_CHROME_PATH com o caminho do Chrome/Chromium instalado.');
module.exports={...playwright,executablePath};
