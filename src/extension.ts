// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "sylmark-vscode-plugin" is now active!',
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "sylmark-vscode-plugin.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Hello World from sylmark-vscode-plugin!",
      );
    },
  );

  context.subscriptions.push(disposable);
  //added extra code

  const executableName =
    process.platform === "win32" ? "sylmark.exe" : "sylmark-linux-amd64";
  const executablePath = context.asAbsolutePath(
    path.join("server", executableName),
  );
  console.log("os which->", process.platform);
  console.log("electcutable path", executablePath);

  const serverOptions: ServerOptions = {
    command: executablePath,
    args: [],
    transport: TransportKind.stdio,
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "markdown" }],
  };

  const client = new LanguageClient(
    "sylmark-vscode-plugin",
    "sylmark-vscode-plugin",
    serverOptions,
    clientOptions,
  );

  context.subscriptions.push(client);
  client.start();
}

// This method is called when your extension is deactivated
export function deactivate() {}
