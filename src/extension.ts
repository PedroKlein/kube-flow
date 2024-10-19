import * as vscode from "vscode";
import { KubernetesCodeLensProvider } from "./kubernetes-codelens.provider";
import { commandMap, KCommand, runKubectlCommandOnResource } from "./commands";

export function activate(context: vscode.ExtensionContext) {
  const codeLensProvider = new KubernetesCodeLensProvider();

  let registration = vscode.languages.registerCodeLensProvider(
    { language: "yaml" },
    codeLensProvider
  );

  for (const [kComand, { command: vsCommand }] of Object.entries(commandMap)) {
    vscode.commands.registerCommand(vsCommand, (yaml: any) => {
      runKubectlCommandOnResource(kComand as KCommand, yaml);
    });
  }

  context.subscriptions.push(registration);
}

export function deactivate() {}
