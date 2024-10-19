import * as vscode from "vscode";
import * as yaml from "js-yaml";
import { commandMap } from "./commands";

export class KubernetesCodeLensProvider implements vscode.CodeLensProvider {
  public provideCodeLenses(
    document: vscode.TextDocument
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    let lenses: vscode.CodeLens[] = [];
    const text = document.getText();
    let yamlDocs;
    try {
      yamlDocs = yaml.loadAll(text);
    } catch (e) {
      console.error("Failed to parse YAML: ", e);
      return;
    }

    let currentPosition = 0;

    yamlDocs.forEach((doc: any) => {
      if (doc && doc.kind && doc.apiVersion) {
        const yamlDoc = yaml.dump(doc);
        const yamlLines = yaml.dump(doc).split("\n");
        const mainHeader = `${yamlLines[0]}\n${yamlLines[1]}`;

        const indexDoc = text.indexOf(mainHeader, currentPosition);
        currentPosition = indexDoc + yamlDoc.length;

        const startPos = document.positionAt(indexDoc);
        const endPos = document.positionAt(indexDoc + yamlDoc.length);
        const range = new vscode.Range(startPos, endPos);

        for (const [_, { title, command }] of Object.entries(commandMap)) {
          lenses.push(
            new vscode.CodeLens(range, {
              title: title,
              command: command,
              arguments: [yamlDoc],
            })
          );
        }
      }
    });

    return lenses;
  }
}
